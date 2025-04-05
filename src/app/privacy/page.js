import PageTemplate from '@/components/PageTemplate'

export const metadata = {
  title: 'Privacy Policy | LooksPure',
  description: 'Learn about how LooksPure handles your personal information',
}

export default function PrivacyPage() {
  return (
    <PageTemplate title="Privacy Policy">
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
      <p className="mb-4">We collect personal information that you voluntarily provide to us when you register on our website, express interest in obtaining information about us or our products, or otherwise contact us.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
      <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect LooksPure and our users.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">3. Sharing Your Information</h2>
      <p className="mb-4">We do not share your personal information with third parties except as described in this privacy policy. We may share your information with our service providers who process your information to provide services to us or on our behalf.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">4. Your Rights</h2>
      <p className="mb-4">You have the right to access, update, or delete your personal information. You can also object to processing of your personal information, ask us to restrict processing of your personal information, or request portability of your personal information.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">5. Cookies</h2>
      <p className="mb-4">We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">6. Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.</p>
    </PageTemplate>
  )
}