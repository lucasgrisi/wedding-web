#!/bin/bash

# Exit on error
set -e

# Ask for the domain name
read -p "Enter your domain name (e.g., api.example.com): " SERVER_NAME

# Create the Nginx config
echo "Creating /etc/nginx/conf.d/api.conf for domain $SERVER_NAME..."

sudo tee /etc/nginx/conf.d/api.conf > /dev/null <<EOF
server {
    listen 80;
    server_name $SERVER_NAME;

    location / {
        proxy_pass         http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
    }
}
EOF

echo "Testing Nginx configuration..."
sudo nginx -t

echo "Reloading Nginx..."
sudo systemctl reload nginx

# Install Certbot and the Nginx plugin
echo "Installing Certbot and Nginx plugin..."
sudo yum install -y certbot python3-certbot-nginx

# Obtain and install the certificate
echo "Running Certbot for $SERVER_NAME..."
sudo certbot --nginx -d $SERVER_NAME

echo "Setting up automatic certificate renewal..."
sudo systemctl enable certbot-renew.timer
sudo systemctl start certbot-renew.timer

echo "✅ SSL setup complete. Your site https://$SERVER_NAME should now be secured."
