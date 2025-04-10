export const metadata = {
  title: 'Disclaimer | LooksPure',
  description: 'Disclaimer information for LooksPure',
}

export default function DisclaimerPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-5xl font-bold mb-10">Disclaimer</h1>
      
      <div className="space-y-6 text-lg">
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Website Disclaimer</h2>
        <p>
          The information provided by LooksPure on our website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Product Disclaimer</h2>
        <p>
          The products available on our website are intended for cosmetic use only. They are not intended to diagnose, treat, cure, or prevent any disease or health condition. Results from using our products may vary from person to person.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Allergies and Sensitivities</h2>
        <p>
          While we strive to use natural ingredients, some individuals may still experience allergic reactions or sensitivities. We recommend performing a patch test before using any new product. If irritation occurs, discontinue use immediately and consult a healthcare professional.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">External Links Disclaimer</h2>
        <p>
          Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with LooksPure. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Professional Advice</h2>
        <p>
          The contents of the LooksPure website do not constitute professional advice. If you have specific concerns or questions about your skin or health, please consult with a qualified healthcare provider.
        </p>
      </div>
    </main>
  )
}