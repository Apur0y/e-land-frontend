import type { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';

export const metadata: Metadata = { title: 'Admin Dashboard – LandIQ', robots: { index: false } };

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboardClient />
    </AdminLayout>
  );
}
