import PageTemplate from '@/components/PageTemplate'

export const metadata = {
  title: 'Knowledge | LooksPure',
  description: 'Learn about natural beauty and skincare with LooksPure',
}

export default function KnowledgePage() {
  return (
    <PageTemplate title="Knowledge Center">
      <p className="mb-4">Welcome to our Knowledge Center, where we share information about natural beauty, ingredients, and skincare practices.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Understanding Ingredients</h2>
      <p className="mb-4">Natural ingredients have been used for centuries in beauty routines. Learn about common natural ingredients and their benefits for your skin and hair.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Harmful Ingredients to Avoid</h2>
      <p className="mb-4">Many conventional beauty products contain ingredients that may be harmful to your health. Learn about ingredients to avoid and why they're problematic.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Skincare Routines</h2>
      <p className="mb-4">Discover effective skincare routines for different skin types and concerns. Learn how to build a natural skincare routine that works for you.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Haircare Tips</h2>
      <p className="mb-4">Explore natural haircare practices and learn how to maintain healthy, beautiful hair without harsh chemicals.</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-3">Sustainability in Beauty</h2>
      <p>Learn about sustainable practices in the beauty industry and how you can make more environmentally friendly choices in your beauty routine.</p>
    </PageTemplate>
  )
}