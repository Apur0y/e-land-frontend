"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SuccessPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get("session_id");

        if (!sessionId) {
          setStatus("error");
          return;
        }

        // Call backend to verify session (IMPORTANT)
        const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data = await res.json();

        if (data?.paid) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    verifyPayment();
  }, []);

  if (status === "loading") {
    return <p className="text-center mt-20">Verifying payment...</p>;
  }

  if (status === "error") {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold text-red-600">Payment verification failed</h1>
        <Link href="/" className="text-blue-500 underline mt-4 block">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-4">Thank you for your purchase.</p>

      <Link href="/" className="text-blue-500 underline mt-6 block">
        Go to Home
      </Link>
    </div>
  );
}