from .models import Tasks
from rest_framework import serializers

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['id','title', 'description', 'due_date', 'is_completed']
        read_only_fields = ['created_at', 'user']
        # extra_kwargs = {
        #     'is_completed': {'required': False} 
        # }