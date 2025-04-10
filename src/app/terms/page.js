export const metadata = {
  title: 'Terms & Conditions | LooksPure',
  description: 'Terms and conditions for using LooksPure services',
}

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-5xl font-bold mb-10">Terms & Conditions</h1>
      
      <div className="space-y-6 text-lg">
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials on LooksPure's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Attempt to decompile or reverse engineer any software contained on LooksPure's website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">3. Disclaimer</h2>
        <p>
          The materials on LooksPure's website are provided on an 'as is' basis. LooksPure makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">4. Limitations</h2>
        <p>
          In no event shall LooksPure or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on LooksPure's website, even if LooksPure or a LooksPure authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">5. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>
      </div>
    </main>
  )
}