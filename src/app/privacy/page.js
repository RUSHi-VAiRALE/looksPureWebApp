export const metadata = {
  title: 'Privacy Policy | LooksPure',
  description: 'Learn about how LooksPure handles your personal information',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-5xl font-bold mb-10">Privacy Policy</h1>
      
      <div className="space-y-6 text-lg">
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">1. Information We Collect</h2>
        <p>
          At LooksPure, we value your privacy and are committed to protecting your personal data. We collect personal information that you voluntarily provide to us when you register on our website, express interest in obtaining information about us or our products, or otherwise contact us.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">2. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect LooksPure and our users. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">3. Sharing Your Information</h2>
        <p>
          We do not share your personal information with third parties except as described in this privacy policy. We may share your information with our service providers who process your information to provide services to us or on our behalf.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">4. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. You can also object to processing of your personal information, ask us to restrict processing of your personal information, or request portability of your personal information.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">5. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
        </p>
      </div>
    </main>
  )
}