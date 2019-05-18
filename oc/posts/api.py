from rest_framework import (
    permissions,
    generics,
    viewsets
)
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet, ViewSet

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
    reportSerializer,
    NotificationSerializer,
    CommentChildrenSerializer
)

from .pagination import (
    TimelinePagination,
    CommentsPagination,
    CommentsReplyPagination
)

from .models import (poll_table,
                     option_table,
                     comments_table,
                     opted_by_table,
                     follow_table,
                     report_table,
                     notification_table
                     )

from django.contrib.auth import get_user_model
User = get_user_model()

from django.db.models import DateField, Case, When


class ProfilePollViewset(ModelViewSet):
    serializer_class = TimelineSerializer

    pagination_class = TimelinePagination

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_serializer_context(self):
        return {'user': self.request.user}

    def get_queryset(self):
        # listing out the polls that are reported by the user

        reported_polls = report_table.objects.values_list(
            'post_id').filter(post_type=1)
        
        # listing out all the post of the following user
# author__in=following
        return poll_table.objects.filter(author=self.kwargs['author']).exclude(id__in=reported_polls).order_by('-created_at')

class VoteViewset(ModelViewSet):
    serializer_class = TimelineSerializer

    pagination_class = TimelinePagination

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_serializer_context(self):
        return {'user': self.request.user}

    def get_queryset(self):
        # listing out the polls that are reported by the user

        reported_polls = report_table.objects.values_list(
            'post_id').filter(post_type=1)

        # listing out the polls VOTED by the user

        polls_voted_by_user = opted_by_table.objects.values_list(
            'posts').filter(user=self.request.user)

        # listing out all the post of the following user
# author__in=following
        return poll_table.objects.exclude(id__in=(reported_polls or polls_voted_by_user)).order_by('-created_at')

class CommentReplyViewset(ModelViewSet):
    serializer_class = CommentChildrenSerializer

    pagination_class = CommentsReplyPagination

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return comments_table.objects.filter(parent_comment_id=self.kwargs['parent']).order_by('-timestamp')


class CommentViewset(ModelViewSet):
    serializer_class = CommentSerializer

    pagination_class = CommentsPagination

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return comments_table.objects.filter(
            posts=self.kwargs['post'], post_type=1, parent_comment_id=None).order_by('-timestamp')


class TimelineViewset(ModelViewSet):
    serializer_class = TimelineSerializer

    pagination_class = TimelinePagination

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_serializer_context(self):
        return {'user': self.request.user}

    def get_queryset(self):
        following = follow_table.objects.values_list('following').filter(
            follower=self.request.user.id)

        # listing out the polls that are reported by the user

        reported_polls = report_table.objects.values_list(
            'post_id').filter(post_type=1)

        # listing out all the post of the following user
# author__in=following
        return poll_table.objects.exclude(id__in=reported_polls).annotate(
            author_or_not=Case(
                When(author__in=following, then='created_at'),
                default=None
            )
        ).order_by('-author_or_not', '-created_at')


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
        new_post = serializer.save(author=self.request.user)
        notification_table.objects.create(notification_for=1, user=self.request.user, type_id=new_post.id)
        return new_post


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


class reportViewset(ModelViewSet):
    serializer_class = reportSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return report_table.objects.filter(reported_user=self.request.user.id)


class NotificationViewset(ModelViewSet):
    serializer_class = NotificationSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return notification_table.objects.all().order_by("-timestamp")


class MyNotificationViewset(ModelViewSet):
    serializer_class = NotificationSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return notification_table.objects.filter(user=self.request.user).exclude(count=0).order_by("-timestamp")


# search api to get search results
class SearchViewset(ViewSet):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request, *args, **kwargs):
        # listing out all the peoples that matches the search keyword
        peoples = User.objects.filter(
            name__icontains=kwargs["q"]).order_by('name')

        serializer1 = UserSerializer(
            peoples, many=True)

        # listing out all the polls that matches the search keyword

        polls = poll_table.objects.filter(
            posts__icontains=kwargs["q"]).order_by('posts')

        serializer2 = TimelineSerializer(
            polls, many=True, context={'user': self.request.user})

        # listing out all the polls whose option that matches the search keyword

        # polls = poll_table.objects.filter(
        #     posts__icontains=kwargs["q"]).order_by('posts')

        # serializer2 = PollSerializer(
        #     polls, many=True)

        # return Response(serializer.data)

        final_data = [] + serializer1.data + serializer2.data

        return Response(final_data)


class getSinglePollViewset(ModelViewSet):
    serializer_class = TimelineSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_serializer_context(self):
        return {'user': self.request.user}

    def get_queryset(self):
        return poll_table.objects.all()
