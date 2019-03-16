from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
    StringRelatedField
)

from .models import (post_table, option_table, opted_by_table, comments_table)

from django.contrib.auth.models import User

from django.contrib.auth import authenticate

import json


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

        read_only_fields = ('id', 'username', 'email')


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
        return str(obj.author.username)


class CommentSerializer(ModelSerializer):
    replies = SerializerMethodField(required=False)
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
            'replies'
        ]
        # read_only_fields = ('replies',)

    def get_author_name(self, obj):
        return str(obj.author.username)

    def get_replies(self, obj):
        if obj.is_parent:
            return CommentChildrenSerializer(obj.children(), many=True).data
        return []


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


class PostSerializer(ModelSerializer):
    class Meta:
        model = post_table
        fields = [
            'id',
            'posts',
            'author',
            'no_of_options',
            'created_at'
        ]

    # def create(self, validated_data):
    #     return post_table.objects.create(**validated_data)


class TimelineSerializer(ModelSerializer):
    author_name = SerializerMethodField()
    options = OptionSerializer(many=True)
    current_user = SerializerMethodField()
    option_opted_by_current_user = SerializerMethodField()
    comments = SerializerMethodField()

    class Meta:
        model = post_table
        fields = [
            'current_user',
            'id',
            'posts',
            'author_name',
            'created_at',
            'options',
            'option_opted_by_current_user',
            'comments'

        ]
        read_only_fields = ('id', 'author_name', 'created_at')

    def get_current_user(self, obj):
        obj = self.context["user"]
        serializer = UserSerializer(instance=obj)
        return serializer.data

    def get_author_name(self, obj):
        return str(obj.author.username)

    def get_option_opted_by_current_user(self, obj):
        current_user = self.context["user"]
        serializer1 = UserSerializer(instance=current_user)
        current_user_id = serializer1.data["id"]

        opted = obj.opted_by.filter(user=current_user_id)
        serializer = OptedBySerializer(instance=opted, many=True)
        return serializer.data

    def get_comments(self, obj):
        comment = comments_table.objects.filter(
            posts=obj, parent_comment_id=None)
        serializer = CommentSerializer(instance=comment, many=True)
        return serializer.data
