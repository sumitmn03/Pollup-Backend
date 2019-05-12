from channels.consumer import AsyncConsumer
import json
from channels.generic.websocket import WebsocketConsumer
from channels.db import database_sync_to_async

from .models import comments_table

from .serializers import (
    CommentSerializer,
)

from django.contrib.auth import get_user_model
User = get_user_model()


# class ChatConsumer(WebsocketConsumer):
#     def connect(self):
#         self.accept()

#     def disconnect(self, close_code):
#         pass

#     def receive(self, text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json['message']

#         self.send(text_data=json.dumps({
#             'message': message
#         }))


class ChatConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        print("connected 009")
        self.post_id = self.scope['url_route']['kwargs']['id']
        await self.channel_layer.group_add(
            str(self.post_id),
            self.channel_name
        )
        await self.send({
            "type": "websocket.accept",
        })

    async def websocket_receive(self, event):
        print(event["text"])
        comment_data = json.loads(json.loads(event["text"]))

        user = User.objects.get(id=comment_data["author"])

        parent_comment = comment_data['parent_comment']
        if parent_comment != None:
            parent_comment = comments_table.objects.get(id=parent_comment)

        new_comment = await self.create_new_comment(comment_data["post_type"], comment_data['posts'], user, parent_comment, comment_data['comment_content'])

        new_comment_data = CommentSerializer(new_comment).data

        final_response = {
            "comment_data": new_comment_data, "parent_comment_index": comment_data['parent_comment_index']
        }

        await self.channel_layer.group_send(
            str(self.post_id),
            {
                "type": "send_message",
                "text": json.dumps(final_response)
            }

        )

    async def send_message(self, event):
        await self.send({
            "type": "websocket.send",
            "text": event["text"]
        })

    async def websocket_disconnect(self, event):
        await self.channel_layer.group_discard(
            str(self.post_id),
            self.channel_name
        )

    @database_sync_to_async
    def create_new_comment(self, post_type, posts, author, parent_comment, comment):
        return comments_table.objects.create(
            post_type=post_type,
            posts=posts,
            author=author,
            parent_comment=parent_comment,
            comment=comment
        )
