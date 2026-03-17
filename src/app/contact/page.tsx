'use client';
import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, Loader2, CheckCircle, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const contactInfo = [
  { icon: MapPin, label: 'Office', value: 'Gulshan-1, Dhaka-1212, Bangladesh' },
  { icon: Mail, label: 'Email', value: 'info@landiq.com', href: 'mailto:info@landiq.com' },
  { icon: Phone, label: 'Phone', value: '+880 1700-000000', href: 'tel:+8801700000000' },
  { icon: Clock, label: 'Hours', value: 'Sat–Thu: 9am – 6pm' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // simulate send
    setSent(true);
    setLoading(false);
    toast.success('Message sent! We\'ll reply within 24 hours.');
  };

  return (
    <MainLayout>
      <div className="py-16">
        <div className="page-container max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-400 font-medium text-sm uppercase tracking-wider mb-3">Get in Touch</p>
            <h1 className="font-display font-bold text-5xl text-white mb-4">Contact Us</h1>
            <p className="text-gray-400 text-xl max-w-xl mx-auto">Have questions about LandIQ? Want to partner with us? We're here to help.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-5">
              {contactInfo.map(item => (
                <div key={item.label} className="flex items-start gap-4 p-4 card">
                  <div className="w-10 h-10 rounded-xl bg-brand-950 border border-brand-900 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-white hover:text-brand-400 transition-colors">{item.value}</a>
                    ) : (
                      <p className="font-medium text-white">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="card p-5 bg-brand-950 border-brand-900">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white mb-1">Enterprise & Partnerships</p>
                    <p className="text-sm text-brand-300">Looking for API access, white-label solutions, or bulk land analysis? Reach out to our enterprise team.</p>
                    <a href="mailto:enterprise@landiq.com" className="text-sm text-brand-400 hover:text-brand-300 mt-2 inline-block">enterprise@landiq.com →</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            {sent ? (
              <div className="card p-10 text-center flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-brand-400 mb-4" />
                <h3 className="font-bold text-white text-xl mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thanks, {form.name}. We'll reply to {form.email} within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                <h3 className="font-bold text-white mb-2">Send a Message</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Your Name *</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} className="input" placeholder="Rafiqul Islam" required />
                  </div>
                  <div>
                    <label className="label">Email Address *</label>
                    <input value={form.email} onChange={e => set('email', e.target.value)} type="email" className="input" placeholder="you@email.com" required />
                  </div>
                </div>
                <div>
                  <label className="label">Subject *</label>
                  <input value={form.subject} onChange={e => set('subject', e.target.value)} className="input" placeholder="How can we help?" required />
                </div>
                <div>
                  <label className="label">Message *</label>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)}
                    className="input resize-none" rows={5} placeholder="Tell us more about your question or project..." required />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    : <><Send className="w-4 h-4" /> Send Message</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
