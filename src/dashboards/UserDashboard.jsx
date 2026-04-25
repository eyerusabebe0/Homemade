// src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { ShoppingBag, Package, Edit2, Trash2, CheckCircle, Clock, AlertCircle, CreditCard } from 'lucide-react';

function UserDashboard() {
  const { user } = useAuth();
  const [myProducts, setMyProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, purchasesRes] = await Promise.all([
        api.get('/products/my-products'),
        api.get('/products/my-purchases')
      ]);
      setMyProducts(productsRes.data.products);
      setPurchases(purchasesRes.data.purchases);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayCommission = async (productId, commission) => {
    if (window.confirm(`Pay ${commission} ETB commission to admin?`)) {
      try {
        await api.put(`/products/pay-commission/${productId}`);
        setMessage({ text: `✅ Payment of ${commission} ETB successful! Your product will appear on homepage within 24 hours.`, type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        fetchData();
      } catch (error) {
        setMessage({ text: `❌ Payment failed: ${error.response?.data?.message || error.message}`, type: 'error' });
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
      }
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        setMyProducts(myProducts.filter(p => p._id !== productId));
        setMessage({ text: '✅ Product deleted successfully', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } catch (error) {
        setMessage({ text: `❌ Failed to delete product`, type: 'error' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return <span className="flex items-center gap-1 text-green-600"><CheckCircle size={14} /> Approved</span>;
      case 'pending':
        return <span className="flex items-center gap-1 text-yellow-600"><Clock size={14} /> Pending</span>;
      case 'rejected':
        return <span className="flex items-center gap-1 text-red-600"><AlertCircle size={14} /> Rejected</span>;
      default:
        return <span>{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c2185b]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-pink-500 to-[#c2185b] rounded-2xl shadow-lg p-8 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
          <p className="text-pink-100">Manage your products and track your purchases</p>
        </div>

        {message.text && (
          <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 'bg-red-100 text-red-700 border-l-4 border-red-500'}`}>
            {message.text}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Products Listed</p>
                <p className="text-3xl font-bold text-[#c2185b]">{myProducts.length}</p>
              </div>
              <Package size={40} className="text-pink-300" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Items Purchased</p>
                <p className="text-3xl font-bold text-[#c2185b]">{purchases.length}</p>
              </div>
              <ShoppingBag size={40} className="text-pink-300" />
            </div>
          </div>
        </div>

        {/* My Products Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Package size={24} className="text-[#c2185b]" />
            My Products
          </h2>
          {myProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">You haven't listed any products yet</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myProducts.map(product => {
                const commission = product.price * 0.01;
                return (
                  <div key={product._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                    <img src={product.image} alt={product.title} className="h-40 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                      <p className="text-[#c2185b] font-bold">{product.price} ETB</p>
                      <p className="text-sm text-orange-600">Commission: {commission} ETB (1%)</p>
                      <div className="text-sm mt-2">{getStatusBadge(product.status)}</div>
                      {product.status === 'approved' && !product.paymentReceived && (
                        <button
                          onClick={() => handlePayCommission(product._id, commission)}
                          className="w-full mt-3 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition flex items-center justify-center gap-1"
                        >
                          <CreditCard size={14} /> Pay {commission} ETB Commission
                        </button>
                      )}
                      {product.status === 'approved' && product.paymentReceived && (
                        <div className="w-full mt-3 bg-green-100 text-green-700 py-2 rounded text-center text-sm">
                          ✓ Payment Received - Live on Homepage
                        </div>
                      )}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition flex items-center justify-center gap-1"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Purchases Section with VAT */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ShoppingBag size={24} className="text-[#c2185b]" />
            My Purchases
          </h2>
          {purchases.length === 0 ? (
            <p className="text-gray-500 text-center py-8">You haven't made any purchases yet</p>
          ) : (
            <div className="space-y-4">
              {purchases.map(purchase => {
                const vat = purchase.total - purchase.subtotal;
                return (
                  <div key={purchase._id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-pink-50 transition">
                    <img src={purchase.productImage} alt={purchase.productTitle} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{purchase.productTitle}</h3>
                      <p className="text-gray-600 text-sm">Quantity: {purchase.quantity}</p>
                      <p className="text-xs text-gray-500">VAT (3%): {vat?.toFixed(2) || (purchase.total * 0.03).toFixed(2)} ETB</p>
                      <p className="text-[#c2185b] font-bold">Total: {purchase.total} ETB</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{new Date(purchase.createdAt).toLocaleDateString()}</p>
                      <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Completed</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;