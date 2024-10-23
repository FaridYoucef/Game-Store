from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nested serializer to include user details
    profile_image = serializers.ImageField(required=False)
    address = serializers.CharField(required=False)
    phone_number = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)

    class Meta:
        model = UserProfile
        fields = ['user', 'profile_image', 'address', 'phone_number', 'date_of_birth']
