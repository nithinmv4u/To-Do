from django.shortcuts import render
from rest_framework import generics
from .models import Tasks
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views 
class TaskCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    # queryset = Tasks.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(user = user)
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

class TaskRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    # queryset = Tasks.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(user = user)
    
    def perform_update(self, serializer):
        return super().perform_update(serializer)

    def perform_destroy(self, instance):
        return super().perform_destroy(instance)
        