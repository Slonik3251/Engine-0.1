
import React from 'react';
import { Search, User, LogIn, BarChart2, Menu } from 'lucide-react';

interface NavigationBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isAuthenticated: boolean;
  userName?: string;
  onOpenLogin: () => void;
  onOpenUser: () => void;
  onOpenAnalytics: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  isAuthenticated, 
  userName,
  onOpenLogin,
  onOpenUser,
  onOpenAnalytics
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[50] p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl h-16 bg-[#121212]/80 backdrop-blur-md border border-[#222] rounded-2xl shadow-xl px-4 flex items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#99FF00] transition-colors" />
          <input 
            type="text" 
            placeholder="Поиск перекрестка..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#222] rounded-xl py-2 pl-12 pr-4 text-white focus:outline-none focus:border-[#99FF00]/50 transition-all"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          <button 
            onClick={onOpenAnalytics}
            className="flex items-center gap-2 px-4 py-2 hover:bg-[#222] rounded-xl text-gray-400 hover:text-white transition-all"
          >
            <BarChart2 className="w-5 h-5" />
            <span className="text-sm font-medium">Аналитика</span>
          </button>
        </div>

        {/* Auth Button */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button 
              onClick={onOpenUser}
              className="flex items-center gap-2 px-4 py-2 bg-[#99FF00]/10 border border-[#99FF00]/20 rounded-xl text-[#99FF00] font-medium hover:bg-[#99FF00]/20 transition-all"
            >
              <User className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">{userName}</span>
            </button>
          ) : (
            <button 
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-6 py-2 bg-[#222] border border-[#333] rounded-xl text-white font-bold hover:bg-[#333] transition-all"
            >
              <LogIn className="w-5 h-5" />
              <span className="text-sm">Войти</span>
            </button>
          )}
          <button className="p-2 hover:bg-[#222] rounded-xl md:hidden text-gray-500">
             <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Visual Accent Line */}
      <div className="w-[90%] h-[2px] bg-gradient-to-r from-transparent via-[#99FF00] to-transparent mt-2 opacity-50 shadow-[0_0_10px_rgba(153,255,0,0.5)]"></div>
    </nav>
  );
};

export default NavigationBar;
