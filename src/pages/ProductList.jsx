import { useState, useEffect } from 'react'
import { getProducts } from '../api/products'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(() => setError('Impossible de charger les produits'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = (id) => setProducts(prev => prev.filter(p => p.productId !== id))

  const filtered = products.filter(p =>
    p.productTitle.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-400 animate-pulse text-lg">Chargement...</p>
    </div>
  )

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">{error}</div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Produits</h1>
        <span className="text-gray-400 text-sm">{filtered.length} produit(s)</span>
      </div>
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-8 px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">📦</p>
          <p>Aucun produit trouvé</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.productId} product={product} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}