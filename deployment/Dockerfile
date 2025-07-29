# Multi-stage Dockerfile for Surplus Claims Platform

# Stage 1: Build frontend applications
FROM node:20-alpine AS frontend-builder

# Build investor platform
WORKDIR /app/frontend-investor
COPY frontend-investor/package*.json ./
RUN npm ci --only=production
COPY frontend-investor/ ./
RUN npm run build

# Build admin platform
WORKDIR /app/frontend-admin
COPY frontend-admin/package*.json ./
RUN npm ci --only=production
COPY frontend-admin/ ./
RUN npm run build

# Stage 2: Production backend
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV FLASK_ENV=production

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        gcc \
        python3-dev \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Create application directory
WORKDIR /app

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy and install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application
COPY backend/ ./

# Copy built frontend applications
COPY --from=frontend-builder /app/frontend-investor/dist ./static/investor/
COPY --from=frontend-admin /app/frontend-admin/dist ./static/admin/

# Create necessary directories
RUN mkdir -p /app/logs /app/uploads \
    && chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Start application
CMD ["gunicorn", "--config", "gunicorn.conf.py", "wsgi:app"]

