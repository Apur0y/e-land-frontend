'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

interface PaymentStatusProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({
  onSuccess,
  onError,
}) => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
        );

        if (!stripe) {
          throw new Error('Stripe failed to load');
        }

        const session = await stripe.retrievePaymentIntent(sessionId);

        if (session.paymentIntent?.status === 'succeeded') {
          setStatus('success');
          setMessage('Payment successful! Your plan is now active.');
          onSuccess?.();
          toast.success('Payment successful!');
        } else {
          setStatus('error');
          setMessage('Payment failed. Please try again.');
          onError?.('Payment failed');
          toast.error('Payment failed');
        }
      } catch (error: unknown) {
        setStatus('error');
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setMessage(errorMessage);
        onError?.(errorMessage);
        toast.error(errorMessage);
      }
    };

    checkPaymentStatus();
  }, [searchParams, onSuccess, onError]);

  if (status === 'checking') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Checking payment status...</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
        <div className="text-green-500 font-semibold mb-2">✓ {message}</div>
        <p className="text-sm text-gray-400">
          You can now access all premium features.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
      <div className="text-red-500 font-semibold mb-2">✗ {message}</div>
      <p className="text-sm text-gray-400">
        Please contact support or try again.
      </p>
    </div>
  );
};
