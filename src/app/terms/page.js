import PageTemplate from '@/components/PageTemplate'

export const metadata = {
  title: 'Terms & Conditions | LooksPure',
  description: 'Terms and conditions for using LooksPure services',
}

export default function TermsPage() {
  return (
    <PageTemplate title="Terms & Conditions">
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
      <p className="mb-4">By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">2. Use License</h2>
      <p className="mb-4">Permission is granted to temporarily download one copy of the materials on LooksPure's website for personal, non-commercial transitory viewing only.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">3. Disclaimer</h2>
      <p className="mb-4">The materials on LooksPure's website are provided on an 'as is' basis. LooksPure makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">4. Limitations</h2>
      <p className="mb-4">In no event shall LooksPure or its suppliers be liable for any damages arising out of the use or inability to use the materials on LooksPure's website.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">5. Revisions</h2>
      <p className="mb-4">The materials appearing on LooksPure's website could include technical, typographical, or photographic errors. LooksPure does not warrant that any of the materials on its website are accurate, complete, or current.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">6. Governing Law</h2>
      <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
    </PageTemplate>
  )
}