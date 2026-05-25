# 🚀 Vyess Deployment Guide

This guide provides step-by-step instructions for deploying the **Vyess** project to a Virtual Private Server (VPS) running Ubuntu.

We have included two options for deployment:
1. **Option A: Docker Compose (Recommended)** - Fastest setup, handles PostgreSQL database, migrations, and reverse-proxy routing out of the box.
2. **Option B: Manual Setup (PM2 + Nginx + PostgreSQL)** - Traditional setup running natively on Ubuntu.

---

## 📋 Environment Variables Checklist

Before deploying, make sure you prepare these values.

### Backend `.env`
Create a `.env` file in the `backend/` directory:
```env
PORT=3000
DATABASE_URL="postgresql://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>?schema=public"
```
*(If using Docker Compose, the database connection URL is handled automatically, but you can configure credentials in the root `.env` file.)*

### Frontend Env
For the frontend, we use relative paths (empty base URL) by default when deploying containerized. If you deploy manually, create a `.env` in `frontend/` directory:
```env
VITE_API_BASE_URL="http://<your-vps-ip-or-domain>:3000"
```

---

## 🐳 Option A: Docker Compose Deployment (Recommended)

Docker Compose is the easiest and most reliable way to run this application. It containerizes PostgreSQL, the Node.js backend, and the React frontend, handling networking and static file serving via Nginx automatically.

### 1. Install Docker & Docker Compose on VPS
Run the following commands on your VPS terminal:
```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin -y
```

### 2. Prepare files on your VPS
Clone your repository to the VPS:
```bash
git clone <your-repo-url> /var/www/vyess
cd /var/www/vyess
```

Create a root `.env` file to customize database credentials:
```bash
nano .env
```
Add the following content:
```env
DB_USER=vyess_admin
DB_PASSWORD=choose_a_strong_password
DB_NAME=vyess_db
```

### 3. Build and Start the Containers
Run Docker Compose in detached mode:
```bash
sudo docker compose up --build -d
```
This command will:
1. Start the PostgreSQL database container.
2. Build the backend image, wait for database readiness, execute Prisma migrations (`npx prisma migrate deploy`), and start the Express server.
3. Build the frontend Vite app, package it into Nginx, and serve it on port `80`.

### 4. Seed the Database (Optional)
If you want to populate your database with initial demo data (like the master admin login, category, and services):
```bash
sudo docker compose exec backend npx prisma db seed
```
*Note: The master admin login seeded is `vyess_admin` with password `pass123`.*

---

## 🛠️ Option B: Manual Setup on Ubuntu VPS

If you prefer to run the services directly on your Ubuntu server, follow these steps.

### 1. Install Node.js & Git
Install Node.js v20 (LTS):
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git build-essential
```

### 2. Install and Configure PostgreSQL
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user and open psql shell
sudo -i -u postgres psql
```
In the `psql` shell, create the database and user:
```sql
CREATE DATABASE vyess_db;
CREATE USER vyess_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE vyess_db TO vyess_user;
-- Exit psql
\q
exit
```

### 3. Deploy the Backend
1. Navigate to the backend directory and install dependencies:
   ```bash
   cd /var/www/vyess/backend
   npm install
   ```
2. Create your `.env` file:
   ```bash
   nano .env
   ```
   Add the following contents:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://vyess_user:your_secure_password@localhost:5432/vyess_db?schema=public"
   ```
3. Run migrations and seed database:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```
4. Install **PM2** to run the backend in the background:
   ```bash
   sudo npm install -g pm2
   pm2 start src/server.js --name "vyess-backend"
   # Save process list and configure PM2 startup on system boot
   pm2 save
   pm2 startup
   ```

### 4. Build the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd /var/www/vyess/frontend
   ```
2. Create `.env` file to set your API endpoint:
   ```bash
   nano .env
   ```
   Add:
   ```env
   VITE_API_BASE_URL="http://your-domain-or-vps-ip"
   ```
3. Install dependencies and build static files:
   ```bash
   npm install
   npm run build
   ```
   This will generate the built static files inside `/var/www/vyess/frontend/dist/`.

### 5. Install and Configure Nginx
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```
Create a new Nginx block configuration:
```bash
sudo nano /etc/nginx/sites-available/vyess
```
Paste the following configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    client_max_body_size 20M;

    # Serve static frontend files
    location / {
        root /var/www/vyess/frontend/dist;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Proxy backend API requests
    location ~ ^/(payments|orders|vendor-registration|admin-login|uploads|api/upload|users|customers|vendors|employees) {
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
Link it and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/vyess /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default # Remove default config
sudo nginx -t # Verify configuration syntax is correct
sudo systemctl restart nginx
```

---

## 🔒 Step 7: Setting up SSL (HTTPS) with Certbot

To secure your connection with Let's Encrypt SSL, run the following:

### For Manual / Non-Docker Setup
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
Certbot will automatically verify your domain, generate the SSL certificate, and modify your Nginx config to force HTTPS redirection.

### For Docker Setup
If you deploy using Docker Compose, the frontend container listens on port `80`. The easiest way to configure SSL on the host is:
1. Run Nginx on the host machine.
2. Edit `/etc/nginx/sites-available/vyess` to proxy all traffic to the docker-compose frontend service (`http://localhost:80` or container port mapped to host, e.g., `8080:80`).
3. Set your docker-compose frontend port mapping to `8080:80` (instead of `80:80` to free up port `80` on the host).
4. Run `certbot` on the host.

Example host Nginx config for Docker proxying:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:8080; # Map to your frontend docker container port
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔎 Troubleshooting Tips

1. **Verify logs of running services**:
   - Docker: `sudo docker compose logs -f` or `sudo docker logs vyess_backend`
   - Manual: `pm2 logs vyess-backend` and Nginx logs (`sudo tail -f /var/log/nginx/error.log`)
2. **Prisma Client Issues**:
   - If Prisma client throws an import error, run `npx prisma generate` in the `backend/` directory to rebuild it locally.
3. **Database connection failure**:
   - Ensure the PostgreSQL database service is running and checking authentication configurations in `/etc/postgresql/16/main/pg_hba.conf` if custom configuration was used.
