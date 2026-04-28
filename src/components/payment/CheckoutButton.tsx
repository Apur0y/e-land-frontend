'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { payment } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

interface CheckoutButtonProps {
  planId: 'pro' | 'enterprise' ;
  email?: string;
  userId?: string;
  className?: string;
  children?: React.ReactNode;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  planId,
  email,
  userId,
  className = 'btn-primary',
  children = 'Start Subscription',
}) => {
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated, fetchMe } = useAuthStore();
  console.log(user?.email);

  const info={
    planId,
    email:user?.email,
    userId:user?._id
  }

  

  const handleCheckout = async () => {
    try {
      setLoading(true);
       const res = await payment.sessionId(info);

    // depending on axios config:
    const url = res?.data?.url;

    if (!url) {
      throw new Error("No checkout URL returned");
    }

    // ✅ redirect (new Stripe way)
    window.location.assign(url);
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
