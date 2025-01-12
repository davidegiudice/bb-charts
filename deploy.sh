#!/bin/bash

# Build the application
npm run build

# Generate Prisma client
npx prisma generate

# Apply database migrations
npx prisma db push

# Start the production server
npm start 