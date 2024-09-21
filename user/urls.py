from django.urls import re_path
from .views import register, login, logout

urlpatterns = [
    re_path(r"register/", register, name="register"),
    re_path(r"login/", login, name="login"),
    re_path(r"logout/", logout, name="logout"),
]