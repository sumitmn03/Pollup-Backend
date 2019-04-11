from rest_framework import serializers

from registration.models import email_otp

# from django.contrib.auth import get_user_model
# User = get_user_model()


class EmailOtpSerializer(serializers.ModelSerializer):
    class Meta:
        model = email_otp
        fields = (
            'id',
            'email',
            'token'
        )
