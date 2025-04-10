export const metadata = {
  title: 'Corporate Information | LooksPure',
  description: 'Corporate information about LooksPure',
}

export default function CorporatePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-5xl font-bold mb-10">Corporate Information</h1>
      
      <div className="space-y-6 text-lg">
        <h2 className="text-2xl font-bold mt-10 mb-4">Company Overview</h2>
        <p>
          LooksPure is a leading provider of natural and toxin-free beauty products. Founded in 2020, we have quickly grown to become a trusted name in the clean beauty industry.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Our Mission</h2>
        <p>
          Our mission is to provide high-quality, natural beauty products that are safe for our customers and the environment. We believe that beauty should not come at the cost of health or environmental sustainability.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Legal Structure</h2>
        <p>
          LooksPure is a private limited company registered in India. Our company registration number is XXXXXXXXXX.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Business Address</h2>
        <p>
          LooksPure Private Limited<br />
          123 Beauty Lane<br />
          Mumbai, Maharashtra 400001<br />
          India
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Contact Information</h2>
        <p>
          Email: corporate@lookspure.com<br />
          Phone: +91 XX XXXX XXXX
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Tax Information</h2>
        <p>
          GST Number: XXXXXXXXXXXX
        </p>
      </div>
    </main>
  )
}