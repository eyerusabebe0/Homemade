import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Heart, Star, Truck, Shield, ArrowLeft, Minus, Plus } from 'lucide-react';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setPurchasing(true);
    try {
      const total = product.price * quantity;
      await api.post(`/products/${id}/purchase`, { quantity, total });
      alert('Purchase successful! Check your dashboard.');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Purchase failed');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c2185b]"></div>
      </div>
    );
  }

  if (!product) return null;

  const total = product.price * quantity;

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#c2185b] transition"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover md:h-[500px]"
              />
              <button className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-md hover:bg-pink-50">
                <Heart size={20} className="text-gray-400 hover:text-red-500" />
              </button>
            </div>

            {/* Info Section */}
            <div className="p-6">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <Star size={18} className="fill-gray-300 text-gray-300" />
                  </div>
                  <span className="text-gray-500">(124 reviews)</span>
                </div>
                <div className="text-3xl font-bold text-[#c2185b]">{product.price} ETB</div>
              </div>

              <div className="border-t border-b py-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Truck size={20} />
                  <span>Free delivery on orders over 1000 ETB</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield size={20} />
                  <span>Safe marketplace guarantee</span>
                </div>
                <div className="text-sm text-gray-500">
                  Sold by: <span className="font-semibold">{product.ownerName}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Quantity:</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="mb-6 p-3 bg-pink-50 rounded-lg">
                <div className="flex justify-between text-gray-700">
                  <span>Total:</span>
                  <span className="font-bold text-xl text-[#c2185b]">{total} ETB</span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={purchasing}
                className="w-full bg-[#c2185b] text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingBag size={20} />
                {purchasing ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;