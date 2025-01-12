#!/bin/bash

echo "Starting deployment..."

# Pull latest changes
git pull

# Clean up
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
yarn install

# Generate Prisma client
echo "Generating Prisma client..."
yarn prisma generate

# Push database changes
echo "Updating database schema..."
yarn prisma db push

# Build the application
echo "Building application..."
yarn build

# Restart the application
echo "Restarting PM2 process..."
pm2 reload billboard-charts

echo "Deployment completed!" 