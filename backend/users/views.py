from django.shortcuts import render
from rest_framework import generics, permissions
from django.contrib.auth.models import User

# Create your views here.
class SignUpView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]