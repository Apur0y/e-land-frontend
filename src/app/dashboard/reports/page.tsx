'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportAPI } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Brain, Loader2, Trash2, ExternalLink, FileText } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const typeLabels: any = {
  full_analysis: 'Full Analysis', price_prediction: 'Price Prediction',
  risk_assessment: 'Risk Assessment', comparison: 'Comparison', roi_calculator: 'ROI Calculator',
};

export default function ReportsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const qc = useQueryClient();

  useEffect(() => { if (!isAuthenticated) router.push('/login'); }, [isAuthenticated]);

  const { data, isLoading } = useQuery({
    queryKey: ['my-reports'],
    queryFn: () => reportAPI.myReports(),
    enabled: isAuthenticated,
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => reportAPI.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['my-reports'] }); toast.success('Report deleted'); },
  });

  const reports = data?.data?.data || [];

  return (
    <MainLayout>
      <div className="py-10 page-container max-w-4xl mx-auto">
        <h1 className="font-display font-bold text-3xl text-white mb-8">My AI Reports</h1>

        {isLoading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-brand-400 animate-spin" /></div>
        ) : reports.length === 0 ? (
          <div className="card p-16 text-center">
            <Brain className="w-14 h-14 text-gray-700 mx-auto mb-4" />
            <h3 className="font-bold text-white text-xl mb-2">No Reports Yet</h3>
            <p className="text-gray-500 mb-6">Run your first AI analysis to see reports here.</p>
            <Link href="/ai/analyze" className="btn-primary">Run AI Analysis</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((report: any) => (
              <div key={report._id} className="card p-4 flex items-center gap-4 hover:border-brand-800 transition-all">
                <div className="w-10 h-10 rounded-xl bg-brand-950 border border-brand-900 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{report.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{typeLabels[report.type] || report.type}</span>
                    <span className="text-gray-700">·</span>
                    <span className="text-xs text-gray-500">{new Date(report.createdAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    {report.land && (
                      <>
                        <span className="text-gray-700">·</span>
                        <Link href={`/listings/${report.land.slug}`} className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> View Property
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`badge text-xs ${report.status === 'completed' ? 'badge-green' : 'badge-red'}`}>{report.status}</span>
                  <button onClick={() => { if (confirm('Delete this report?')) deleteMut.mutate(report._id); }}
                    className="w-8 h-8 rounded-lg border border-surface-border hover:border-red-700 flex items-center justify-center transition-all">
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
