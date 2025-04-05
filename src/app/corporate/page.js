import PageTemplate from '@/components/PageTemplate'

export const metadata = {
  title: 'Corporate Information | LooksPure',
  description: 'Corporate information about LooksPure',
}

export default function CorporatePage() {
  return (
    <PageTemplate title="Corporate Information">
      <h2 className="text-xl font-semibold mt-6 mb-3">Company Overview</h2>
      <p className="mb-4">LooksPure is a leading provider of natural and toxin-free beauty products. Founded in 2020, we have quickly grown to become a trusted name in the clean beauty industry.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Our Mission</h2>
      <p className="mb-4">Our mission is to provide high-quality, natural beauty products that are safe for our customers and the environment. We believe that beauty should not come at the cost of health or environmental sustainability.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Legal Structure</h2>
      <p className="mb-4">LooksPure is a private limited company registered in India. Our company registration number is XXXXXXXXXX.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Business Address</h2>
      <p className="mb-4">
        LooksPure Private Limited<br />
        123 Beauty Lane<br />
        Mumbai, Maharashtra 400001<br />
        India
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Contact Information</h2>
      <p className="mb-4">
        Email: corporate@lookspure.com<br />
        Phone: +91 XX XXXX XXXX
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Tax Information</h2>
      <p>GST Number: XXXXXXXXXXXX</p>
    </PageTemplate>
  )
}