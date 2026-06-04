import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createProduct, getProduct, updateProduct } from '../api/products'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    productTitle: '',
    productDescription: '',
    productPrice: '',
    availableQuantity: '',
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isEdit) {
      getProduct(id).then(res => {
        const { productTitle, productDescription, productPrice, availableQuantity, productThumbnail } = res.data
        setForm({ productTitle, productDescription, productPrice, availableQuantity })
        if (productThumbnail) setPreview(`http://localhost:3005/uploads/${productThumbnail}`)
      })
    }
  }, [id])

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, v))
      if (image) data.append('productThumbnail', image)

      if (isEdit) await updateProduct(id, data)
      else await createProduct(data)

      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {isEdit ? 'Modifier le produit' : 'Nouveau produit'}
      </h1>
      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 mb-6">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
          <input name="productTitle" value={form.productTitle} onChange={handleChange} required placeholder="Nom du produit" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea name="productDescription" value={form.productDescription} onChange={handleChange} rows={3} placeholder="Description du produit" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prix *</label>
            <input name="productPrice" value={form.productPrice} onChange={handleChange} required type="number" step="0.01" min="0" placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantité</label>
            <input name="availableQuantity" value={form.availableQuantity} onChange={handleChange} type="number" min="0" placeholder="0" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
          {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-lg mb-3 border border-gray-200" />}
          <input type="file" accept="image/*" onChange={handleImage} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100" />
        </div>
        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50">
            {loading ? 'Enregistrement...' : isEdit ? 'Modifier' : 'Créer'}
          </button>
          <button type="button" onClick={() => navigate('/')} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}