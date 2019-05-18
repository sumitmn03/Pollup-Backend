from django.urls import path
from rest_framework import routers
from .api import (
    PostViewset,
    OptionViewset,
    TimelineViewset,
    CommentViewset,
    OptedByViewset,
    GetUsersViewset,
    followViewset,
    getFollowingUsersViewset,
    reportViewset,
    NotificationViewset,
    MyNotificationViewset,
    SearchViewset,
    getSinglePollViewset,
    CommentReplyViewset,
    VoteViewset,
    ProfilePollViewset
)

from . import api

router = routers.DefaultRouter()

router.register('api/posts', PostViewset, 'posts')
router.register('api/options', OptionViewset, 'options')
router.register('api/optedby', OptedByViewset, 'optedby')
router.register('api/getallusers', GetUsersViewset, 'getusers')
router.register('api/follow', followViewset, 'follow')
router.register('api/followingusers',
                getFollowingUsersViewset, 'following')
router.register('api/report', reportViewset, 'report')
router.register('api/notification', NotificationViewset, 'notification')
router.register('api/getmynotification',
                MyNotificationViewset, 'mynotification')
router.register('api/getallpolls',
                getSinglePollViewset, 'SearchViewset')
router.register('api/gettimeline',
                TimelineViewset, 'timeline')
router.register('api/pollstovote',
                VoteViewset, 'votepage')
# router.register('api/search/<q>/', SearchViewset, 'search')

urlpatterns = [
    path('api/search/<str:q>/',
         SearchViewset.as_view({'get': 'list'}), name='search'),
    #     path('api/gettimeline/<int:page>/',
    #          TimelineViewset.as_view({'get': 'list'}), name='timeline'),
    path('api/getcomments/<int:post>/',
         CommentViewset.as_view({'get': 'list'}), name='comments'),
    path('api/getcommentreplies/<int:parent>/',
         CommentReplyViewset.as_view({'get': 'list'}), name='replies'),
    path('api/profilepoll/<int:author>/',
         ProfilePollViewset.as_view({'get': 'list'}), name='profilepoll'),
    # path('api/getallpolls',
    #      getSinglePollViewset.as_view({'get': 'list'}), name='getpolls')
]

urlpatterns += router.urls
