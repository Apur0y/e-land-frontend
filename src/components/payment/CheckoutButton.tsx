'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CheckoutButtonProps {
  planId: 'pro' | 'enterprise' ;
  email?: string;
  userId?: string;
  className?: string;
  children?: React.ReactNode;
}

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);


export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  planId,
  email,
  userId,
  className = 'btn-primary',
  children = 'Start Subscription',
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      setLoading(true);     
        const res = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
      method: "POST",
    });

    const data = await res.json();

    
    window.location.href = data.url;

      
    } catch (error: unknown) {
      console.error('Checkout error:', error);
      const message = error instanceof Error ? error.message : 'Checkout failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
};
