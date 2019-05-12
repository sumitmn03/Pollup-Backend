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
    NotificationSerializer
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


class GetCommentsForDetailedPost(ViewSet):

    def list(self, request, *args, **kwargs):
        # pagination
        # getting the page number and limit the polls to 30
        post_id = kwargs["post"]
        page = kwargs["page"]
        limit = page + 4
        has_more = True

        all_comments_of_the_post = comments_table.objects.filter(
            posts=post_id, post_type=1, parent_comment_id=None).order_by('-timestamp')

        total_number_of_comments = all_comments_of_the_post.count()

        if page > total_number_of_comments or limit > total_number_of_comments:
            has_more = False

        comments = all_comments_of_the_post[page:limit]

        serializer = CommentSerializer(
            comments, many=True)
        print(has_more)

        return Response({
            "comments": serializer.data,
            "page": limit,
            "has_more": has_more
        })


class TimelineViewset(ViewSet):

    def list(self, request, *args, **kwargs):
        # pagination
        # getting the page number and limit the polls to 30
        page = kwargs["page"]
        limit = page + 3
        has_more = True

        # listing out the users whom the current user following
        following = follow_table.objects.values_list('following').filter(
            follower=self.request.user.id)

        # listing out the polls that are reported by the user

        reported_polls = report_table.objects.values_list(
            'post_id').filter(post_type=1)

        # listing out all the post of the following user

        all_posts = poll_table.objects.all()

        total_number_of_posts = all_posts.count()

        if page > total_number_of_posts or limit > total_number_of_posts:
            has_more = False

        posts = all_posts.filter(
            author__in=following).exclude(id__in=reported_polls).order_by('-created_at')[page:limit]

        serializer1 = TimelineSerializer(
            posts, many=True, context={'user': self.request.user})

        final_data = [] + serializer1.data

        return Response({
            "polls": final_data,
            "page": limit,
            "has_more": has_more
        })


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
        return notification_table.objects.filter(user=self.request.user).order_by("-timestamp")


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
