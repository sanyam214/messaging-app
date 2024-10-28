import datetime

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'messaging_app',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

INSTALLED_APPS = [
    ...,
    'rest_framework',
    'chat',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
}

JWT_AUTH = {
    'JWT_SECRET_KEY': 'ansdj0swdavkmanehfblx#$%ndc',
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=1),
}
