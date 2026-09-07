#!/bin/bash

# JDRAID Setup Script
# This script automates the initial setup of the JDRAID project

echo "==================================="
echo "JDRAID - Initial Setup Script"
echo "==================================="
echo ""

# Step 1: Install dependencies
echo "Step 1: Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "✗ Failed to install dependencies"
    exit 1
fi

echo ""

# Step 2: Create .env file
echo "Step 2: Setting up environment configuration..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ .env file created from .env.example"
    echo "  Please update .env with your configuration"
else
    echo "✓ .env file already exists"
fi

echo ""

# Step 3: Check MongoDB
echo "Step 3: Checking MongoDB connection..."
if command -v mongod &> /dev/null; then
    echo "✓ MongoDB is installed"
    echo "  Start MongoDB with: mongod"
else
    echo "⚠ MongoDB not found locally"
    echo "  You can use Docker instead: docker-compose up mongodb"
fi

echo ""

# Step 4: Database seeding (optional)
echo "Step 4: Database seeding (optional)"
echo "  To seed hero data, run: node seeds/seedHeroes.js"

echo ""
echo "==================================="
echo "Setup Complete!"
echo "==================================="
echo ""
echo "To start the server:"
echo "  npm start          (production)"
echo "  npm run dev        (development with auto-reload)"
echo ""
echo "To use Docker:"
echo "  docker-compose up"
echo ""
