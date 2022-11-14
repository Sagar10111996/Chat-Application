from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        # Add custom claims
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        return token


class UserRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = 'id', 'email', 'first_name', 'last_name'
        extra_kwargs = {'password': {'write_only': True}}


class UserListingSerializerForChat(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'id', 'email', 'first_name', 'last_name'
