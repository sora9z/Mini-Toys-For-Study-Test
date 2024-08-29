# Step1: Builder
FROM python:3-alpine as builder

WORKDIR /app

# set virtual environment
RUN python3 -m venv venv
ENV VIRTUAL_ENV=/app/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# rquirements.txt copy and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Step2: Runner
FROM python:3-alpine AS runner

WORKDIR /app

# cioy virtual environment from builder
COPY --from=builder /app/venv venv

# copy project file
COPY quiz_api quiz_api
COPY quiz quiz
COPY manage.py manage.py

# set environment variables
ENV VIRTUAL_ENV=/app/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ENV PORT=8000

# expose port
EXPOSE ${PORT}

# Run application by running Gunicorn
CMD gunicorn --bind :${PORT} --workers 1 quiz_api.wsgi
