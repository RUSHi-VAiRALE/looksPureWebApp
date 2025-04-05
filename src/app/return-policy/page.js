import PageTemplate from '@/components/PageTemplate'

export const metadata = {
  title: 'Return & Refund Policy | LooksPure',
  description: 'Learn about LooksPure\'s return and refund policies',
}

export default function ReturnPolicyPage() {
  return (
    <PageTemplate title="Return & Refund Policy">
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Return Policy</h2>
      <p className="mb-4">We accept returns of unused and unopened products within 30 days of the delivery date. To be eligible for a return, your item must be in the same condition that you received it, unopened, and in its original packaging.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Refund Process</h2>
      <p className="mb-4">Once we receive and inspect your return, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Late or Missing Refunds</h2>
      <p className="mb-4">If you haven&apos;t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. Next contact your bank. There is often some processing time before a refund is posted. If you&apos;ve done all of this and you still have not received your refund yet, please contact us at returns@lookspure.com.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Damaged or Defective Items</h2>
      <p className="mb-4">If you receive a damaged or defective item, please contact us immediately at returns@lookspure.com with photos of the damaged product and packaging. We will work with you to resolve the issue promptly.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Exchanges</h2>
      <p className="mb-4">We do not offer direct exchanges. If you wish to exchange an item, please return the original item for a refund and place a new order for the desired item.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Return Shipping</h2>
      <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
    </PageTemplate>
  )
}