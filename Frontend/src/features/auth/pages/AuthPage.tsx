import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, setStatus } from '../authSlice';
import { login, register } from '../services/authApi';
import Button from '@/components/Button/Button';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    dispatch(setStatus('loading'));

    // Bypassing API calls for immediate access
    setTimeout(() => {
      const mockResponse = {
        user: {
          id: 'mock-123',
          email: email || 'resident@floodsense.dev',
          name: name || 'Cebu Resident',
        },
        token: 'mock-dev-token',
      };
      
      dispatch(setCredentials(mockResponse));
      dispatch(setStatus('idle'));
      navigate('/');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md bg-[#1e293b] rounded-3xl p-8 border border-slate-700 shadow-2xl">
        <h1 className="text-3xl font-poppins font-bold text-white mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Join FloodSense'}
        </h1>
        <p className="text-slate-400 text-center mb-8">
          {isLogin ? 'Secure your community today.' : 'Help us map real-time flood data.'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#06b6d4] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full h-12">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#06b6d4] hover:underline text-sm font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
