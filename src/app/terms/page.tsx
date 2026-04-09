import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Terms of Service – Eland',
  description: 'Eland Terms of Service — rules and guidelines for using our platform.',
};

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="py-16">
        <div className="page-container max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-4xl text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400 mb-10">Last updated: January 1, 2025</p>

          <div className="space-y-6">
            {[
              {
                title: '1. Acceptance of Terms',
                content: 'By accessing Eland, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not use our service.',
              },
              {
                title: '2. AI Analysis Disclaimer',
                content: 'Eland\'s AI analysis, price predictions, risk assessments, and investment recommendations are provided for informational purposes only. They do not constitute financial, legal, or investment advice. Always consult qualified professionals before making investment decisions. Eland is not responsible for investment losses based on AI-generated reports.',
              },
              {
                title: '3. Listing Accuracy',
                content: 'Users who list properties are responsible for the accuracy of listing information. Eland does not verify legal ownership or land records. Buyers must conduct their own due diligence. Fraudulent listings will result in immediate account termination.',
              },
              {
                title: '4. User Accounts',
                content: 'You are responsible for maintaining the security of your account. Sharing account credentials is prohibited. You must be at least 18 years old to use Eland. We reserve the right to terminate accounts that violate these terms.',
              },
              {
                title: '5. AI Credits & Billing',
                content: 'Free plan users receive 10 AI analyses per month. Credits reset monthly and do not roll over. Paid plans are billed monthly. Refunds are available within 7 days of purchase if no AI credits have been used.',
              },
              {
                title: '6. Prohibited Uses',
                content: 'You may not use Eland to post fraudulent listings, scrape platform data, spam other users, violate any applicable laws, or attempt to reverse-engineer our AI systems.',
              },
              {
                title: '7. Intellectual Property',
                content: 'Eland\'s platform, code, AI models, and brand assets are proprietary. You may not reproduce, distribute, or create derivative works without explicit written permission.',
              },
              {
                title: '8. Limitation of Liability',
                content: 'Eland is not liable for investment losses, inaccurate AI predictions, or any indirect damages arising from use of our platform. Our total liability is limited to the amount you paid for our services in the last 3 months.',
              },
              {
                title: '9. Governing Law',
                content: 'These terms are governed by the laws of Bangladesh. Any disputes will be resolved in the courts of Dhaka, Bangladesh.',
              },
              {
                title: '10. Changes to Terms',
                content: 'We may modify these terms at any time. Continued use of Eland after changes constitutes acceptance of the new terms.',
              },
            ].map(section => (
              <div key={section.title} className="card p-6">
                <h2 className="font-bold text-white text-lg mb-3">{section.title}</h2>
                <p className="text-gray-400 leading-relaxed text-sm">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
