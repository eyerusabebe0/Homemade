import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      const nameRegex = /^[A-Za-z\s]*$/;
      if (nameRegex.test(value) || value === '') {
        setFormData({ ...formData, [name]: value });
      }
    }
    else if (name === 'phone') {
      const phoneRegex = /^\d*$/;
      if (phoneRegex.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.name || !formData.email || !formData.password) {
      setError("❌ Please fill all required fields");
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      setError("❌ Name must contain only letters and spaces");
      return;
    }

    if (formData.password.length < 6) {
      setError("❌ Password must be at least 6 characters");
      return;
    }

    if (formData.phone && formData.phone.length !== 10) {
      setError("❌ Phone number must be exactly 10 digits");
      return;
    }

    setLoading(true);

    const result = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.phone
    );

    if (result.success) {
      setSuccess("✅ Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setError(`❌ ${result.message || "Signup failed"}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 py-12 px-4">
      <div className="bg-white shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#c2185b]">Create Account</h2>
          <p className="text-gray-600 mt-2">Join ArasBaby today</p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
                style={{ 
                  borderRadius: 0,
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  WebkitTextFillColor: '#000000'
                }}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
                style={{ 
                  borderRadius: 0,
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  WebkitTextFillColor: '#000000'
                }}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
                style={{ 
                  borderRadius: 0,
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  WebkitTextFillColor: '#000000'
                }}
                placeholder="Enter 10 digit phone number"
                maxLength="10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Optional - Must be exactly 10 digits</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c2185b]"
                style={{ 
                  borderRadius: 0,
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  WebkitTextFillColor: '#000000'
                }}
                placeholder="Create a password (min. 6 characters)"
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#c2185b] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;