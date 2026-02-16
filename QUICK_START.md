# Quick Start Guide

Get the Segullah eCommerce platform running in 5 minutes.

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

```bash
# 1. Install frontend dependencies
npm install

# 2. Install backend dependencies
cd server
npm install
cd ..
```

## Configuration

### Frontend (.env in root)

```bash
# Create .env file
echo "VITE_API_URL=http://localhost:3001" > .env
```

### Backend (server/.env)

The `server/.env` file is already configured with sandbox test credentials. No changes needed for testing.

## Run

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Access

Open browser: `http://localhost:5173`

## Test Payment

1. Click "Store" → Add items to cart
2. Click cart icon → "Proceed to Checkout"
3. Fill in test information:
   - Name: John Doe
   - Email: john@example.com
   - Phone: +27123456789
4. Click "Pay Now"
5. Complete payment on PayFast sandbox

## That's It!

For detailed setup and deployment instructions, see:
- `SETUP_GUIDE.md` - Complete setup guide
- `PAYFAST_INTEGRATION.md` - PayFast integration details
- `server/README.md` - Backend API documentation

## Common Commands

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd server
npm start           # Start server
npm run dev         # Start with auto-reload
```

## Need Help?

- Email: info@segullah.co.za
- Phone: 066 222 2656
