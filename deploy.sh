#!/bin/bash

# Configuration
REPO_URL="https://github.com/Chetson/dantist45.git"
BRANCH="${1:-main}"
DEPLOY_DIR="/opt/dantist45"
GIT_TOKEN="${GITHUB_TOKEN:-}"  # Optional: for private repos

echo "=== Dantist45 Deployment Script ==="
echo "Repository: $REPO_URL"
echo "Branch: $BRANCH"
echo "Deploy Directory: $DEPLOY_DIR"
echo ""

# Create deployment directory
echo "[1/8] Creating deployment directory..."
sudo mkdir -p $DEPLOY_DIR
sudo chown $USER:$USER $DEPLOY_DIR

# Clone or pull the repository
echo "[2/8] Updating repository..."
cd $DEPLOY_DIR

if [ -d ".git" ]; then
    echo "Repository already exists, pulling latest changes..."
    if [ -n "$GIT_TOKEN" ]; then
        git pull https://$GIT_TOKEN@github.com/Chetson/dantist45.git $BRANCH
    else
        git pull origin $BRANCH
    fi
else
    echo "Cloning repository..."
    if [ -n "$GIT_TOKEN" ]; then
        git clone https://$GIT_TOKEN@github.com/Chetson/dantist45.git .
    else
        git clone -b $BRANCH $REPO_URL .
    fi
fi

# Install dependencies
echo "[3/8] Installing dependencies..."
npm ci

# Build the application
echo "[4/8] Building application..."
npm run build

# Stop existing container (if running)
echo "[5/8] Stopping existing container..."
docker-compose down 2>/dev/null || true

# Start the application
echo "[6/8] Starting application..."
docker-compose up -d

# Wait for the application to start
echo "[7/8] Waiting for application to start..."
sleep 5

# Check if the application is running
echo "[8/8] Verifying deployment..."
if docker-compose ps | grep -q "Up"; then
    echo "✓ Deployment completed successfully!"
    echo ""
    echo "Application is running at: http://localhost:3000"
    echo "Logs: docker-compose logs -f"
else
    echo "✗ Deployment failed! Check logs with: docker-compose logs"
    exit 1
fi
