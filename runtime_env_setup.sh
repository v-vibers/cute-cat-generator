#!/bin/bash
# Auto-generated runtime environment variables

# Export Subscribe.dev token if available
if [ -n "${SUBSCRIBE_DEV_PROJECT_TOKEN}" ]; then
  export VITE_SUBSCRIBE_DEV_PROJECT_TOKEN="${SUBSCRIBE_DEV_PROJECT_TOKEN}"
  echo "✅ Exposed SUBSCRIBE_DEV_PROJECT_TOKEN as VITE_SUBSCRIBE_DEV_PROJECT_TOKEN"
else
  echo "⚠️ SUBSCRIBE_DEV_PROJECT_TOKEN not found in environment"
  echo "   Running in demo mode with limited AI usage"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo ""
  echo "📦 Installing dependencies..."
  bun install
  echo "✅ Dependencies installed"
fi
