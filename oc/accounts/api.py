from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, UserProfileSerializer, RegisterSerializer, LoginSerializer, UserSerializerToUpdateUserTable

from registration.models import (email_otp)
from registration.serializers import (EmailOtpSerializer)
from .models import (Profile)

from django.contrib.auth import get_user_model

from django.contrib.auth.hashers import check_password

from django.core.mail import send_mail
from django.conf import settings

import random

User = get_user_model()


# get current user
# used to get the details of the current user


class GetCurrentUser(generics.RetrieveAPIView):
    """
    A view that returns a templated HTML representation of a given user.
    """
    queryset = User.objects.all()
    # serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        middle_name = None
        last_name = None
        contact_no = None
        current_city = None
        hometown = None
        occupation = None

        if Profile.objects.filter(user=request.user).exists():
            profile_of_cu = Profile.objects.get(user=request.user)
            middle_name = profile_of_cu.middle_name
            last_name = profile_of_cu.last_name
            contact_no = profile_of_cu.contact_no
            current_city = profile_of_cu.current_city
            hometown = profile_of_cu.hometown
            occupation = profile_of_cu.occupation

        return Response({'id': self.request.user.id,
                         'first_name': self.request.user.first_name,
                         'email': self.request.user.email,
                         'date_of_birth': self.request.user.date_of_birth,
                         'middle_name': middle_name,
                         'last_name': last_name,
                         'contact_no': contact_no,
                         'current_city': current_city,
                         'hometown': hometown,                         'occupation': occupation
                         })

# update user's email


class updateEmailApi(generics.GenericAPIView):
    serializer_class = EmailOtpSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        user = request.user
        user_email = request.data["email"]

        # updating password if old password of the user matches the old password that user mentioned
        if check_password(request.data["password"], user.password):
            if User.objects.filter(email=user_email).exists():
                result = "email already used"
            elif email_otp.objects.filter(email=user_email).exists():
                obj = email_otp.objects.get(email=user_email)
                token = random.randint(100000, 999999)

                # saving the otp token and email in database
                serializer = self.get_serializer(obj, data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save(token=token)

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

            else:
                token = random.randint(100000, 999999)

                # saving the otp token and email in database
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save(token=token)

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
            result = "otp sent successfully to new email id"
        else:
            result = "pw is not correct"
        print(result)
        return Response({
            "status": result
        })

# check otp for updating email


class checkOtpForUpdatingEmail(generics.GenericAPIView):
    serializer_class = UserSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        res = {"error": "OTP for the email couldn't be found"}
        # old_email = request.user.email
        user = User.objects.get(email=request.user.email)

        if (email_otp.objects.filter(email=request.data["email"]).exists()):
            new_email = request.data["email"]
            if ((int(email_otp.objects.get(email=new_email).token)) == (int(request.data["otp"]))):

                user.email = new_email
                user.save()

                # delete otp from database as it is of no use after the user gets registered

                otp_obj_of_the_email = email_otp.objects.get(
                    email=request.data["email"]).delete()
                # otp_obj_of_the_email.delete()

                res = {"status": "email updated"}
            else:
                res = {"error": "Invalid token"}
        print(res)
        return Response(res)


# update user's password


class updatePasswordApi(generics.GenericAPIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        user = request.user

        # updating password if old password of the user matches the old password that user mentioned
        if check_password(request.data["old_password"], user.password):
            user.set_password(request.data["new_password"])
            user.save()
            result = "pw successfully updated"
        else:
            result = "old pw is not correct"
        return Response({
            "status": result
        })

# User update API to update the required fields of user table
# this is primary user table


class UserUpdateApi(generics.GenericAPIView):
    serializer_class = UserSerializerToUpdateUserTable

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        obj = User.objects.get(email=request.user.email)

        # updating old object
        serializer = self.get_serializer(obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        user_profile_update = serializer.save()
        return Response({
            "status": "updated"
        })


# update or create user profile
# this is secondary user table

class UserProfileApi(generics.GenericAPIView):
    serializer_class = UserProfileSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        if Profile.objects.filter(user=request.user).exists():
            obj = Profile.objects.get(user=request.user)

            # updating old object
            serializer = self.get_serializer(obj, data=request.data)
            serializer.is_valid(raise_exception=True)
            user_profile_update = serializer.save(user=request.user)
            return Response({
                "status": "updated"
            })
        else:
            # creating new object
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user_profile_update = serializer.save(user=request.user)
            return Response({
                "status": "created"
            })

# Get User API


# class UserAPI(generics.RetrieveAPIView):
#     permission_classes = [
#         permissions.IsAuthenticated,
#     ]
#     serializer_class = UserSerializer

#     def get_object(self):
#         return self.request.user

# Get All User API


class GetAuthor(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        id = self.kwargs['id']
        return User.objects.get(id=id)

# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request, *args, **kwargs):
        if (email_otp.objects.filter(email=request.data["email"]).exists()):
            token = email_otp.objects.get(email=request.data["email"]).token
            if (int(token) == int(request.data["otp"])):
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                user = serializer.save()

                # delete otp from database as it is of no use after the user gets registered

                otp_obj_of_the_email = email_otp.objects.get(
                    email=request.data["email"])
                otp_obj_of_the_email.delete()

                return Response({
                    "user": UserSerializer(user, context=self.get_serializer_context()).data,
                    "token": AuthToken.objects.create(user)
                })
            else:
                return Response({
                    "error": "Wrong OTP"
                })

        else:
            return Response({
                "error": "OTP for the email couldn't be found"
            })

# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })
