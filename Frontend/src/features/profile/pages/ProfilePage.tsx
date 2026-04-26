import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/app/store';
import { logout } from '@/features/auth/authSlice';
import Button from '@/components/Button/Button';
import { User, Mail, History, LogOut, ChevronLeft } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-inter p-6">
      {/* Header */}
      <div className="flex items-center mb-10">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors mr-2"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-poppins font-bold">My Profile</h1>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* User Card */}
        <div className="bg-[#1e293b] rounded-3xl p-8 border border-slate-700 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-[#06b6d4]/20 rounded-full flex items-center justify-center mb-4">
              <User size={48} className="text-[#06b6d4]" />
            </div>
            <h2 className="text-xl font-poppins font-bold text-slate-50">{user?.name || 'Resident'}</h2>
            <div className="flex items-center text-slate-400 text-sm mt-1">
              <Mail size={14} className="mr-2" />
              {user?.email || 'email@example.com'}
            </div>
          </div>
        </div>

        {/* History Placeholder */}
        <div className="bg-[#1e293b] rounded-3xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <History size={20} className="text-[#06b6d4]" />
            <h3 className="text-lg font-poppins font-semibold">Report History</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 text-center">
              <p className="text-slate-500 text-sm">No recent reports submitted.</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <Button 
          variant="secondary" 
          className="w-full h-14 border-red-500/20 text-red-500 hover:bg-red-500/10"
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
