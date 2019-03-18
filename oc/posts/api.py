from rest_framework import (
    permissions,
    generics
)
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet

from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from knox.models import AuthToken

from .serializers import (
    PostSerializer,
    OptionSerializer,
    OptedBySerializer,
    TimelineSerializer,
    CommentSerializer,
    UserSerializer,
    followSerializer
)
from .models import (post_table, option_table,
                     comments_table, opted_by_table, follow_table)
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
        return comments_table.objects.all().filter(parent_comment_id=None)


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
    serializer_class = PostSerializer

    # queryset = post_table.objects.all()

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return post_table.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class TimelineViewset(ModelViewSet):
    serializer_class = TimelineSerializer

    def get_serializer_context(self):
        return {"user": self.request.user}

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        following = follow_table.objects.values_list('following').filter(
            follower=self.request.user.id)
        return post_table.objects.filter(author__in=following).order_by('-created_at')

        # return post_table.objects.all().order_by('-created_at')


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
