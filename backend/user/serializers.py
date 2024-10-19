from django.contrib.auth.models import User
from rest_framework import serializers
# # from .models import UserProfile




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
    
    
    

# class UserProfileSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)  # Nested user data

#     class Meta:
#         model = UserProfile
#         fields = ['user', 'phone_number', 'address', 'profile_picture', 'date_of_birth']    