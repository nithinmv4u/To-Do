from django.shortcuts import render
from rest_framework import generics
from .models import Tasks
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

# Create your views 
class TaskCreate(generics.ListCreateAPIView):
    pagination_class = PageNumberPagination
    permission_classes = [IsAuthenticated]
    # queryset = Tasks.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(user = user)
    
    def perform_create(self, serializer):
        serializer.save(user = self.request.user)

    # def create(self, request, *args, **kwargs):
    #     print("Received data from the frontend:")
    #     print(request.data) 
    #     return super().create(request, *args, **kwargs)

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
        