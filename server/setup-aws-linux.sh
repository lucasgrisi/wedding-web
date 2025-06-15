#!/bin/bash

# Exit on any error
set -e

echo "Updating system packages..."
sudo yum update -y

echo "Enabling nginx1 in amazon-linux-extras..."
sudo amazon-linux-extras enable nginx1

echo "Installing nginx..."
sudo yum install -y nginx

echo "Starting and enabling nginx service..."
sudo systemctl start nginx
sudo systemctl enable nginx

echo "Checking Nginx status..."
curl -I http://localhost

echo "Enabling Docker in amazon-linux-extras..."
sudo amazon-linux-extras enable docker

echo "Installing Docker..."
sudo yum install -y docker

echo "Starting and enabling Docker service..."
sudo systemctl start docker
sudo systemctl enable docker

echo "Adding ec2-user to docker group..."
sudo usermod -aG docker ec2-user

echo "Installing Docker Compose (v2)..."
DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose

echo "Verifying Docker Compose installation..."
docker compose version

echo "Setup complete. You may need to log out and back in for docker group changes to take effect."
