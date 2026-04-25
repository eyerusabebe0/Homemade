import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // validation
    if (!email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setError(result.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 py-12 px-4">
      <div className="bg-white shadow-xl max-w-md w-full p-8" style={{ borderRadius: 0 }}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#c2185b]">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Login to your account</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 mb-4" style={{ borderRadius: 0 }}>
            <span className="font-bold">Error!</span> {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-500 text-green-700 px-4 py-3 mb-4" style={{ borderRadius: 0 }}>
            <span className="font-bold">Success!</span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border !text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
                style={{ borderRadius: 0 }}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full !text-black  pl-10 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
                style={{ borderRadius: 0 }}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c2185b] text-white py-3 font-semibold hover:bg-pink-700 transition disabled:opacity-50"
            style={{ borderRadius: 0 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/" className="text-[#c2185b] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;