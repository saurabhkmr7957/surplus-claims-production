"""
WSGI entry point for production deployment.
This file is used by Gunicorn and other WSGI servers.
"""

import os
from main import create_app

# Create application instance
app = create_app(os.environ.get('FLASK_ENV', 'production'))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False)

