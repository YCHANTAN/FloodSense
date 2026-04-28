import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Waves, Menu, X } from 'lucide-react';
import { RootState } from '@/app/store';
import { logout } from '@/features/auth/authSlice';
import Button from '../Button/Button';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: 'Live Map', href: '/map' },
    { label: 'Submit Report', href: '/report' },
    { label: 'Risk Alerts', href: '#' },
    { label: 'About', href: '#' },
    { label: 'FAQs', href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6 md:py-6 transition-all duration-300 bg-deep-slate/80 backdrop-blur-lg border-b border-white/5 md:bg-transparent md:backdrop-blur-none md:border-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group z-50" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-vivid-cyan p-1.5 rounded-lg transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-vivid-cyan/20">
            <Waves className="text-deep-slate w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="font-display text-lg md:text-xl font-bold text-off-white tracking-tight">
            Flood<span className="text-vivid-cyan">Sense</span>
          </span>
        </Link>

        {/* Desktop Navigation Links - Glass Capsule */}
        <div className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-2.5 rounded-full shadow-2xl">
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              to={link.href} 
              className="font-sans text-sm font-medium text-off-white/80 hover:text-vivid-cyan transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-4">
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

          <button 
            className="md:hidden p-2 text-off-white hover:text-vivid-cyan transition-colors z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`fixed inset-0 bg-deep-slate z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.label}
            to={link.href} 
            className="font-display text-2xl font-bold text-off-white hover:text-vivid-cyan transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-4 flex flex-col items-center gap-4 w-full px-10">
          {token ? (
            <Button 
              className="w-full py-4 text-lg"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button 
                variant="secondary" 
                className="w-full py-4 text-lg"
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button 
                className="w-full py-4 text-lg"
                onClick={() => {
                  navigate('/map');
                  setIsMenuOpen(false);
                }}
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
