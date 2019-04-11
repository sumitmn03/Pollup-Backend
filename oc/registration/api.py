from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings

import random

from rest_framework import (
    generics,
    permissions,
    viewsets
)

from rest_framework.viewsets import ModelViewSet

from .serializers import (
    EmailOtpSerializer
)

from .models import (email_otp)

from django.contrib.auth import get_user_model
User = get_user_model()


class EmailOtpViewset(generics.GenericAPIView):
    serializer_class = EmailOtpSerializer

    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request, *args, **kwargs):
        if User.objects.filter(email=request.data["email"]).exists():
            return Response({
                "error": "email already exists !!!",
            })
        elif email_otp.objects.filter(email=request.data["email"]).exists():
            obj = email_otp.objects.get(email=request.data["email"])
            token = random.randint(100000, 999999)

            # saving the otp token and email in database
            serializer = self.get_serializer(obj, data=request.data)
            serializer.is_valid(raise_exception=True)
            email_otp_data = serializer.save(token=token)

            # sending otp to user via email

            subject = 'Pollup OTP'
            message = 'Your One Time Password for Pollup is {otp}'.format(
                otp=token)
            from_email = settings.EMAIL_HOST_USER
            to_email = [request.data["email"]]

            send_mail(
                subject,
                message,
                from_email,
                to_email,
                fail_silently=False,
            )

            return Response({
                "email": request.data["email"]
            })
        else:
            token = random.randint(100000, 999999)

            # saving the otp token and email in database
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            email_otp_data = serializer.save(token=token)

            # sending otp to user via email

            subject = 'Pollup OTP'
            message = 'Your One Time Password for Pollup is {otp}'.format(
                otp=token)
            from_email = settings.EMAIL_HOST_USER
            to_email = [request.data["email"]]

            send_mail(
                subject,
                message,
                from_email,
                to_email,
                fail_silently=False,
            )

            return Response({
                "email": request.data["email"]
            })
