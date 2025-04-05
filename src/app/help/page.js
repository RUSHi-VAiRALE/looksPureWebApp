import PageTemplate from '@/components/PageTemplate'
import Link from 'next/link'

export const metadata = {
  title: 'Help Center | LooksPure',
  description: 'Get help with your LooksPure orders and products',
}

export default function HelpPage() {
  return (
    <PageTemplate title="Help Center">
      <p className="mb-6">Welcome to our Help Center. Find answers to your questions or contact our support team for assistance.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Order Issues</h2>
          <ul className="space-y-2">
            <li>• <Link href="/track" className="text-blue-600 hover:underline">Track your order</Link></li>
            <li>• <Link href="/faqs" className="text-blue-600 hover:underline">Shipping information</Link></li>
            <li>• <Link href="/return-policy" className="text-blue-600 hover:underline">Returns and refunds</Link></li>
            <li>• Missing or damaged items</li>
          </ul>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Product Information</h2>
          <ul className="space-y-2">
            <li>• <Link href="/knowledge" className="text-blue-600 hover:underline">Product ingredients</Link></li>
            <li>• Usage instructions</li>
            <li>• Product recommendations</li>
            <li>• Allergies and sensitivities</li>
          </ul>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="mb-4">Our customer support team is available to help you Monday through Friday, 9am to 6pm IST.</p>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold mb-2">Email Us</h3>
        <p className="mb-4">For the fastest response, please email us at <a href="mailto:help@lookspure.com" className="text-blue-600 hover:underline">help@lookspure.com</a></p>
        
        <h3 className="font-semibold mb-2">Call Us</h3>
        <p className="mb-4">Customer Service: +91 XX XXXX XXXX</p>
        
        <h3 className="font-semibold mb-2">Write to Us</h3>
        <p>
          LooksPure Customer Support<br />
          123 Beauty Lane<br />
          Mumbai, Maharashtra 400001<br />
          India
        </p>
      </div>
    </PageTemplate>
  )
}