// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id}`} className="block group">
      <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
        <div className="h-56 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-semibold text-indigo-600">${product.price}</span>
            <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">{product.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
