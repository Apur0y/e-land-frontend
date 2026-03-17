import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import AIAnalyzeTool from '@/components/ai/AIAnalyzeTool';

export const metadata: Metadata = {
  title: 'AI Land Analyzer – Get Full Property Analysis',
  description: 'Enter any land details and get a comprehensive AI analysis including investment score, risk factors, price projection, and rental yield.',
};

export default function AIAnalyzePage() {
  return (
    <MainLayout>
      <div className="py-10">
        <div className="page-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-display font-bold text-4xl text-white mb-3">AI Land Analyzer</h1>
              <p className="text-gray-400 text-lg">Get a comprehensive investment report for any land in Bangladesh.</p>
            </div>
            <AIAnalyzeTool />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
