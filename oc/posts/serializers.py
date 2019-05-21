from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    SerializerMethodField,
    StringRelatedField
)

from .models import (poll_table, option_table,
                     opted_by_table, comments_table, follow_table, report_table, notification_table)

from accounts.models import (Profile)

# from django.contrib.auth.models import User

from django.contrib.auth import authenticate

import json

from django.contrib.auth import get_user_model
User = get_user_model()


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'contact_no', 'current_city', 'hometown', 'occupation')

        read_only_fields = ('id', 'contact_no',
                            'current_city', 'hometown', 'occupation')


class UserSerializer(ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'date_of_birth', 'profile')


class CommentChildrenSerializer(ModelSerializer):
    author_name = SerializerMethodField()

    class Meta:
        model = comments_table
        fields = [
            'author_name',
            'id',
            'posts',
            'author',
            'parent_comment',
            'comment',
            'timestamp',
        ]

    def get_author_name(self, obj):
        return str(obj.author.name)


class CommentSerializer(ModelSerializer):
    replies = SerializerMethodField(required=False)
    author_name = SerializerMethodField()
    comment_reply_notification = SerializerMethodField()

    class Meta:
        model = comments_table
        fields = [
            'author_name',
            'id',
            'post_type',
            'posts',
            'author',
            'parent_comment',
            'comment',
            'timestamp',
            'replies',
            'comment_reply_notification'
        ]
        # read_only_fields = ('replies',)

    def get_comment_reply_notification(self, obj):
        if (notification_table.objects.filter(notification_for=3, type_id=obj.id).exists()):
            notification = notification_table.objects.get(
                notification_for=3, type_id=obj.id)
            serializer = NotificationSerializer(
                instance=notification)
            return serializer.data

        return {
            "id": 0,
            "count": 0
        }

    def get_author_name(self, obj):
        return str(obj.author.name)

    def get_replies(self, obj):
        if obj.is_parent:
            return CommentChildrenSerializer(obj.children(), many=True).data
        return []


class followSerializer(ModelSerializer):
    class Meta:
        model = follow_table
        fields = [
            'id',
            'following',
            'follower'
        ]


class OptedBySerializer(ModelSerializer):
    class Meta:
        model = opted_by_table
        fields = [
            'id',
            'posts',
            'posts_option',
            'user'
        ]


class OptionSerializer(ModelSerializer):
    class Meta:
        model = option_table
        fields = [
            'id',
            'posts',
            'option',
            'count'
        ]


class PollSerializer(ModelSerializer):
    class Meta:
        model = poll_table
        fields = [
            'id',
            'posts',
            'author',
            'no_of_options',
            'created_at',
            'expiry_date'
        ]

    def create(self, validated_data):
        return poll_table.objects.create(**validated_data)


class TimelineSerializer(ModelSerializer):
    author_name = SerializerMethodField()
    author_id = SerializerMethodField()
    options = OptionSerializer(many=True)
    # current_user = SerializerMethodField()
    option_opted_by_current_user = SerializerMethodField()
    post_type = SerializerMethodField()
    # comments = SerializerMethodField()
    post_vote_notification = SerializerMethodField()
    post_comment_notification = SerializerMethodField()

    class Meta:
        model = poll_table
        fields = [
            'post_type',
            # 'current_user',
            'id',
            'posts',
            'author_name',
            'author_id',
            'created_at',
            'expiry_date',
            'options',
            'option_opted_by_current_user',
            # 'comments',
            'post_vote_notification',
            'post_comment_notification'

        ]
        read_only_fields = ('id', 'author_name', 'created_at', 'expiry_date')

    def get_post_comment_notification(self, obj):
        if (notification_table.objects.filter(notification_for=4, type_id=obj.id).exists()):
            notification = notification_table.objects.get(
                notification_for=4, type_id=obj.id)
            serializer = NotificationSerializer(
                instance=notification)
            return serializer.data

        return {
            "id": 0,
            "count": 0
        }

    def get_post_vote_notification(self, obj):
        if (notification_table.objects.filter(notification_for=1, type_id=obj.id).exists()):
            notification = notification_table.objects.filter(
                notification_for=1, type_id=obj.id)[0]
            serializer = NotificationSerializer(
                instance=notification)
            return serializer.data

        return {
            "id": 0,
            "count": 0
        }

    def get_post_type(self, obj):
        return 1

    # def get_current_user(self, obj):
    #     obj = self.context["user"]
    #     serializer = UserSerializer(instance=obj)
    #     return serializer.data

    def get_author_name(self, obj):
        return str(obj.author.name)

    def get_author_id(self, obj):
        return str(obj.author.id)

    def get_option_opted_by_current_user(self, obj):
        current_user = self.context["user"]
        serializer1 = UserSerializer(instance=current_user)
        current_user_id = serializer1.data["id"]

        opted = obj.opted_by.filter(user=current_user_id)
        serializer = OptedBySerializer(instance=opted, many=True)
        return serializer.data

    # def get_comments(self, obj):
    #     comment = comments_table.objects.filter(
    #         posts=obj.id, post_type=1, parent_comment_id=None).order_by('-timestamp')
    #     serializer = CommentSerializer(instance=comment, many=True)
    #     return serializer.data


class reportSerializer(ModelSerializer):
    class Meta:
        model = report_table
        fields = [
            'id',
            'post_type',
            'post_id',
            'report',
            'solved',
            'reported_user'
        ]


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = notification_table
        fields = [
            'id',
            'notification_for',
            'user',
            'type_id',
            'count',
            'notification',
            'timestamp'
        ]

    def create(self, validated_data):
        return notification_table.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.count = validated_data.get('count', instance.count)
        instance.notification = validated_data.get(
            'notification', instance.notification)
        instance.save()
        return instance
