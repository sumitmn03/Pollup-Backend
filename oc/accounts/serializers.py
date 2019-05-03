from rest_framework import serializers
# from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from posts.models import follow_table
from .models import Profile

from django.contrib.auth import get_user_model
User = get_user_model()

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'date_of_birth')


# User Serializer to update the user table


class UserSerializerToUpdateUserTable(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'date_of_birth')

# user profile serializer


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'contact_no',
            'current_city',
            'hometown',
            'occupation'
        )


# Register Serializer

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'date_of_birth',
                  'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        follow_table.objects.create(following=user, follower=user)
        return user

# Login Serializer


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        # user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
