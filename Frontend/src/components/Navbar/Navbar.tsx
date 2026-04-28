import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Waves } from 'lucide-react';
import { RootState } from '@/app/store';
import { logout } from '@/features/auth/authSlice';
import Button from '../Button/Button';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-vivid-cyan p-1.5 rounded-lg transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-vivid-cyan/20">
            <Waves className="text-deep-slate w-6 h-6" />
          </div>
          <span className="font-display text-xl font-bold text-off-white tracking-tight">
            Flood<span className="text-vivid-cyan">Sense</span>
          </span>
        </Link>

        {/* Navigation Links - Glass Capsule */}
        <div className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-2.5 rounded-full shadow-2xl">
          <Link to="/map" className="font-sans text-sm font-medium text-off-white/80 hover:text-vivid-cyan transition-colors">
            Live Map
          </Link>
          <Link to="/report" className="font-sans text-sm font-medium text-off-white/80 hover:text-vivid-cyan transition-colors">
            Submit Report
          </Link>
          <Link to="#" className="font-sans text-sm font-medium text-off-white/80 hover:text-vivid-cyan transition-colors">
            Risk Alerts
          </Link>
          <Link to="#" className="font-sans text-sm font-medium text-off-white/80 hover:text-vivid-cyan transition-colors">
            About
          </Link>
          <Link to="#" className="font-sans text-sm font-medium text-off-white/80 hover:text-vivid-cyan transition-colors">
            FAQs
          </Link>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          {token ? (
            <Button 
              variant="secondary" 
              className="bg-transparent border-transparent hover:bg-white/5 hover:border-off-white/20 px-6 py-2 text-sm transition-all duration-500"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button 
                variant="secondary" 
                className="hidden sm:flex px-4 py-2 text-sm"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                className="px-5 py-2 text-sm rounded-full"
                onClick={() => navigate('/map')}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
