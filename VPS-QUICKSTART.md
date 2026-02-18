# Quick Start Guide - VPS Deployment

## Quick Deployment (3 Steps)

### 1. SSH into your VPS

```bash
ssh user@your-vps-ip
```

### 2. Install Docker (if not installed)

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
```

### 3. Deploy Application

```bash
sudo mkdir -p /opt/dantist45
sudo chown $USER:$USER /opt/dantist45
cd /opt/dantist45
git clone https://github.com/Chetson/dantist45.git .
./deploy.sh
```

## Access Your Application

```bash
# Check if it's running
docker-compose ps

# View logs
docker-compose logs -f

# Stop the app
docker-compose down
```

Application will be available at: `http://your-vps-ip:3000`

Default admin credentials:

- Username: `admin`
- Password: `admin123`

## Need Help?

Check the full deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
