import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy – LandIQ',
  description: 'LandIQ Privacy Policy — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="py-16">
        <div className="page-container max-w-3xl mx-auto">
          <h1 className="font-display font-bold text-4xl text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 mb-10">Last updated: January 1, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            {[
              {
                title: '1. Information We Collect',
                content: 'We collect information you provide directly such as your name, email address, phone number, and property details when you create an account or list a property. We also collect usage data including IP addresses, browser type, pages visited, and AI analysis queries to improve our platform.',
              },
              {
                title: '2. How We Use Your Information',
                content: 'We use collected information to provide and improve our services, send transactional emails, analyze platform usage, prevent fraud, and comply with legal obligations. We do not sell your personal information to third parties.',
              },
              {
                title: '3. AI Analysis Data',
                content: 'Land details you enter for AI analysis are sent to Google\'s Gemini AI API for processing. We do not store raw prompts beyond what is necessary to generate your report. AI reports are stored in your account for your reference and may be used in aggregate anonymized form to improve our service.',
              },
              {
                title: '4. Data Sharing',
                content: 'We share data only with service providers necessary to operate LandIQ (MongoDB Atlas for storage, Google Gemini for AI, email providers for notifications). We may share information if required by law or to protect our legal rights.',
              },
              {
                title: '5. Data Security',
                content: 'We implement industry-standard security measures including JWT authentication, password hashing with bcrypt, HTTPS encryption, and rate limiting. However, no system is 100% secure and we cannot guarantee absolute security.',
              },
              {
                title: '6. Your Rights',
                content: 'You have the right to access, correct, or delete your personal data at any time. You can update your profile from your dashboard or contact us at privacy@landiq.com to request data deletion.',
              },
              {
                title: '7. Cookies',
                content: 'We use minimal cookies necessary for authentication (JWT tokens stored in localStorage) and basic analytics. We do not use third-party advertising cookies.',
              },
              {
                title: '8. Contact',
                content: 'For privacy concerns, contact us at privacy@landiq.com or write to: LandIQ Privacy, Gulshan-1, Dhaka-1212, Bangladesh.',
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
