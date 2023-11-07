from django.urls import path
from .views import TaskCreate, TaskRetriveUpdateDestroy

urlpatterns = [
    path('tasks/', TaskCreate.as_view(), name='task-list-create'),
    path('tasks/<int:pk>', TaskRetriveUpdateDestroy.as_view(), name='task-retrieve-update-destroy'),
]
