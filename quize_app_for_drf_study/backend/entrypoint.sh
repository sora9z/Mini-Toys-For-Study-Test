#!/bin/sh

# Apply database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Gunicorn server
# exec 명령을 사용하면 스크립트가 Gunicorn을 실행할 때 PID 1로 대체되어 신호 전달이 올바르게 처리된다.
exec gunicorn --bind :${PORT:-8000} --workers 2 quiz_api.wsgi
