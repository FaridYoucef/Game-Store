from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from .models import UserProfile


#Creating the user register method
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
         # Check if the data provided is valid then save it 
        if serializer.is_valid():
            user = serializer.save()
            
             # Create a token and respond with generated token data
            token = Token.objects.create(user=user)
            return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#Creating the user login method
@api_view(['POST'])
def login(request):
    # Get the username and password from the request
    username = request.data.get('username')
    password = request.data.get('password')

    # Authenticate the user
    user = authenticate(username=username, password=password)

    if user is not None:
        # If the user exists and is authenticated, generate or get a token
        token, created = Token.objects.get_or_create(user=user)
        # Serialize the user data
        serializer = UserSerializer(user)
        # Return the token and user info
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)
    else:
        # If authentication fails, return an error message
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
    
    
    
# User logout method
@api_view(['POST'])
def logout(request):
    # Get the token of the authenticated user from the request
    token = request.auth
    
    # If the token exists, delete it to log the user out
    if token:
        token.delete()
        return Response({"message": "User logged out successfully"}, status=status.HTTP_200_OK)
    
    # If no token is found, return an error
    return Response({"error": "No token provided, user not authenticated"}, status=status.HTTP_400_BAD_REQUEST)


# users_without_profile = User.objects.filter(userprofile__isnull=True)
# for user in users_without_profile:
#     UserProfile.objects.create(user=user)