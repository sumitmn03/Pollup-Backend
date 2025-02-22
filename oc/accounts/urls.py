from django.urls import path, include
from .api import RegisterAPI, LoginAPI, GetAuthor, GetCurrentUser, UserProfileApi, UserUpdateApi, updatePasswordApi, updateEmailApi, checkOtpForUpdatingEmail
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    # path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/author/<int:id>/', GetAuthor.as_view()),
    path('api/currentuser', GetCurrentUser.as_view()),
    path('api/editusersecpro', UserProfileApi.as_view()),
    path('api/editusermainpro', UserUpdateApi.as_view()),
    path('api/updatepassword', updatePasswordApi.as_view()),
    path('api/updateemail', updateEmailApi.as_view()),
    path('api/checkemailupdateotp', checkOtpForUpdatingEmail.as_view()),
    # path('post/<int:id>/', views.post, name='post')

]
