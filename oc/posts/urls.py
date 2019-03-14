from rest_framework import routers
from .api import (
    PostViewset,
    OptionViewset,
    TimelineViewset,
    CommentViewset,
    OptedByViewset
)

router = routers.DefaultRouter()

router.register('api/posts', PostViewset, 'posts')
router.register('api/options', OptionViewset, 'options')
router.register('api/timeline', TimelineViewset, 'timeline')
router.register('api/comments', CommentViewset, 'comment')
router.register('api/optedby', OptedByViewset, 'optedby')

urlpatterns = router.urls
