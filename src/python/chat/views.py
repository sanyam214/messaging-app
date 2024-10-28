from .models import User, Message
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.utils import timezone
import json

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    user_id = request.user.id
    users = User.objects.exclude(id=user_id).values('id', 'username')
    return Response(users, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request, receiver_id):
    sender_id = request.user.id
    messages = Message.objects.filter(
        (Q(sender_id=sender_id) & Q(receiver_id=receiver_id)) |
        (Q(sender_id=receiver_id) & Q(receiver_id=sender_id))
    ).order_by('-timestamp')[:50]

    messages_data = [
        {
            'message': msg.message,
            'sender_id': msg.sender_id,
            'receiver_id': msg.receiver_id,
            'timestamp': msg.timestamp,
            'sender_username': msg.sender.username,
            'receiver_username': msg.receiver.username,
        } for msg in messages
    ]
    return Response(messages_data[::-1], status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    sender_id = request.user.id
    receiver_id = request.data.get('receiverId')
    message_content = request.data.get('message')
    timestamp = timezone.now()

    new_message = {'sender': sender_id, 'receiver': receiver_id, 'message': message_content, 'timestamp': str(timestamp)}

    try:
        message_record = Message.objects.get(sender_id=sender_id, receiver_id=receiver_id)
        messages = json.loads(message_record.message)
        messages.append(new_message)
        if len(messages) > 50:
            messages = messages[-50:]
        message_record.message = json.dumps(messages)
        message_record.timestamp = timestamp
    except Message.DoesNotExist:
        message_record = Message(sender_id=sender_id, receiver_id=receiver_id, message=json.dumps([new_message]), timestamp=timestamp)

    message_record.save()
    return Response({'message': 'Message sent'}, status=status.HTTP_201_CREATED)
