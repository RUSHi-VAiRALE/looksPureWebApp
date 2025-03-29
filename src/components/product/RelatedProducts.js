import Image from 'next/image';
import Link from 'next/link';

export default function RelatedProducts({ products }) {
  return (
    <div className="mt-20">
      <h2 className="text-2xl font-medium text-gray-900 mb-8">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-center object-cover group-hover:opacity-90 transition-opacity"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{product.subtitle}</p>
              <p className="text-sm font-medium text-gray-900 mt-2">₹{product.price.toFixed(2)}</p>
            </div>
            <Link
              href={`/products/${product.id}`}
              className="mt-2 inline-block text-sm text-emerald-600 hover:text-emerald-700"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}