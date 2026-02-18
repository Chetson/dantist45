# Deployment Guide

This project is optimized for deployment using Docker.

## Quick Start

1. **Build and start**:
   ```bash
   docker compose up -d --build
   ```

2. **Initialize Admin**:
   ```bash
   docker compose exec app npx tsx scripts/create-admin.ts
   ```
   *Note: This will create an admin user with Login: `admin` / Password: `admin123`*

## Useful Commands

- **Logs**: `docker compose logs -f`
- **Restart**: `docker compose restart`
- **Down**: `docker compose down`

## Backup

All data is stored in `./data/database.db`. Simply copy this file for backups.
