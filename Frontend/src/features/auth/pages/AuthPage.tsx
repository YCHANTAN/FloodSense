import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, setStatus } from '../authSlice';
import { login, register } from '../services/authApi';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    dispatch(setStatus('loading'));

    try {
      let response;
      if (isLogin) {
        response = await login({ email, password });
      } else {
        response = await register({ name, email, password });
      }
      
      dispatch(setCredentials(response));
      dispatch(setStatus('idle'));
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
      dispatch(setStatus('failed'));
    }
  };

  return (
    <div className="min-h-screen bg-deep-slate flex flex-col items-center justify-center p-4 relative">
      {/* Standardized Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Button 
          variant="secondary" 
          className="p-3 rounded-xl shadow-lg bg-[#1e293b]/80 backdrop-blur-md border border-white/10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="text-white" />
        </Button>
      </div>

      {/* Branding */}
      <div className="mb-8 cursor-pointer" onClick={() => navigate('/')}>
        <Logo className="scale-125" />
      </div>

      <div className="w-full max-w-md bg-muted-navy rounded-3xl p-8 border border-white/5 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-off-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join FloodSense'}
          </h1>
          <p className="text-cool-gray font-sans">
            {isLogin ? 'Secure your community today.' : 'Help us map real-time flood data.'}
          </p>
        </div>

        {error && (
          <div className="bg-brickwood-crimson/10 border border-brickwood-crimson/50 text-brickwood-crimson p-4 rounded-xl mb-6 text-sm text-center font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <Input
              label="Full Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Cebu Resident"
            />
          )}

          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="resident@floodsense.dev"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          {!isLogin && (
            <Input
              label="Confirm Password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          )}

          <Button type="submit" className="w-full h-12 text-lg">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-vivid-cyan hover:underline text-sm font-medium font-sans"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>

      <p className="mt-8 text-cool-gray text-xs font-sans">
        Protecting Cebu City, one report at a time.
      </p>
    </div>
  );
};

export default AuthPage;
