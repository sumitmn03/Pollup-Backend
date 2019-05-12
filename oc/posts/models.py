from django.db import models
# from django.contrib.auth.models import User

from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.


class poll_table(models.Model):
    posts = models.CharField(max_length=500, blank=True, null=True)
    author = models.ForeignKey(
        User, related_name="posts", on_delete=models.CASCADE, default=1)
    no_of_options = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (str(self.posts) if self.posts else "null")


class option_table(models.Model):
    posts = models.ForeignKey(
        poll_table, related_name="options", on_delete=models.CASCADE)
    option = models.CharField(max_length=50, blank=True, null=True)
    count = models.IntegerField(default=0)

    def __str__(self):
        return (str(self.option) if self.option else "null")


class opted_by_table(models.Model):
    posts = models.ForeignKey(
        poll_table, related_name="opted_by", on_delete=models.CASCADE, default=1)
    posts_option = models.ForeignKey(
        option_table, related_name="opted_by", on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, related_name="opted", on_delete=models.CASCADE, default=1)

    def __str__(self):
        return "just check by yourself"


class comments_table(models.Model):
    post_type = models.IntegerField(default=1)
    posts = models.IntegerField()

    # posts = models.ForeignKey(
    #     poll_table, related_name="comments", on_delete=models.CASCADE)
    author = models.ForeignKey(
        User, related_name="comments", on_delete=models.CASCADE)
    parent_comment = models.ForeignKey(
        "self", related_name="children_comment", on_delete=models.CASCADE, blank=True, null=True)
    comment = models.CharField(max_length=50, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (str(self.comment) if self.comment else "null")

    def children(self):
        return comments_table.objects.filter(parent_comment=self).order_by('-timestamp')

    @property
    def is_parent(self):
        if self.parent_comment:
            return False
        return True


class follow_table(models.Model):
    # the user being followed
    following = models.ForeignKey(
        User, related_name="follower", on_delete=models.CASCADE)
    # the follower user
    follower = models.ForeignKey(
        User, related_name="following", on_delete=models.CASCADE, default=1)

    def __str__(self):
        return (str(self.following) if self.following else "null")


class report_table(models.Model):
    post_type = models.IntegerField(default=0)
    post_id = models.IntegerField(default=0)
    report = models.IntegerField(default=0)
    solved = models.BooleanField(default=False)
    reported_user = models.ForeignKey(
        User, related_name="reported_post", on_delete=models.CASCADE, default=1)

    def __str__(self):
        return (str(self.report) if self.report else "null")


class notification_table(models.Model):
    notification_for = models.IntegerField(default=0)
    user = models.ForeignKey(
        User, related_name="notifications", on_delete=models.CASCADE)
    type_id = models.IntegerField(default=0)
    count = models.IntegerField(default=0)
    notification = models.CharField(max_length=500, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (str(self.notification) if self.notification else "null")
