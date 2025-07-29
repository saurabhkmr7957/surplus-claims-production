# Gunicorn configuration file for production deployment

import multiprocessing
import os

# Server socket
bind = "0.0.0.0:5000"
backlog = 2048

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2

# Restart workers after this many requests, to help prevent memory leaks
max_requests = 1000
max_requests_jitter = 100

# Logging
accesslog = "/var/log/surplus-claims/access.log"
errorlog = "/var/log/surplus-claims/error.log"
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s'

# Process naming
proc_name = "surplus-claims-api"

# Server mechanics
daemon = False
pidfile = "/var/run/surplus-claims/surplus-claims.pid"
user = "ubuntu"
group = "ubuntu"
tmp_upload_dir = None

# SSL (uncomment if using SSL termination at Gunicorn level)
# keyfile = "/path/to/private.key"
# certfile = "/path/to/certificate.crt"

# Environment variables
raw_env = [
    "FLASK_ENV=production",
]

# Preload application for better performance
preload_app = True

# Worker timeout for graceful shutdown
graceful_timeout = 30

# Maximum number of pending connections
backlog = 2048

