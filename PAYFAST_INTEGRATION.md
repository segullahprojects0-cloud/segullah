# PayFast Payment Integration Guide

Complete guide for setting up PayFast payment gateway in the Segullah Projects & Designs eCommerce platform.

## Architecture Overview

The payment system consists of two parts:

1. **Frontend (React + Vite)** - Handles UI and initiates payments
2. **Backend (Node.js + Express)** - Securely generates signatures and handles PayFast notifications

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────>│   Backend   │─────>│   PayFast   │
│  (React)    │<─────│  (Express)  │<─────│   Server    │
└─────────────┘      └─────────────┘      └─────────────┘
```

## Quick Start

### 1. Setup Backend Server

```bash
cd server
npm install
```

Edit `server/.env` with your PayFast credentials:

```env
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
PAYFAST_PASSPHRASE=your_passphrase
PAYFAST_NOTIFY_URL=https://your-domain.com/api/payfast/notify
PAYFAST_RETURN_URL=https://your-domain.com/payment-success
PAYFAST_CANCEL_URL=https://your-domain.com/payment-cancelled
PORT=3001
PAYFAST_SANDBOX=true
```

Start the backend server:

```bash
npm start
```

### 2. Setup Frontend

Create `.env` in the project root:

```env
VITE_API_URL=http://localhost:3001
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

## Getting PayFast Credentials

### For Testing (Sandbox)

1. Visit [PayFast Sandbox](https://sandbox.payfast.co.za)
2. Sign up for a sandbox account
3. Use these test credentials:
   - Merchant ID: `10000100`
   - Merchant Key: `46f0cd694581a`
   - No passphrase needed for sandbox

### For Production

1. Sign up at [PayFast](https://www.payfast.co.za)
2. Complete business verification
3. Get credentials from your dashboard:
   - Navigate to Settings → Integration
   - Copy Merchant ID and Merchant Key
   - Set a strong Passphrase (minimum 16 characters)

## Payment Flow

### Step 1: User Adds Items to Cart

User browses the store and adds products to cart.

### Step 2: Checkout

User proceeds to checkout and fills in billing information:
- Full Name
- Email Address
- Phone Number

### Step 3: Payment Creation

Frontend calls backend API to create a signed payment:

```javascript
POST http://localhost:3001/api/create-payment
{
  "amount": 250.00,
  "itemName": "Classic T-Shirt x1",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+27123456789"
}
```

Backend generates MD5 signature using the passphrase and returns signed data.

### Step 4: Redirect to PayFast

Frontend automatically creates a form with the signed data and submits it to PayFast:

```
https://sandbox.payfast.co.za/eng/process (for testing)
https://www.payfast.co.za/eng/process (for production)
```

### Step 5: Payment Processing

User completes payment on PayFast using:
- Credit/Debit Card
- Instant EFT
- SnapScan
- Other supported methods

### Step 6: Payment Notification (ITN)

PayFast sends an Instant Transaction Notification to your backend:

```
POST https://your-domain.com/api/payfast/notify
```

Backend validates the notification:
1. Verifies request is from PayFast
2. Validates signature
3. Confirms with PayFast servers
4. Processes payment status

### Step 7: Return to Merchant

User is redirected back to your site:
- Success: `/payment-success`
- Cancelled: `/payment-cancelled`

## Backend API Endpoints

### POST /api/create-payment

Creates a signed PayFast payment request.

**Request:**
```json
{
  "amount": 250.00,
  "itemName": "Classic T-Shirt x1",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+27123456789"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "merchant_id": "10000100",
    "merchant_key": "46f0cd694581a",
    "amount": "250.00",
    "item_name": "Classic T-Shirt x1",
    "signature": "abc123...",
    "return_url": "https://your-domain.com/payment-success",
    "cancel_url": "https://your-domain.com/payment-cancelled",
    "notify_url": "https://your-domain.com/api/payfast/notify",
    ...
  },
  "payfastUrl": "https://sandbox.payfast.co.za/eng/process"
}
```

### POST /api/payfast/notify

Handles PayFast ITN (Instant Transaction Notification).

This endpoint receives payment status updates from PayFast.

**PayFast sends:**
```
m_payment_id=ORDER_1234567890
pf_payment_id=123456
payment_status=COMPLETE
item_name=Classic T-Shirt x1
amount_gross=250.00
...
signature=xyz789...
```

**Backend validates and responds with:** `200 OK`

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "sandbox"
}
```

## Testing

### Local Testing

1. Start backend: `cd server && npm start`
2. Start frontend: `npm run dev`
3. Open browser: `http://localhost:5173`
4. Add items to cart
5. Proceed to checkout
6. Fill in test information
7. Click "Pay Now"

### Testing with Sandbox

Use PayFast sandbox test cards:
- Visit [PayFast Test Cards](https://developers.payfast.co.za/documentation/#testing-details)

### Testing ITN Locally

For local development, use a tunneling service like ngrok:

```bash
ngrok http 3001
```

Update `PAYFAST_NOTIFY_URL` in `.env` with the ngrok URL:

```env
PAYFAST_NOTIFY_URL=https://abc123.ngrok.io/api/payfast/notify
```

## Deployment

### Backend Deployment

Deploy the `server` folder to any Node.js hosting service:

**Options:**
- DigitalOcean App Platform
- AWS Elastic Beanstalk
- Heroku
- Render
- Railway

**Requirements:**
- Node.js 18+ support
- HTTPS enabled
- Public internet access
- Environment variables configured

### Frontend Deployment

Deploy the React app to any static hosting:

**Options:**
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

**Build command:**
```bash
npm run build
```

**Environment variables:**
Set `VITE_API_URL` to your deployed backend URL.

### Production Checklist

- [ ] Set `PAYFAST_SANDBOX=false` in backend .env
- [ ] Use production PayFast credentials
- [ ] Enable HTTPS for backend
- [ ] Update notify URL in PayFast dashboard
- [ ] Update return and cancel URLs
- [ ] Test complete payment flow
- [ ] Monitor backend logs
- [ ] Set up error notifications

## Security Best Practices

### Backend Security

1. **Never expose secrets in frontend**
   - Passphrase stays on backend only
   - API keys never sent to client

2. **Validate all ITN requests**
   - Check signature
   - Verify PayFast IP addresses
   - Validate with PayFast servers

3. **Use HTTPS in production**
   - Required by PayFast
   - Protects data in transit

4. **Implement rate limiting**
   - Prevent abuse
   - Protect against DDoS

5. **Log all transactions**
   - Monitor for suspicious activity
   - Debug payment issues

### Frontend Security

1. **Validate user input**
   - Sanitize form data
   - Validate email and phone formats

2. **Use HTTPS**
   - Secure data transmission
   - SSL certificate required

3. **Handle errors gracefully**
   - Don't expose system details
   - Show user-friendly messages

## Troubleshooting

### Payment Not Processing

**Issue:** User clicks "Pay Now" but nothing happens

**Solutions:**
- Check backend is running: `http://localhost:3001/health`
- Check browser console for errors
- Verify `VITE_API_URL` is correct
- Check CORS settings on backend

### Signature Mismatch

**Issue:** PayFast returns "Invalid signature"

**Solutions:**
- Verify passphrase matches exactly (no spaces)
- Check all fields are included in signature generation
- Ensure URL encoding is correct
- Verify merchant credentials are correct

### ITN Not Received

**Issue:** Backend doesn't receive payment notifications

**Solutions:**
- Verify notify URL is publicly accessible
- Check PayFast dashboard for ITN logs
- Ensure backend server is running
- Check firewall settings
- For local testing, use ngrok
- Verify HTTPS is enabled (production)

### CORS Errors

**Issue:** Frontend can't call backend API

**Solutions:**
- Verify CORS is enabled on backend
- Check allowed origins in server.js
- Ensure `VITE_API_URL` matches backend URL

### Amount Incorrect

**Issue:** Payment amount doesn't match cart total

**Solutions:**
- Check amount calculation in frontend
- Verify amount is sent as decimal (e.g., 250.00)
- Don't multiply by 100 (backend handles it)

## Support

### PayFast Support

- Website: [https://www.payfast.co.za/support](https://www.payfast.co.za/support)
- Documentation: [https://developers.payfast.co.za](https://developers.payfast.co.za)
- Email: support@payfast.co.za

### Segullah Support

- Email: info@segullah.co.za
- Phone: 066 222 2656 (Pretoria)
- Phone: 060 456 3045 (Johannesburg)

## Additional Resources

- [PayFast Developer Documentation](https://developers.payfast.co.za)
- [PayFast Integration Guide](https://developers.payfast.co.za/documentation/#integration)
- [PayFast API Reference](https://developers.payfast.co.za/documentation/#api-reference)
- [PayFast Sandbox](https://sandbox.payfast.co.za)

## License

© 2024 Segullah Projects & Designs. All rights reserved.
