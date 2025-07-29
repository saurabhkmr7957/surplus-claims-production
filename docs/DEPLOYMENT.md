# Production Deployment Guide

This guide provides step-by-step instructions for deploying the Surplus Claims Investment Platform to a production environment.

## 📋 Prerequisites

### System Requirements
- **Operating System**: Ubuntu 22.04 LTS (recommended) or Amazon Linux 2
- **Memory**: Minimum 4GB RAM (8GB+ recommended)
- **Storage**: Minimum 20GB SSD (50GB+ recommended)
- **CPU**: 2+ vCPU cores
- **Network**: Public IP address and domain name

### Required Software
- Python 3.11+
- Node.js 18+
- PostgreSQL 13+
- Nginx
- SSL Certificate (Let's Encrypt recommended)

### AWS Services (if using AWS)
- EC2 instance
- RDS PostgreSQL database
- Route 53 for DNS
- Certificate Manager for SSL
- S3 for file storage (optional)
- CloudFront for CDN (optional)

## 🚀 Deployment Methods

### Method 1: Traditional Server Deployment (Recommended)

#### Step 1: Server Setup

**Launch EC2 Instance**
```bash
# Choose Ubuntu 22.04 LTS
# Instance type: t3.medium or larger
# Security Group: Allow HTTP (80), HTTPS (443), SSH (22)
# Storage: 20GB+ GP3 SSD
```

**Initial Server Configuration**
```bash
# Connect to server
ssh -i your-key.pem ubuntu@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y python3.11 python3.11-venv python3-pip nginx postgresql-client git curl
```

**Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Step 2: Database Setup

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE surplus_claims;
CREATE USER surplus_user WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE surplus_claims TO surplus_user;
\q
```

**Option B: AWS RDS (Recommended)**
```bash
# Create RDS PostgreSQL instance
# Instance class: db.t3.micro or larger
# Storage: 20GB+ GP3
# Multi-AZ: Yes (for production)
# Backup retention: 7+ days
```

#### Step 3: Application Deployment

**Create Application Directory**
```bash
sudo mkdir -p /var/www/surplus-claims
sudo chown ubuntu:ubuntu /var/www/surplus-claims
cd /var/www/surplus-claims
```

**Upload Application Code**
```bash
# Upload the surplus-claims-production folder to the server
# You can use scp, rsync, or git clone

# Example using scp:
scp -i your-key.pem -r surplus-claims-production/* ubuntu@your-server:/var/www/surplus-claims/
```

**Setup Python Environment**
```bash
cd /var/www/surplus-claims/backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Build Frontend Applications**
```bash
# Build investor platform
cd /var/www/surplus-claims/frontend-investor
npm install
npm run build

# Build admin platform
cd /var/www/surplus-claims/frontend-admin
npm install
npm run build

# Copy built files to backend static directory
cp -r /var/www/surplus-claims/frontend-investor/dist/* /var/www/surplus-claims/backend/static/investor/
cp -r /var/www/surplus-claims/frontend-admin/dist/* /var/www/surplus-claims/backend/static/admin/
```

**Configure Environment**
```bash
cd /var/www/surplus-claims/backend
cp .env.example .env
nano .env

# Update with your configuration:
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-here
DATABASE_URL=postgresql://surplus_user:password@localhost:5432/surplus_claims
CORS_ORIGINS=https://yourdomain.com
```

**Initialize Database**
```bash
# Run database initialization
psql -h localhost -U surplus_user -d surplus_claims -f /var/www/surplus-claims/deployment/init.sql
```

#### Step 4: Configure Application Service

**Create Systemd Service**
```bash
sudo cp /var/www/surplus-claims/deployment/systemd.service /etc/systemd/system/surplus-claims.service

# Edit service file if needed
sudo nano /etc/systemd/system/surplus-claims.service

# Create required directories
sudo mkdir -p /var/log/surplus-claims /var/run/surplus-claims
sudo chown ubuntu:ubuntu /var/log/surplus-claims /var/run/surplus-claims

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable surplus-claims
sudo systemctl start surplus-claims
sudo systemctl status surplus-claims
```

#### Step 5: Configure Nginx

**Setup Nginx Configuration**
```bash
sudo cp /var/www/surplus-claims/deployment/nginx.conf /etc/nginx/sites-available/surplus-claims

# Edit configuration with your domain
sudo nano /etc/nginx/sites-available/surplus-claims
# Replace 'your-domain.com' with your actual domain

# Enable site
sudo ln -s /etc/nginx/sites-available/surplus-claims /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 6: SSL Certificate Setup

**Using Let's Encrypt (Recommended)**
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

**Using AWS Certificate Manager**
```bash
# If using ALB, configure SSL termination at load balancer level
# Update Nginx configuration to handle forwarded headers
```

#### Step 7: Final Configuration

**Configure Firewall**
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

**Setup Log Rotation**
```bash
sudo nano /etc/logrotate.d/surplus-claims

# Add log rotation configuration:
/var/log/surplus-claims/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 0644 ubuntu ubuntu
    postrotate
        systemctl reload surplus-claims
    endscript
}
```

### Method 2: Docker Deployment

#### Step 1: Install Docker
```bash
# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Step 2: Deploy with Docker Compose
```bash
cd /var/www/surplus-claims

# Copy environment file
cp deployment/.env.docker .env
nano .env  # Update with your values

# Start services
docker-compose -f deployment/docker-compose.yml up -d

# Check status
docker-compose -f deployment/docker-compose.yml ps
```

### Method 3: AWS Elastic Beanstalk

#### Step 1: Prepare Application
```bash
# Install EB CLI
pip install awsebcli

# Create application.py (EB entry point)
cd /var/www/surplus-claims/backend
cp wsgi.py application.py

# Create .ebextensions directory
mkdir .ebextensions
```

#### Step 2: Configure Elastic Beanstalk
```bash
# Create EB configuration
cat > .ebextensions/python.config << EOF
option_settings:
  aws:elasticbeanstalk:container:python:
    WSGIPath: application:app
  aws:elasticbeanstalk:application:environment:
    FLASK_ENV: production
    PYTHONPATH: "/var/app/current:\$PYTHONPATH"
EOF
```

#### Step 3: Deploy
```bash
# Initialize EB application
eb init surplus-claims-platform

# Create environment
eb create production

# Deploy application
eb deploy
```

## 🔧 Post-Deployment Configuration

### Health Checks
```bash
# Test application health
curl -f https://yourdomain.com/health

# Check service status
sudo systemctl status surplus-claims
sudo systemctl status nginx
```

### Monitoring Setup
```bash
# Install CloudWatch agent (if using AWS)
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb

# Configure monitoring
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

### Backup Configuration
```bash
# Create backup script
cat > /home/ubuntu/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U surplus_user surplus_claims > /home/ubuntu/backups/db_backup_$DATE.sql
tar -czf /home/ubuntu/backups/app_backup_$DATE.tar.gz /var/www/surplus-claims
find /home/ubuntu/backups -name "*.sql" -mtime +7 -delete
find /home/ubuntu/backups -name "*.tar.gz" -mtime +7 -delete
EOF

chmod +x /home/ubuntu/backup.sh

# Add to crontab
crontab -e
# Add: 0 2 * * * /home/ubuntu/backup.sh
```

## 🚨 Troubleshooting

### Common Issues

**Service Won't Start**
```bash
# Check logs
sudo journalctl -u surplus-claims -f
tail -f /var/log/surplus-claims/error.log

# Check configuration
sudo systemctl status surplus-claims
```

**Database Connection Issues**
```bash
# Test database connection
psql -h localhost -U surplus_user -d surplus_claims -c "SELECT 1;"

# Check database logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

**Nginx Configuration Issues**
```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

**SSL Certificate Issues**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew
```

### Performance Tuning

**Database Optimization**
```sql
-- Add indexes for better performance
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_transactions_user_id ON transactions(user_id);
CREATE INDEX CONCURRENTLY idx_transactions_date ON transactions(created_date);

-- Update statistics
ANALYZE;
```

**Application Tuning**
```bash
# Adjust Gunicorn workers
nano /var/www/surplus-claims/deployment/gunicorn.conf.py
# workers = (2 * CPU_COUNT) + 1

# Restart application
sudo systemctl restart surplus-claims
```

## 📊 Monitoring and Maintenance

### Regular Maintenance Tasks
- **Daily**: Check application logs and health
- **Weekly**: Review database performance and backup integrity
- **Monthly**: Update system packages and security patches
- **Quarterly**: Review and rotate secrets and certificates

### Monitoring Checklist
- [ ] Application health endpoint responding
- [ ] Database connectivity working
- [ ] SSL certificate valid and not expiring soon
- [ ] Disk space sufficient
- [ ] Memory usage within limits
- [ ] CPU usage normal
- [ ] Backup process working
- [ ] Log rotation functioning

## 🔒 Security Checklist

### Pre-Deployment Security
- [ ] Environment variables properly configured
- [ ] Database credentials secure
- [ ] JWT secrets generated and secure
- [ ] CORS origins properly restricted
- [ ] Debug mode disabled in production

### Post-Deployment Security
- [ ] Firewall configured and enabled
- [ ] SSH access restricted
- [ ] SSL certificate installed and working
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Regular security updates scheduled

## 📞 Support and Maintenance

### Getting Help
- Check application logs first
- Review this documentation
- Test individual components
- Contact technical support if needed

### Maintenance Contacts
- **System Administrator**: For server and infrastructure issues
- **Database Administrator**: For database performance and backup issues
- **Application Developer**: For application bugs and feature requests
- **Security Team**: For security incidents and compliance

---

This deployment guide provides comprehensive instructions for production deployment. Follow the steps carefully and test thoroughly before going live with real user data.

