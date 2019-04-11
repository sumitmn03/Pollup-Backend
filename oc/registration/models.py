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


# class email_otp(models.Model):
#     email = models.EmailField(max_length=255, unique=True)
#     token = models.IntegerField(default=000000)

#     # secret key that will be used to generate a token,
#     # User can provide a custom value to the key.

#     key = random_hex(20)

#     # counter with which last token was verified.
#     # Next token must be generated at a higher counter value.

#     # last_verified_counter = -1

#     # this value will return True, if a token has been successfully
#     # verified.

#     # verified = False

#     # number of digits in a token. Default is 6
#     number_of_digits = 6
#     # validity period of a token. Default is 30 second.
#     token_validity_period = 35

#     def totp_obj(self):
#         # create a TOTP object
#         totp = TOTP(key=self.key,
#                     step=self.token_validity_period,
#                     digits=self.number_of_digits)
#         # the current time will be used to generate a counter
#         totp.time = time.time()
#         return totp

#     def generate_token(self):
#         # get the TOTP object and use that to create token
#         totp = self.totp_obj()
#         # token can be obtained with `totp.token()`
#         token = str(totp.token()).zfill(6)
#         return token

#     def verify_token(self, token, tolerance=0):
#         try:
#             # convert the input token to integer
#             token = int(token)
#         except ValueError:
#             # return False, if token could not be converted to an integer
#             self.verified = False
#         else:
#             totp = self.totp_obj()
#             # check if the current counter value is higher than the value of
#             # last verified counter and check if entered token is correct by
#             # calling totp.verify_token()
#             if ((totp.t() > self.last_verified_counter) and
#                     (totp.verify(token, tolerance=tolerance))):
#                 # if the condition is true, set the last verified counter value
#                 # to current counter value, and return True
#                 self.last_verified_counter = totp.t()
#                 self.verified = True
#             else:
#                 # if the token entered was invalid or if the counter value
#                 # was less than last verified counter, then return False
#                 self.verified = False
#         return self.verified

#     def __str__(self):
#         return (str(self.email) if self.email else "null")
