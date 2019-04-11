from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager
)
import datetime


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, date_of_birth, password=None, is_staff=False, is_admin=False, is_active=True):
        if not email:
            raise ValueError("users must have an email address")
        if not password:
            raise ValueError("users must have a password")
        if not first_name:
            raise ValueError("users must have a first name")
        if not date_of_birth:
            raise ValueError("users must have a date of birth")
        user_obj = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            date_of_birth=date_of_birth
        )
        user_obj.set_password(password)
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, first_name, date_of_birth, password=None):
        user = self.create_user(
            email,
            first_name,
            date_of_birth,
            password=password,
            is_staff=True
        )
        return user

    def create_superuser(self, email, first_name, date_of_birth, password=None):
        user = self.create_user(
            email,
            first_name,
            date_of_birth,
            password=password,
            is_staff=True,
            is_admin=True
        )
        return user


class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    date_of_birth = models.DateField(
        auto_now=False, auto_now_add=False, blank=False, null=True)

    USERNAME_FIELD = 'email'
    # USERNAME_FIELD and password are required by default
    REQUIRED_FIELDS = ['first_name', 'date_of_birth']

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_first_name(self):
        if self.first_name:
            return self.first_name
        return self.email

    def get_short_name(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_active(self):
        return self.active


class Profile(models.Model):
    user = models.OneToOneField(
        User, related_name="profile", on_delete=models.CASCADE, default=1)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    contact_no = models.IntegerField(blank=True, null=True)
    current_city = models.CharField(max_length=200, blank=True, null=True)
    hometown = models.CharField(max_length=200, blank=True, null=True)
    # 1 self-employed, 2 government-employee, 3 student, 4 housewife, 5 professional, 6 business-man, 7 executive, 8 unemployed, 9 seeking-new-opportunities
    occupation = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return (str(self.user) if self.user else "null")
