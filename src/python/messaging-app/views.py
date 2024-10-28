from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password, check_password
from .models import User
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

@api_view(['POST'])
def register(request):
    data = request.data
    username = data.get('username')
    email = data.get('email')
    password = make_password(data.get('password'))

    user = User(username=username, email=email, password=password)
    user.save()
    return Response({'message': 'User registered'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

    if check_password(password, user.password):
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return Response({'token': token, 'user': {'id': user.id, 'username': user.username}}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
