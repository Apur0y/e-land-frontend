# Stripe Payment Setup Guide

## Overview
This project is configured with Stripe for handling subscription payments. The setup includes:
- Checkout sessions for subscription management
- Payment intents for flexible payment handling
- Webhook support for real-time payment events

## Environment Variables Setup

Add these to your `.env.local` file:

```env
# Stripe Public Key (visible in browser - safe to expose)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Stripe Secret Key (keep private - never expose)
STRIPE_SECRET_KEY=sk_test_xxxxx

# Webhook Secret (for verifying webhook signatures)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Your application URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Getting Your Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers > API Keys**
3. Copy the Publishable Key and Secret Key
4. For webhooks, go to **Developers > Webhooks** and create an endpoint

## Creating Price IDs

In your `.env.local`, you also need to add:

```env
# Price IDs from Stripe (created in Products section)
STRIPE_PRICE_ID_PRO=price_xxxxx
STRIPE_PRICE_ID_ENTERPRISE=price_xxxxx
```

To create prices:
1. Go to **Products > All Products**
2. Click **+ Add Product**
3. Set up product details
4. Add pricing information
5. Copy the Price ID

## API Routes

### POST `/api/checkout`
Creates a Stripe Checkout Session

**Request:**
```json
{
  "planId": "pro",
  "email": "user@example.com",
  "userId": "user_123",
  "successUrl": "https://yourapp.com/dashboard?session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "https://yourapp.com/pricing"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_xxxxx"
}
```

### POST `/api/payment-intent`
Creates a payment intent for flexible payments

**Request:**
```json
{
  "amount": 99900,
  "email": "user@example.com",
  "planId": "pro",
  "userId": "user_123"
}
```

**Response:**
```json
{
  "clientSecret": "pi_test_xxxxx_secret_xxxxx",
  "paymentIntentId": "pi_test_xxxxx"
}
```

### POST `/api/webhooks/stripe`
Webhook endpoint for Stripe events

## Webhook Events Handled

- `checkout.session.completed` - Subscription purchase complete
- `invoice.payment_succeeded` - Recurring payment successful
- `invoice.payment_failed` - Payment failure (send notification)
- `customer.subscription.deleted` - Subscription cancelled

## Components

### CheckoutButton
Payment button component for initiating checkout

```typescript
import { CheckoutButton } from '@/components/payment/CheckoutButton';

<CheckoutButton
  planId="pro"
  email="user@example.com"
  className="btn-primary"
>
  Subscribe Now
</CheckoutButton>
```

### PaymentStatus
Component to display payment status after checkout

```typescript
import { PaymentStatus } from '@/components/payment/PaymentStatus';

<PaymentStatus
  onSuccess={() => console.log('Payment successful')}
  onError={(error) => console.error(error)}
/>
```

## Integration Steps

### 1. Update Environment Variables
```bash
cp .env.local.example .env.local
# Edit .env.local with your Stripe keys
```

### 2. Create Stripe Price IDs
Follow the "Creating Price IDs" section above

### 3. Set Up Webhooks
1. In Stripe Dashboard, go to **Developers > Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL: `https://yourapp.com/api/webhooks/stripe`
4. Select events to listen to
5. Copy the webhook secret to `.env.local`

### 4. Update Database (Optional)
In `/src/app/api/webhooks/stripe/route.ts`, uncomment and implement the database calls:

```typescript
// await updateUserSubscription({
//   userId,
//   planId,
//   stripeSessionId: session.id,
//   status: 'active'
// });
```

### 5. Update Pricing Section
The `PricingSection.tsx` is already configured to use `CheckoutButton` for paid plans.

## Testing Payments

### Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Require authentication: `4000 0025 0000 3155`

### Testing Workflow
1. Run dev server: `npm run dev`
2. Go to pricing page
3. Click "Start Pro Plan" or "Start Enterprise"
4. You'll be redirected to Stripe Checkout
5. Use test card `4242 4242 4242 4242`
6. Fill in any expiry date in the future and any CVC

## Going Live

### Before Production:
1. Switch from test keys to live keys in `.env`
2. Update webhook URLs to production domain
3. Implement proper email notifications
4. Add subscription status checks in your app
5. Test with real payment methods
6. Implement proper error handling and logging

### Switch to Live Keys:
In Stripe Dashboard:
1. Toggle "View test data" to OFF
2. Copy live Publishable Key and Secret Key
3. Update `.env.local` with live keys

## Troubleshooting

### "Stripe failed to load"
- Check that `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Verify the key starts with `pk_`

### "Invalid signature"
- Ensure `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Verify webhook endpoint URL is correct

### "Invalid plan selected"
- Verify `STRIPE_PRICE_ID_PRO` and `STRIPE_PRICE_ID_ENTERPRISE` are set
- Check that price IDs match your products in Stripe

### Session Not Found
- Ensure `sessionId` is passed correctly from checkout
- Check browser console for errors

## Security Considerations

1. **Never expose secret keys** - Only use in server-side code
2. **Validate webhook signatures** - Already implemented
3. **Handle errors gracefully** - Don't expose sensitive error details
4. **Use HTTPS in production** - Required for Stripe
5. **Store subscription status** - Use your database to track active subscriptions

## Next Steps

1. Get your Stripe API keys
2. Create products and prices in Stripe Dashboard
3. Add the keys to `.env.local`
4. Test the checkout flow with test cards
5. Set up proper webhook handling in your database
6. Deploy with live keys when ready
