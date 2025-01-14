#!/bin/bash

# Exit immediately on error and trap errors
set -e
trap 'echo "🚨 Error occurred during deployment. Aborting!"; exit 1;' ERR

# Log the start time of the deployment
echo "==========================================="
echo "🚀 Starting deployment at $(date)"
echo "==========================================="

# Step 1: Pull latest changes
echo "📥 Pulling the latest changes from Git..."
git stash
git pull || { echo "❌ Failed to pull the latest changes."; exit 1; }

# Step 2: Clean up old builds and caches
echo "🧹 Cleaning up old builds and caches..."
rm -rf .next || echo "⚠️  .next directory not found, skipping."
rm -rf node_modules/.cache || echo "⚠️  Cache directory not found, skipping."

# Step 3: Install dependencies
echo "📦 Installing dependencies..."
yarn install || { echo "❌ Failed to install dependencies."; exit 1; }

# Step 4: Generate Prisma client
echo "🛠️  Generating Prisma client..."
yarn prisma generate || { echo "❌ Failed to generate Prisma client."; exit 1; }

# Step 5: Push database changes
echo "📊 Updating database schema..."
yarn prisma db push || { echo "❌ Failed to update database schema."; exit 1; }

# Step 6: Build the application
echo "🏗️  Building the application..."
yarn build || { echo "❌ Build failed."; exit 1; }

# Step 7: Restart the application
echo "🔄 Restarting PM2 process..."
pm2 reload billboard-charts || { echo "❌ Failed to restart PM2 process."; exit 1; }

# Log the completion time of the deployment
echo "==========================================="
echo "✅ Deployment completed successfully at $(date)"
echo "==========================================="