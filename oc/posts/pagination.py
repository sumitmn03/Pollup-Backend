from rest_framework import (
    pagination,
    response
)


class TimelinePagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'size'
    max_page_size = 20

    def get_paginated_response(self, data):
        context = {
            'next': self.get_next_link(),
            'results': data
        }
        return response.Response(context)


class CommentsPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'size'
    max_page_size = 20

    def get_paginated_response(self, data):
        context = {
            'next': self.get_next_link(),
            'results': data
        }
        return response.Response(context)


class CommentsReplyPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'size'
    max_page_size = 20

    def get_paginated_response(self, data):
        context = {
            'next': self.get_next_link(),
            'results': data
        }
        return response.Response(context)
