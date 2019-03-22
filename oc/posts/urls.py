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
    SharedPollViewset,
    reportViewset,
    SharedPollForReportViewset
)

router = routers.DefaultRouter()

router.register('api/posts', PostViewset, 'posts')
router.register('api/options', OptionViewset, 'options')
router.register('api/timeline', TimelineViewset, 'timeline')
router.register('api/comments', CommentViewset, 'comment')
router.register('api/optedby', OptedByViewset, 'optedby')
router.register('api/getusers', GetUsersViewset, 'getusers')
router.register('api/follow', followViewset, 'follow')
router.register('api/following',
                getFollowingUsersViewset, 'following')
router.register('api/sharedpoll', SharedPollViewset, 'sharedpoll')
router.register('api/report', reportViewset, 'report')
router.register('api/reportsharedpoll',
                SharedPollForReportViewset, 'reportsharedpoll')

urlpatterns = router.urls
