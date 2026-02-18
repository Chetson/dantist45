# Deployment Guide for VPS

This guide explains how to deploy the Dantist45 application to a VPS using Docker and GitHub.

## Prerequisites

Before deploying, ensure your VPS has:

- Ubuntu/Debian Linux (recommended)
- Docker and Docker Compose installed
- Git installed
- At least 2GB RAM
- Port 3000 open

## Option 1: Manual Deployment Script

### 1. SSH into your VPS

```bash
ssh user@your-vps-ip
```

### 2. Install Docker and Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Verify installation
docker --version
docker compose version
```

### 3. Set up Deployment Directory

```bash
sudo mkdir -p /opt/dantist45
sudo chown $USER:$USER /opt/dantist45
cd /opt/dantist45
```

### 4. Clone the Repository and Deploy

```bash
# Clone the repository
git clone https://github.com/Chetson/dantist45.git .

# Run deployment script
./deploy.sh
```

Or deploy specific branch:

```bash
./deploy.sh main
./deploy.sh develop
```

### 5. Access Your Application

```bash
# Check if it's running
docker-compose ps

# View logs
docker-compose logs -f

# Restart the application
docker-compose restart

# Stop the application
docker-compose down
```

Your application will be available at: `http://your-vps-ip:3000`

## Option 2: CI/CD Deployment (Recommended)

For production use, set up GitHub Actions:

### 1. Create GitHub Actions Workflow

Create file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_PORT }}
          script: |
            cd /opt/dantist45
            git pull origin main
            npm ci
            npm run build
            docker-compose down
            docker-compose up -d
```

### 2. Configure GitHub Secrets

Go to: Repository → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

- `VPS_HOST`: Your VPS IP address or domain
- `VPS_USER`: Your VPS username
- `VPS_SSH_KEY`: Your SSH private key
- `VPS_PORT`: SSH port (usually 22)

### 3. Configure VPS (One-time setup)

```bash
# On your VPS, set up SSH key-based authentication

# Generate SSH key on your local machine
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/github_actions.pub your-user@your-vps-ip

# Test SSH connection
ssh your-user@your-vps-ip
```

### 4. Deploy on Push

Whenever you push to the `main` branch, GitHub Actions will automatically deploy your application.

## Option 3: Git Push Deployment

Simplest method - SSH into VPS and run:

```bash
cd /opt/dantist45
git pull origin main
npm ci
npm run build
docker-compose down
docker-compose up -d
```

## Database Management

The application uses SQLite, which is stored in the `data` directory. To backup:

```bash
cd /opt/dantist45
docker-compose exec app ls -la data/
```

## Security Best Practices

1. **Use a reverse proxy**: Set up Nginx or Apache in front of Docker
2. **Use SSL**: Configure Let's Encrypt or other SSL certificates
3. **防火мент**: Configure firewall rules
4. **Update regularly**: Keep Docker, Node.js, and system packages updated

### Nginx Example Configuration

Create `/etc/nginx/sites-available/dantist45`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/dantist45 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable nginx
```

## Monitoring and Logs

```bash
# View real-time logs
docker-compose logs -f app

# Check container status
docker-compose ps

# Restart after updates
docker-compose restart app

# View resource usage
docker stats
```

## Troubleshooting

### Container won't start

```bash
docker-compose logs app
docker-compose down
docker-compose up -d
```

### Port already in use

```bash
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Application not responding

```bash
docker-compose restart app
```

### Database issues

```bash
docker-compose exec app rm -f data/*.db
docker-compose restart app
```
