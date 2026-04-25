import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Image, DollarSign, FileText, Package, AlertCircle } from 'lucide-react';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: 'baby'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !formData.price || !formData.description || !formData.image) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      await api.post('/products', {
        ...formData,
        price: Number(formData.price)
      });
      alert('Product submitted for admin approval!');
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-[#c2185b] px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Add New Product</h2>
            <p className="text-pink-100">List your product for sale</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Product Title</label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
                  placeholder="Enter product title"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Price (ETB)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
                  placeholder="Enter price"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
              >
                <option value="baby">Baby Products</option>
                <option value="home">Home Products</option>
                <option value="toys">Toys</option>
                <option value="clothing">Clothing</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
                  placeholder="Describe your product"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c2185b] text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit for Approval'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;