from django.urls import re_path
from .views import register, login

urlpatterns = [
    re_path(r"register/", register, name="register"),
    re_path(r"login/", login, name="login"),  # Add trailing slash here
]