export const metadata = {
  title: 'Help Center | LooksPure',
  description: 'Get help with your LooksPure orders and products',
}

export default function HelpPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-5xl font-bold mb-10">Help Center</h1>
      
      <div className="space-y-6 text-lg">
        <p>Welcome to our Help Center. Find answers to your questions or contact our support team for assistance.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Order Issues</h2>
            <ul className="space-y-3">
              <li>• <a href="/track" className="text-blue-600 hover:underline">Track your order</a></li>
              <li>• <a href="/faqs" className="text-blue-600 hover:underline">Shipping information</a></li>
              <li>• <a href="/return-policy" className="text-blue-600 hover:underline">Returns and refunds</a></li>
              <li>• Missing or damaged items</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Product Information</h2>
            <ul className="space-y-3">
              <li>• <a href="/knowledge" className="text-blue-600 hover:underline">Product ingredients</a></li>
              <li>• Usage instructions</li>
              <li>• Product recommendations</li>
              <li>• Allergies and sensitivities</li>
            </ul>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Contact Us</h2>
        <p>Our customer support team is available to help you Monday through Friday, 9am to 6pm IST.</p>
        
        <div className="bg-gray-50 p-6 rounded-lg mt-6">
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
      </div>
    </main>
  )
}