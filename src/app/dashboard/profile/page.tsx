'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/lib/api';
import MainLayout from '@/components/layout/MainLayout';
import toast from 'react-hot-toast';
import { Loader2, User, Lock, Save } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, fetchMe, updateUser } = useAuthStore();
  const [tab, setTab] = useState<'profile' | 'password'>('profile');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: '', phone: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirm: '' });

  useEffect(() => {
    if (!isAuthenticated) { router.push('/login'); return; }
    if (user) setProfile({ name: user.name || '', phone: user.phone || '' });
  }, [isAuthenticated, user]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.updateProfile(profile);
      updateUser(res.data.user);
      toast.success('Profile updated!');
    } catch { toast.error('Update failed'); }
    setLoading(false);
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await authAPI.changePassword({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword });
      toast.success('Password changed!');
      setPasswords({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err: any) { toast.error(err.response?.data?.message || 'Failed'); }
    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="py-10 page-container max-w-2xl mx-auto">
        <h1 className="font-display font-bold text-3xl text-white mb-8">Account Settings</h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-card border border-surface-border rounded-xl p-1 mb-6">
          {(['profile', 'password'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all flex items-center justify-center gap-2 ${tab === t ? 'bg-brand-600 text-white' : 'text-gray-400 hover:text-white'}`}>
              {t === 'profile' ? <User className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {t === 'profile' ? 'Profile' : 'Password'}
            </button>
          ))}
        </div>

        {tab === 'profile' && (
          <form onSubmit={saveProfile} className="card p-6 space-y-4">
            {/* Avatar placeholder */}
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-brand-800 flex items-center justify-center text-2xl font-bold text-brand-200">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-white">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <span className={`badge text-xs mt-1 capitalize inline-flex ${user?.plan === 'pro' ? 'badge-green' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>{user?.plan} plan</span>
              </div>
            </div>
            <div>
              <label className="label">Full Name</label>
              <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} className="input" placeholder="Your name" />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input value={user?.email || ''} disabled className="input opacity-50 cursor-not-allowed" />
              <p className="text-xs text-gray-600 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} className="input" placeholder="+880 1700-000000" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Profile</>}
            </button>
          </form>
        )}

        {tab === 'password' && (
          <form onSubmit={savePassword} className="card p-6 space-y-4">
            <div>
              <label className="label">Current Password</label>
              <input type="password" value={passwords.currentPassword}
                onChange={e => setPasswords(p => ({ ...p, currentPassword: e.target.value }))}
                className="input" placeholder="Enter current password" required />
            </div>
            <div>
              <label className="label">New Password</label>
              <input type="password" value={passwords.newPassword}
                onChange={e => setPasswords(p => ({ ...p, newPassword: e.target.value }))}
                className="input" placeholder="Min. 6 characters" required minLength={6} />
            </div>
            <div>
              <label className="label">Confirm New Password</label>
              <input type="password" value={passwords.confirm}
                onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                className="input" placeholder="Repeat new password" required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</> : <><Lock className="w-4 h-4" /> Change Password</>}
            </button>
          </form>
        )}
      </div>
    </MainLayout>
  );
}
