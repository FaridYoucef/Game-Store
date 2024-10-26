from django.urls import path, include
from .views import CreateUserView, UserProfileView, UpdateUserProfileView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("user/register/", CreateUserView.as_view(), name="register"),  # Register a new user
    path("user/profile/", UserProfileView.as_view(), name="profile"),  # Retrieve user profile
    path("user/profile/update/", UpdateUserProfileView.as_view(), name="update_profile"),  # Update user profile
    path("token/", TokenObtainPairView.as_view(), name="get_token"),  # JWT token obtain
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),  # JWT token refresh
    path("api-auth/", include("rest_framework.urls")),  # DRF authentication
    path('user/logout/', LogoutView.as_view(), name='logout'),
]
