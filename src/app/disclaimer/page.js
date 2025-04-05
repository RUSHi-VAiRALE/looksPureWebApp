import PageTemplate from '@/components/PageTemplate'

export const metadata = {
  title: 'Disclaimer | LooksPure',
  description: 'Disclaimer information for LooksPure',
}

export default function DisclaimerPage() {
  return (
    <PageTemplate title="Disclaimer">
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Website Disclaimer</h2>
      <p className="mb-4">The information provided by LooksPure on our website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Product Disclaimer</h2>
      <p className="mb-4">The products available on our website are intended for cosmetic use only. They are not intended to diagnose, treat, cure, or prevent any disease or health condition. Results from using our products may vary from person to person.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Allergies and Sensitivities</h2>
      <p className="mb-4">While we strive to use natural ingredients, some individuals may still experience allergic reactions or sensitivities. We recommend performing a patch test before using any new product. If irritation occurs, discontinue use immediately and consult a healthcare professional.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">External Links Disclaimer</h2>
      <p>Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with LooksPure. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
    </PageTemplate>
  )
}