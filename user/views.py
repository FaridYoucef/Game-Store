from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .models import UserProfile
from django.contrib.auth.hashers import make_password


@api_view(['POST'])
def register(reauest):
    date = request.data
    try:
        # Create the user
        user = User.object.create(
            username=data['username'],
            email=data['email'],
            password=make_password(date['password']) # Hashing the password
        )
        # Create the user profile
        userProfile.objects.create(user=user)
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=starus.HTTP_400_BAD-REQUEST)

