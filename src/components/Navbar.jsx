import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">🛍️ Product Manager</Link>
        <Link to="/products/new" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-sm">
          + Nouveau produit
        </Link>
      </div>
    </nav>
  )
}