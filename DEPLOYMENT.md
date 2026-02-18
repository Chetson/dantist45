# Deployment Guide

This project is optimized for deployment using Docker.

## Quick Start

1. **Build and start**:
   ```bash
   docker compose up -d --build
   ```

2. **Initialize Admin**:
   ```bash
   docker compose exec app tsx scripts/create-admin.ts
   ```
   *Note: This will create an admin user with Login: `admin` / Password: `admin123`*

## Useful Commands

- **Logs**: `docker compose logs -f`
- **Restart**: `docker compose restart`
- **Down**: `docker compose down`

## Troubleshooting

### "unable to open database file" or "SQLITE_CANTOPEN"
If you see this error, it's usually a permission issue with the `data` folder on the host. Fix it with:
```bash
docker compose exec --user root app chown -R node:node /app/data
```
