# Deployment Guide — Ubuntu 22.04

This guide covers deploying the Studio design website on an Ubuntu 22.04 server with a registered domain.

## Prerequisites

- Ubuntu 22.04 server
- Registered domain (e.g., yourstudio.com) pointing to your server IP
- SSH access to the server

---

## Step 1: Install Node.js v20 and pnpm

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js v20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should output v20.x.x
npm --version

# Install pnpm globally
sudo npm install -g pnpm

# Verify pnpm
pnpm --version
```

---

## Step 2: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

---

## Step 3: Deploy the Project

```bash
# Clone or upload the project to your server
# Option A: Clone from Git
git clone https://github.com/your-username/your-repo.git /var/www/studio
cd /var/www/studio

# Option B: Upload via SCP (from local machine)
# scp -r ./waimao user@your-server:/var/www/studio

# Install dependencies
pnpm install

# Create production .env file
cat > .env.local << 'EOF'
# Shopify Configuration
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN=your-storefront-api-token

# Crisp Chat Configuration
NEXT_PUBLIC_CRISP_WEBSITE_ID=your-crisp-website-id

# Site URL
NEXT_PUBLIC_SITE_URL=https://yourstudio.com
EOF

# Build the project
pnpm build
```

---

## Step 4: Start with PM2

```bash
# Start the Next.js app with PM2
pm2 start npm --name "studio" -- start

# Save PM2 process list (auto-restart on reboot)
pm2 save
pm2 startup

# Monitor the app
pm2 status
pm2 logs studio
```

---

## Step 5: Configure Nginx as Reverse Proxy

Install Nginx:

```bash
sudo apt install -y nginx
```

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/studio
```

Paste the following configuration:

```nginx
server {
    listen 80;
    server_name yourstudio.com www.yourstudio.com;

    # Redirect HTTP to HTTPS (after SSL setup)
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourstudio.com www.yourstudio.com;

    # SSL certificates (install via Certbot)
    ssl_certificate /etc/letsencrypt/live/yourstudio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourstudio.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Increase timeout for large file uploads
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /static {
        proxy_pass http://127.0.0.1:3000;
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/studio /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

---

## Step 6: Install SSL Certificate (Certbot)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourstudio.com -d www.yourstudio.com

# Auto-renewal is configured by default
# Test renewal
sudo certbot renew --dry-run
```

---

## Step 7: Firewall Configuration

```bash
# Allow Nginx and SSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

---

## Useful PM2 Commands

```bash
# View logs
pm2 logs studio

# Restart app
pm2 restart studio

# Stop app
pm2 stop studio

# Monitor resources
pm2 monit

# List all processes
pm2 list
```

---

## Troubleshooting

### Port 3000 already in use
```bash
# Kill existing process
sudo lsof -i :3000
kill -9 <PID>
# Or use PM2
pm2 delete studio
pm2 start npm --name "studio" -- start
```

### Permission issues
```bash
# Ensure correct ownership
sudo chown -R $USER:$USER /var/www/studio
```

### Nginx 502 Bad Gateway
```bash
# Check if Next.js is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

---

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Your Shopify store domain | Yes |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN` | Shopify Storefront API token | Yes |
| `NEXT_PUBLIC_CRISP_WEBSITE_ID` | Crisp Chat website ID | No |
| `NEXT_PUBLIC_SITE_URL` | Production site URL | Yes |
