#!/bin/sh
set -e

echo "Waiting for database to be ready..."
sleep 5

echo "Initializing database..."
npm run init-db

echo "Database initialized successfully!"
