import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  setView: (view: 'validator' | 'pricing') => void;
}

const Header: React.FC<HeaderProps> = ({ setView }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-gray-800/70 backdrop-blur-md sticky top-0 z-20 border-b border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer"
          onClick={() => setView('validator')}
        >
          AI Validator
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            <span className="font-semibold text-cyan-400">{user.usesRemaining}</span> uses remaining
          </div>
          {user.plan === 'free' && (
             <button
                onClick={() => setView('pricing')}
                className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-md hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
             >
                Upgrade
            </button>
          )}
          <div className="text-sm text-gray-400 hidden sm:block">{user.email}</div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
