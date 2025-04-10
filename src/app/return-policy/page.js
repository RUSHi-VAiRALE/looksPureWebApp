export const metadata = {
  title: 'Return & Refund Policy | LooksPure',
  description: 'Learn about LooksPure\'s return and refund policies',
}

export default function ReturnPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-5xl font-bold mb-10">Return & Refund Policy</h1>
      
      <div className="space-y-6 text-lg">
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Return Policy</h2>
        <p>
          We accept returns of unused and unopened products within 30 days of the delivery date. To be eligible for a return, your item must be in the same condition that you received it, unopened, and in its original packaging.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Refund Process</h2>
        <p>
          Once we receive and inspect your return, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Late or Missing Refunds</h2>
        <p>
          If you haven&apos;t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next contact your bank. There is often some processing time before a refund is posted. If you&apos;ve done all of this and you still have not received your refund yet, please contact us at returns@lookspure.com.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Damaged or Defective Items</h2>
        <p>
          If you receive a damaged or defective item, please contact us immediately at returns@lookspure.com with photos of the damaged product and packaging. We will work with you to resolve the issue promptly.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Exchanges</h2>
        <p>
          We do not offer direct exchanges. If you wish to exchange an item, please return the original item for a refund and place a new order for the desired item.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Return Shipping</h2>
        <p>
          You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
        </p>
      </div>
    </main>
  )
}