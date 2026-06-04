import { Link } from 'react-router-dom'
import { deleteProduct } from '../api/products'

export default function ProductCard({ product, onDelete }) {
  const handleDelete = async () => {
    if (!confirm(`Supprimer "${product.productTitle}" ?`)) return
    try {
      await deleteProduct(product.productId)
      onDelete(product.productId)
    } catch (err) {
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {product.productThumbnail ? (
          <img
            src={`http://localhost:3005/uploads/${product.productThumbnail}`}
            alt={product.productTitle}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-5xl">📦</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-1">{product.productTitle}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.productDescription}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-indigo-600 font-bold text-xl">${Number(product.productPrice).toFixed(2)}</span>
          <span className="text-sm text-gray-400">Qté: {product.availableQuantity}</span>
        </div>
        <div className="flex gap-2">
          <Link to={`/products/${product.productId}/edit`} className="flex-1 text-center bg-indigo-50 text-indigo-600 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
            Modifier
          </Link>
          <button onClick={handleDelete} className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}