export const metadata = {
  title: 'Knowledge | LooksPure',
  description: 'Learn about natural beauty and skincare with LooksPure',
}

export default function KnowledgePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-5xl font-bold mb-10">Knowledge Center</h1>
      
      <div className="space-y-6 text-lg">
        <p>
          Welcome to our Knowledge Center, where we share information about natural beauty, ingredients, and skincare practices. Our goal is to educate and empower you to make informed decisions about your beauty routine.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Understanding Ingredients</h2>
        <p>
          Natural ingredients have been used for centuries in beauty routines. Learn about common natural ingredients and their benefits for your skin and hair.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Aloe Vera</strong> - Soothes and hydrates skin, reduces inflammation</li>
          <li><strong>Tea Tree Oil</strong> - Natural antibacterial properties, helps with acne</li>
          <li><strong>Hyaluronic Acid</strong> - Naturally occurring in skin, provides intense hydration</li>
          <li><strong>Vitamin C</strong> - Powerful antioxidant, brightens skin and boosts collagen</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Harmful Ingredients to Avoid</h2>
        <p>
          Many conventional beauty products contain ingredients that may be harmful to your health. Learn about ingredients to avoid and why they're problematic.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li><strong>Parabens</strong> - Potential hormone disruptors</li>
          <li><strong>Sulfates</strong> - Can strip natural oils and irritate skin</li>
          <li><strong>Synthetic Fragrances</strong> - Common allergens and irritants</li>
          <li><strong>Phthalates</strong> - Linked to hormonal disruption</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Skincare Routines</h2>
        <p>
          Discover effective skincare routines for different skin types and concerns. Learn how to build a natural skincare routine that works for you.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Sustainability in Beauty</h2>
        <p>
          Learn about sustainable practices in the beauty industry and how you can make more environmentally friendly choices in your beauty routine.
        </p>
      </div>
    </main>
  )
}