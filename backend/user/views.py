from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer, UserProfileSerializer
from .models import UserProfile
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import status

# Create user view (for registration)
@method_decorator(csrf_exempt, name='dispatch')
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Retrieve user profile view (requires authentication)
class UserProfileView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Get the user's profile (if it doesn't exist, create it)
        user = self.request.user
        UserProfile.objects.get_or_create(user=user)  # Ensure profile exists
        return user.userprofile


# Update user profile view (requires authentication)
class UpdateUserProfileView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile
    

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)    
