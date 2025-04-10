export const metadata = {
  title: 'Our Values | LooksPure',
  description: 'Learn about the core values that drive LooksPure',
}

export default function ValuesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <h1 className="text-5xl font-bold mb-10">Our values</h1>
      
      <div className="space-y-6 text-lg">
        <p>
          Founded in 2020 with the belief that beauty industry requires a revolution with respect to <strong>TRANSPARENCY</strong>. There is lot of inaccurate advice & incorrect claims being made by beauty brands which results in fear mongering, misconceptions and eventually consumers making wrong decisions.
        </p>
        
        <p>
          For example, the <em>blind march</em> towards beauty products with 'Natural' claims is really concerning. There is a misconception that 100% natural is safe & effective and anything that sounds like a chemical is unsafe. This is completely wrong.
        </p>
        
        <p className="font-semibold">
          "Everything is a chemical – water is a chemical – therefore, chemical-free products don't exist."
        </p>
        
        <p>
          We wanted to address this issue of <em>lack of transparency</em> through a range of products that are straightforward, honest and do what they claim to do. No unnecessary marketing fluff. And this is how <strong>Minimalist</strong> was born.
        </p>
        
        <div className="mt-12 mb-8">
          <h2 className="text-5xl font-bold">
            <span>Hide</span><span className="font-black">Nothing</span><span>.</span>
          </h2>
        </div>
      </div>
    </main>
  )
}