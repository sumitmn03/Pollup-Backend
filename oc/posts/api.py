from rest_framework import (
    permissions,
    generics,
    viewsets
)
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet, ViewSet

from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from knox.models import AuthToken

from .serializers import (
    PollSerializer,
    OptionSerializer,
    OptedBySerializer,
    TimelineSerializer,
    CommentSerializer,
    UserSerializer,
    followSerializer,
    SharedPostSerializer)
from .models import (poll_table, option_table,
                     comments_table, opted_by_table, follow_table, shared_post_table)
from django.contrib.auth.models import User


class OptedByViewset(ModelViewSet):
    serializer_class = OptedBySerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return opted_by_table.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # def get_object(self):
    #     id = self.kwargs['id']
    #     return User.objects.get(id=id)


class CommentViewset(ModelViewSet):
    serializer_class = CommentSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return comments_table.objects.filter(parent_comment_id=None)


class OptionViewset(ModelViewSet):
    serializer_class = OptionSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return option_table.objects.all()

    def perform_create(self, serializer):
        serializer.save()

    # def patch(self, request, *args, **kwargs):
    #     return self.partial_update(request, *args, **kwargs)


class PostViewset(ModelViewSet):
    serializer_class = PollSerializer

    # queryset = poll_table.objects.all()

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return poll_table.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# class TimelinePost(ModelViewSet):
#     serializer_class = TimelineSerializer

#     def get_serializer_context(self):
#         return {"user": self.request.user}

#     permission_classes = [
#         permissions.IsAuthenticated
#     ]

#     def get_queryset(self):

#         following = follow_table.objects.values_list('following').filter(
#             follower=self.request.user.id)
#         posts = poll_table.objects.filter(
#             author__in=following).order_by('-created_at')

#         return posts


class GetUsersViewset(ModelViewSet):
    serializer_class = UserSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return User.objects.all()


class followViewset(ModelViewSet):
    serializer_class = followSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return follow_table.objects.all()

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)


class getFollowingUsersViewset(ModelViewSet):
    serializer_class = followSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return follow_table.objects.filter(follower=self.request.user)

        # *********************** test ***********************
        # *********************** test ***********************
        # *********************** test ***********************
        # *********************** test ***********************
        # *********************** test ***********************
        # *********************** test ***********************
        # *********************** test ***********************
        # *********************** test ***********************
        # *********************** test ***********************


class TimelineViewset(ViewSet):

    def list(self, request):
        # listing out the users whom the current user following
        following = follow_table.objects.values_list('following').filter(
            follower=self.request.user.id)

        # listing out all the post of the following user
        posts = poll_table.objects.filter(
            author__in=following).order_by('-created_at')

        serializer = TimelineSerializer(
            posts, many=True, context={'user': self.request.user})

        # listing out all the shared post
        shared_posts = shared_post_table.objects.filter(
            shared_by__in=following).order_by('-timestamp')

        serializer1 = SharedPostSerializer(shared_posts, many=True, context={
                                           'user': self.request.user})
        # print("hello")
        # print(serializer1.data)
        # print(serializer.data)
        final_data = [] + serializer.data + serializer1.data

        # return Response(serializer.data)
        return Response(final_data)


class SharedPollViewset(ModelViewSet):
    serializer_class = SharedPostSerializer

    def get_serializer_context(self):
        return {"user": self.request.user}

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        following = follow_table.objects.values_list('following').filter(
            follower=self.request.user.id)

        return shared_post_table.objects.filter(shared_by__in=following)
