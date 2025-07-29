# Surplus Claims Investment Platform

A complete web-based investment platform for surplus claims trading, featuring both investor and administrative interfaces.

## 🚀 Platform Overview

The Surplus Claims Investment Platform is a comprehensive financial technology solution that enables investors to purchase surplus claims from foreclosure auctions. The platform consists of two main interfaces:

- **Investor Platform**: Complete user journey from registration to investment management
- **Admin Dashboard**: Full administrative control for managing users, investments, and platform operations

## ✨ Key Features

### Investor Platform
- **User Authentication**: Complete registration and login flow with multi-step verification
- **Investment Dashboard**: Portfolio overview with real-time returns tracking
- **Investment Flow**: 6-step investment process with asset selection and account type management
- **Wallet Management**: Balance tracking, transaction history, and payout requests
- **Support System**: Integrated ticketing system for customer support

### Admin Dashboard
- **User Management**: Complete oversight of investor accounts and verification
- **Transaction Management**: Real-time transaction tracking and approval system
- **Investment Package Management**: Create and manage investment opportunities
- **Partner Management**: Partner onboarding and commission tracking
- **Support Management**: Customer support ticket handling
- **Analytics**: Comprehensive reporting and platform metrics

## 🏗️ Architecture

### Technology Stack
- **Backend**: Python 3.11 + Flask + SQLAlchemy
- **Frontend**: React 18 + Vite
- **Database**: PostgreSQL (production) / SQLite (development)
- **Web Server**: Nginx + Gunicorn
- **Deployment**: AWS EC2, Docker, or traditional server deployment

### Project Structure
```
surplus-claims-production/
├── backend/                 # Flask API server
│   ├── main.py             # Application entry point
│   ├── wsgi.py             # WSGI entry point for production
│   ├── config.py           # Configuration management
│   ├── requirements.txt    # Python dependencies
│   └── static/             # Built frontend files
├── frontend-investor/       # React investor platform
│   ├── src/                # Source code
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Build configuration
├── frontend-admin/          # React admin dashboard
│   ├── src/                # Source code
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Build configuration
├── deployment/              # Deployment configurations
│   ├── nginx.conf          # Nginx configuration
│   ├── systemd.service     # Systemd service file
│   ├── gunicorn.conf.py    # Gunicorn configuration
│   ├── Dockerfile          # Docker configuration
│   ├── docker-compose.yml  # Docker Compose setup
│   └── init.sql            # Database initialization
└── docs/                   # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 13+ (for production)
- Nginx (for production deployment)

### Development Setup

1. **Clone and Setup Backend**
```bash
cd backend
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Setup Frontend Applications**
```bash
# Investor platform
cd frontend-investor
npm install
npm run build

# Admin platform
cd ../frontend-admin
npm install
npm run build
```

3. **Configure Environment**
```bash
cp backend/.env.example backend/.env
# Edit .env with your configuration
```

4. **Run Development Server**
```bash
cd backend
python main.py
```

The platform will be available at:
- Investor Platform: http://localhost:5000/
- Admin Dashboard: http://localhost:5000/admin

## 📋 Deployment Options

### Option 1: Traditional Server Deployment (Recommended)
See `docs/DEPLOYMENT.md` for detailed AWS EC2 deployment instructions.

### Option 2: Docker Deployment
```bash
# Copy environment file
cp deployment/.env.docker .env

# Start services
docker-compose -f deployment/docker-compose.yml up -d
```

### Option 3: AWS Elastic Beanstalk
See `docs/AWS_DEPLOYMENT.md` for Elastic Beanstalk deployment guide.

## 🔧 Configuration

### Environment Variables
Key environment variables that need to be configured:

```bash
# Flask Configuration
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
DEBUG=False

# Database
DATABASE_URL=postgresql://user:pass@localhost/surplus_claims

# Security
JWT_SECRET_KEY=your-jwt-secret-key
CORS_ORIGINS=https://yourdomain.com

# Optional: Email, AWS, etc.
```

See `.env.example` for complete configuration options.

## 🔒 Security Features

- **Authentication**: JWT-based authentication with secure session management
- **Authorization**: Role-based access control for admin and investor interfaces
- **Data Protection**: Input validation, SQL injection prevention, XSS protection
- **HTTPS**: SSL/TLS encryption for all communications
- **Rate Limiting**: API rate limiting to prevent abuse
- **Security Headers**: Comprehensive security headers via Nginx

## 📊 API Documentation

The platform provides a comprehensive REST API with the following endpoints:

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh

### Investments
- `GET /api/investments` - List investment packages
- `POST /api/investments` - Create investment
- `GET /api/investments/{id}` - Get investment details

### User Management
- `GET /api/users` - List users (admin only)
- `PUT /api/users/{id}` - Update user
- `GET /api/users/{id}/transactions` - User transactions

### Support
- `GET /api/support/tickets` - List support tickets
- `POST /api/support/tickets` - Create support ticket
- `PUT /api/support/tickets/{id}` - Update ticket

## 🧪 Testing

### Running Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd frontend-investor
npm test

cd ../frontend-admin
npm test
```

## 📈 Monitoring and Logging

### Application Logs
- Backend logs: `/var/log/surplus-claims/`
- Nginx logs: `/var/log/nginx/`
- Application metrics via built-in endpoints

### Health Checks
- Application health: `GET /health`
- Database connectivity: Automatic health checks
- Service monitoring via systemd

## 🔄 Backup and Recovery

### Database Backups
```bash
# Create backup
pg_dump surplus_claims > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
psql surplus_claims < backup_file.sql
```

### File Backups
- User uploads: `/var/www/surplus-claims/uploads/`
- Application logs: `/var/log/surplus-claims/`
- Configuration files: `/var/www/surplus-claims/`

## 🚀 Performance Optimization

### Production Optimizations
- **Gunicorn**: Multi-worker WSGI server
- **Nginx**: Static file serving and reverse proxy
- **Database**: Connection pooling and query optimization
- **Caching**: Redis integration for session and data caching
- **CDN**: CloudFront integration for static assets

### Scaling Considerations
- **Horizontal Scaling**: Load balancer with multiple app servers
- **Database Scaling**: Read replicas and connection pooling
- **File Storage**: S3 integration for user uploads
- **Monitoring**: CloudWatch integration for metrics and alerts

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

### Code Standards
- **Python**: PEP 8 compliance, type hints
- **JavaScript**: ESLint configuration, modern ES6+
- **Git**: Conventional commit messages
- **Testing**: Comprehensive test coverage

## 📞 Support

### Technical Support
- **Documentation**: Complete deployment and API documentation
- **Issues**: GitHub issues for bug reports and feature requests
- **Security**: Responsible disclosure for security issues

### Business Support
- **Platform Training**: Admin and user training materials
- **Compliance**: Financial services compliance guidance
- **Integration**: Third-party service integration support

## 📄 License

This project is proprietary software. All rights reserved.

## 🔗 Related Documentation

- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Documentation](docs/API.md)
- [Security Guide](docs/SECURITY.md)
- [Admin Manual](docs/ADMIN_MANUAL.md)
- [User Guide](docs/USER_GUIDE.md)

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Minimum Requirements**: Python 3.11+, Node.js 18+, PostgreSQL 13+

