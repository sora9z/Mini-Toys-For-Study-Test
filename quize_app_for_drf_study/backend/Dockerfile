# Step 1: Builder
FROM python:3-alpine as builder

WORKDIR /app

# Install build dependencies (for Alpine)
RUN apk add --no-cache gcc musl-dev libffi-dev

# Set virtual environment in /opt
RUN python3 -m venv /opt/venv
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Remove build dependencies after installation to minimize image size
RUN apk del gcc musl-dev libffi-dev

# Step 2: Runner
FROM python:3-alpine AS runner

WORKDIR /app

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv

# Copy entrypoint.sh script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Copy project files
COPY quiz_api quiz_api
COPY quiz quiz
COPY manage.py manage.py

# Set environment variables
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
# Default port, can be overridden with an environment variable
ENV PORT=8000  

# Expose the port, defaulting to 8000 (or configurable by environment)
EXPOSE ${PORT}

# Set the entrypoint to the entrypoint.sh script
ENTRYPOINT ["/app/entrypoint.sh"]
