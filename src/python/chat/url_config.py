from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('users', views.get_users, name='get_users'),
    path('messages/<uuid:receiver_id>', views.get_messages, name='get_messages'),
    path('message', views.send_message, name='send_message'),
]
