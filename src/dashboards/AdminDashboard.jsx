// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { CheckCircle, XCircle, Users, Package, ShoppingBag, DollarSign, Clock, CreditCard } from 'lucide-react';

function AdminDashboard() {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [pendingRes, usersRes, purchasesRes, statsRes] = await Promise.all([
        api.get('/admin/pending-products'),
        api.get('/admin/users'),
        api.get('/admin/purchases'),
        api.get('/admin/stats')
      ]);
      setPendingProducts(pendingRes.data.products);
      setUsers(usersRes.data.users);
      setPurchases(purchasesRes.data.purchases);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (product) => {
    try {
      const commission = product.price * 0.01;
      await api.put(`/admin/approve-product/${product._id}`);
      setPendingProducts(pendingProducts.filter(p => p._id !== product._id));
      setMessage({ text: `✅ Product "${product.title}" approved! Commission to collect: ${commission} ETB. Seller will be notified to pay.`, type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
      fetchDashboardData();
    } catch (error) {
      setMessage({ text: `❌ Failed to approve product: ${error.response?.data?.message || error.message}`, type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }
  };

  const handleReject = async (productId) => {
    try {
      await api.put(`/admin/reject-product/${productId}`);
      setPendingProducts(pendingProducts.filter(p => p._id !== productId));
      setMessage({ text: '❌ Product rejected', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      fetchDashboardData();
    } catch (error) {
      setMessage({ text: `❌ Failed to reject product: ${error.response?.data?.message || error.message}`, type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }
  };

  const handleMarkPaymentReceived = async (productId) => {
    try {
      await api.put(`/admin/mark-payment/${productId}`);
      setMessage({ text: '✅ Payment marked as received! Product will appear on homepage.', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      fetchDashboardData();
    } catch (error) {
      setMessage({ text: `❌ Failed to mark payment: ${error.response?.data?.message || error.message}`, type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#c2185b] mb-8">Admin Dashboard</h1>

        {message.text && (
          <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700 border-l-4 border-green-500' : 'bg-red-100 text-red-700 border-l-4 border-red-500'}`}>
            {message.text}
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-md p-4">
              <Package size={24} className="text-[#c2185b] mb-2" />
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
              <p className="text-sm text-gray-600">Total Products</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <Clock size={24} className="text-yellow-500 mb-2" />
              <p className="text-2xl font-bold">{stats.pendingProducts}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <CheckCircle size={24} className="text-green-500 mb-2" />
              <p className="text-2xl font-bold">{stats.approvedProducts}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <Users size={24} className="text-blue-500 mb-2" />
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
              <p className="text-sm text-gray-600">Users</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <ShoppingBag size={24} className="text-purple-500 mb-2" />
              <p className="text-2xl font-bold">{stats.totalPurchases}</p>
              <p className="text-sm text-gray-600">Orders</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <DollarSign size={24} className="text-green-600 mb-2" />
              <p className="text-2xl font-bold">{stats.totalRevenue} ETB</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>
          </div>
        )}

        {/* Pending Products */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={24} className="text-yellow-500" />
            Pending Products ({pendingProducts.length})
          </h2>
          {pendingProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pending products to review</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingProducts.map(product => {
                const commission = product.price * 0.01;
                return (
                  <div key={product._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                    <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{product.title}</h3>
                      <p className="text-[#c2185b] font-bold">{product.price} ETB</p>
                      <p className="text-sm text-orange-600 font-semibold">Commission: {commission} ETB (1%)</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                      <p className="text-xs text-gray-500 mt-2">By: {product.ownerName}</p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleApprove(product)}
                          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition flex items-center justify-center gap-1"
                        >
                          <CheckCircle size={16} /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(product._id)}
                          className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition flex items-center justify-center gap-1"
                        >
                          <XCircle size={16} /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Products Awaiting Payment */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard size={24} className="text-orange-500" />
            Products Awaiting Payment
          </h2>
          {pendingProducts.filter(p => p.status === 'approved' && !p.paymentReceived).length === 0 ? (
            <p className="text-gray-500 text-center py-8">No products awaiting payment</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingProducts.filter(p => p.status === 'approved' && !p.paymentReceived).map(product => {
                const commission = product.price * 0.01;
                return (
                  <div key={product._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-yellow-50">
                    <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{product.title}</h3>
                      <p className="text-[#c2185b] font-bold">{product.price} ETB</p>
                      <p className="text-sm text-orange-600 font-semibold">Commission Due: {commission} ETB</p>
                      <button
                        onClick={() => handleMarkPaymentReceived(product._id)}
                        className="w-full mt-3 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition flex items-center justify-center gap-1"
                      >
                        <CreditCard size={16} /> Mark Payment Received
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users size={24} className="text-blue-500" />
            Registered Users ({users.length})
          </h2>
          {users.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No users found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-t">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.phone || '-'}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Purchases with 3% VAT */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ShoppingBag size={24} className="text-purple-500" />
            Recent Purchases (3% VAT Included)
          </h2>
          {purchases.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No purchases yet</p>
          ) : (
            <div className="space-y-3">
              {purchases.slice(0, 10).map(purchase => {
                const vat = purchase.total * 0.03;
                const totalWithVAT = purchase.total + vat;
                return (
                  <div key={purchase._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-pink-50">
                    <div className="flex items-center gap-3">
                      <img src={purchase.productImage} alt={purchase.productTitle} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="font-semibold">{purchase.productTitle}</p>
                        <p className="text-sm text-gray-600">By: {purchase.userName}</p>
                        <p className="text-xs text-gray-500">VAT (3%): {vat.toFixed(2)} ETB</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#c2185b]">{totalWithVAT.toFixed(2)} ETB</p>
                      <p className="text-xs text-gray-500">Qty: {purchase.quantity}</p>
                      <p className="text-xs text-gray-400">Subtotal: {purchase.total} ETB</p>
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

export default AdminDashboard;