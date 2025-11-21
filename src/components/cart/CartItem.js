'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FiTrash2 } from 'react-icons/fi'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <li className="p-6">
      <div className="flex flex-col sm:flex-row">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mb-4 sm:mb-0">
          <Image
            src={item.image}
            alt={item.name}
            width={96}
            height={96}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="sm:ml-6 flex flex-1 flex-col">
          <div className="flex justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">
                <Link href={`/singleProduct/${item.id}`} className="hover:text-emerald-600">
                  {item.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{item.subtitle}</p>
            </div>
            <p className="text-base font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-end mt-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1 text-gray-600 hover:text-gray-900"
              >
                -
              </button>
              <span className="px-3 py-1">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:text-gray-900"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="flex items-center text-sm font-medium text-red-600 hover:text-red-500"
            >
              <FiTrash2 className="mr-1" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

