# Setup Guide - Segullah Projects & Designs eCommerce Platform

Complete step-by-step guide to set up and run the Segullah eCommerce platform with PayFast payment integration.

## Project Structure

```
segullah-website/
├── src/                    # Frontend React application
├── server/                 # Backend Express API
├── public/                 # Static assets
├── package.json           # Frontend dependencies
└── PAYFAST_INTEGRATION.md # PayFast integration guide
```

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **PayFast account** (sandbox or production)
- **Text editor** (VS Code, Sublime, etc.)

## Installation

### Step 1: Clone/Download the Project

If you haven't already, download or clone the project to your local machine.

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This installs all dependencies for the React frontend:
- React & React Router
- Vite (build tool)
- Tailwind CSS
- Lucide React (icons)
- TypeScript

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
```

This installs all dependencies for the Express backend:
- Express (web framework)
- CORS (cross-origin support)
- dotenv (environment variables)
- axios (HTTP client)
- body-parser (request parsing)

## Configuration

### Frontend Configuration

1. Create `.env` file in the project root:

```bash
cp .env.example .env
```

2. Edit `.env`:

```env
VITE_API_URL=http://localhost:3001
```

**Important Notes:**
- For development: `http://localhost:3001`
- For production: Update to your deployed backend URL (e.g., `https://api.segullah.co.za`)

### Backend Configuration

1. Navigate to the server folder:

```bash
cd server
```

2. Edit `.env` file with your PayFast credentials:

```env
# PayFast Configuration
PAYFAST_MERCHANT_ID=10000100
PAYFAST_MERCHANT_KEY=46f0cd694581a
PAYFAST_PASSPHRASE=
PAYFAST_NOTIFY_URL=http://localhost:3001/api/payfast/notify
PAYFAST_RETURN_URL=http://localhost:5173/payment-success
PAYFAST_CANCEL_URL=http://localhost:5173/payment-cancelled

# Server Configuration
PORT=3001

# Environment
PAYFAST_SANDBOX=true
```

**For Testing (Sandbox):**
- Use the provided sandbox credentials above
- Set `PAYFAST_SANDBOX=true`
- No passphrase needed

**For Production:**
- Get credentials from [PayFast Dashboard](https://www.payfast.co.za)
- Set your own passphrase (16+ characters)
- Set `PAYFAST_SANDBOX=false`
- Update URLs to your production domain

## Running the Application

You need to run both frontend and backend simultaneously.

### Option 1: Using Two Terminal Windows

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

You should see:
```
🚀 PayFast Payment Server running on port 3001
📍 Environment: SANDBOX
🔗 Server URL: http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

You should see:
```
VITE v5.4.8  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Option 2: Using VS Code

1. Open two integrated terminals in VS Code
2. Run backend in first terminal
3. Run frontend in second terminal

### Option 3: Using tmux/screen (Linux/Mac)

```bash
# Split terminal
tmux

# In first pane
cd server && npm start

# Split and switch to second pane (Ctrl+B then %)
npm run dev
```

## Accessing the Application

Once both servers are running:

1. Open your browser
2. Navigate to `http://localhost:5173`
3. You should see the Segullah website homepage

## Testing the Payment Flow

### Step 1: Browse the Store

1. Click "Store" in the navigation menu
2. Browse available products
3. Click "Add to Cart" on any product

### Step 2: View Cart

1. Click the shopping cart icon in the navigation
2. Review your items
3. Adjust quantities if needed
4. Click "Proceed to Checkout"

### Step 3: Checkout

1. Fill in your billing information:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+27123456789`
2. Click "Pay Now"

### Step 4: PayFast Payment

1. You'll be redirected to PayFast sandbox
2. Use test card details (see PayFast documentation)
3. Complete the payment

### Step 5: Return to Store

After payment:
- **Success:** Redirected to `/payment-success`
- **Cancelled:** Redirected to `/payment-cancelled`

## Verifying Backend Integration

### Check Backend Health

Open a browser or use curl:

```bash
curl http://localhost:3001/health
```

Response should be:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "sandbox"
}
```

### Test Payment Creation

```bash
curl -X POST http://localhost:3001/api/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 250.00,
    "itemName": "Test Product",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+27123456789"
  }'
```

You should receive a JSON response with signed PayFast data.

## Building for Production

### Frontend Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder:
- Minified JavaScript
- Optimized CSS
- Compressed assets

### Backend Preparation

The backend doesn't need a build step, but ensure:

1. `.env` is configured for production
2. `PAYFAST_SANDBOX=false`
3. Production PayFast credentials are set
4. URLs point to your production domain

## Deployment

### Frontend Deployment Options

**GitHub Pages:**
```bash
npm run deploy
```

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

### Backend Deployment Options

**DigitalOcean:**
- Create a new App
- Connect your repository
- Select the `server` folder
- Add environment variables
- Deploy

**Heroku:**
```bash
cd server
heroku create segullah-payment-api
git push heroku main
```

**AWS Elastic Beanstalk:**
- Create new application
- Upload `server` folder as ZIP
- Configure environment variables
- Deploy

### Post-Deployment

1. Update frontend `.env`:
   ```env
   VITE_API_URL=https://your-backend-url.com
   ```

2. Rebuild frontend:
   ```bash
   npm run build
   ```

3. Update PayFast dashboard with production URLs

4. Test complete payment flow in production

## Common Issues

### Port Already in Use

**Error:** `Port 3001 is already in use`

**Solution:**
```bash
# Find and kill the process
lsof -ti:3001 | xargs kill -9

# Or change the port in server/.env
PORT=3002
```

### Backend Not Connecting

**Error:** Frontend can't reach backend API

**Solutions:**
1. Verify backend is running: `http://localhost:3001/health`
2. Check `VITE_API_URL` in frontend `.env`
3. Ensure CORS is enabled in server.js
4. Check browser console for CORS errors

### Payment Not Processing

**Error:** Clicking "Pay Now" does nothing

**Solutions:**
1. Check browser console for errors
2. Verify backend is running and accessible
3. Check network tab for failed requests
4. Ensure `VITE_API_URL` is correct

### ITN Not Received

**Error:** Backend doesn't receive payment notifications

**Solutions:**
1. For local testing, use ngrok: `ngrok http 3001`
2. Update `PAYFAST_NOTIFY_URL` with ngrok URL
3. Check PayFast dashboard for ITN logs
4. Verify backend is publicly accessible (production)

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Changes auto-refresh in browser
- Backend: Use `npm run dev` (with --watch flag)

### Debugging

**Frontend:**
- Use React DevTools browser extension
- Check browser console for errors
- Use Network tab for API calls

**Backend:**
- Check terminal logs
- Add console.log() statements
- Use Postman to test endpoints

### Code Structure

**Frontend:**
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/services/` - API services
- `src/hooks/` - Custom React hooks
- `src/context/` - React context providers

**Backend:**
- `server.js` - Main server file
- `.env` - Configuration
- `package.json` - Dependencies

## Security Checklist

Before going to production:

- [ ] Remove Supabase completely ✓
- [ ] Never commit `.env` files
- [ ] Use HTTPS for all connections
- [ ] Validate all user inputs
- [ ] Set strong passphrase (16+ chars)
- [ ] Enable rate limiting
- [ ] Implement request logging
- [ ] Set up error monitoring
- [ ] Use production PayFast credentials
- [ ] Test complete payment flow
- [ ] Verify ITN handling

## Getting Help

### Documentation

- **PayFast Integration:** See `PAYFAST_INTEGRATION.md`
- **Server Setup:** See `server/README.md`

### Support

**PayFast:**
- Website: https://www.payfast.co.za/support
- Email: support@payfast.co.za

**Segullah:**
- Email: info@segullah.co.za
- Phone: 066 222 2656 (Pretoria)
- Phone: 060 456 3045 (Johannesburg)

## Next Steps

1. ✓ Setup complete
2. Test locally
3. Configure production credentials
4. Deploy backend
5. Deploy frontend
6. Update PayFast dashboard
7. Test production payment flow
8. Monitor and optimize

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express Documentation](https://expressjs.com)
- [PayFast Developer Docs](https://developers.payfast.co.za)
- [Tailwind CSS Documentation](https://tailwindcss.com)

---

© 2024 Segullah Projects & Designs. All rights reserved.
