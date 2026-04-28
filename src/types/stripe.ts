import type { Stripe } from 'stripe';

export interface CheckoutSession extends Stripe.Checkout.Session {
  metadata?: {
    userId?: string;
    planId?: string;
  };
}

export interface PaymentMetadata {
  userId?: string;
  planId: string;
  [key: string]: string | undefined;
}

export type PlanType = 'free' | 'pro' | 'enterprise';

export interface PlanConfig {
  name: string;
  priceId: string;
  amount: number;
  description: string;
}

export interface SubscriptionStatus {
  isActive: boolean;
  planId: PlanType;
  currentPeriodEnd: Date | null;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}
