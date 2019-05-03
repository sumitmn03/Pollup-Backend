from django.db import models

# from django_otp.oath import TOTP
# from django_otp.util import random_hex
# from unittest import mock
# import time
# import random


from django.contrib.auth import get_user_model
User = get_user_model()


class email_otp(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    token = models.IntegerField(default=000000)

    # def generate_token(self):
    #     return random.randint(100000, 999999)

    def verify_token(self, user_entered_token):
        try:
            # convert the input token to integer
            user_entered_token = int(user_entered_token)
        except ValueError:
            # return False, if token could not be converted to an integer
            return False
        else:
            if (self.token == user_entered_token):
                return True
            else:
                return False

    def __str__(self):
        return (str(self.email) if self.email else "null")
