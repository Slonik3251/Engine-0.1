
import React from 'react';
import { LayoutGrid, Map as MapIcon, BarChart2, AlertTriangle, Settings, User } from 'lucide-react';
import { ModalType, ThemeType } from '../../types';

interface SidebarNavProps {
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  isAuthenticated: boolean;
  onOpenUser: () => void;
  theme: ThemeType;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ activeModal, setActiveModal, isAuthenticated, onOpenUser, theme }) => {
  const navItems = [
    { id: 'map', icon: MapIcon, label: 'Карта' },
    { id: 'analytics', icon: BarChart2, label: 'Аналитика' },
    { id: 'problems', icon: AlertTriangle, label: 'Проблемы' },
    { id: 'upload', icon: LayoutGrid, label: 'Данные' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-20 h-full bg-white dark:bg-[#050505] border-r border-slate-200 dark:border-[#222] flex-col items-center py-8 z-[110] transition-colors duration-300">
        {/* Logo */}
        <div className="mb-12 cursor-pointer group" onClick={() => setActiveModal(null)}>
          <div className="w-12 h-12 bg-[#99FF00] rounded-2xl flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-lg">
            <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">
              <MapIcon className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        {/* Primary Nav */}
        <nav className="flex-1 space-y-4">
          {navItems.map((item) => {
            const isActive = activeModal === item.id || (item.id === 'map' && activeModal === null);
            return (
              <button
                key={item.id}
                onClick={() => setActiveModal(item.id === 'map' ? null : item.id as ModalType)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all relative group ${
                  isActive 
                    ? 'bg-[#99FF00] text-black shadow-[0_0_20px_rgba(153,255,0,0.2)]' 
                    : 'text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
                title={item.label}
              >
                <item.icon className="w-6 h-6" />
                <span className="absolute left-full ml-4 px-2 py-1 bg-slate-900 dark:bg-[#222] text-white text-[10px] uppercase font-bold tracking-widest rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[120] whitespace-nowrap shadow-xl border border-slate-800 dark:border-[#333]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer Nav */}
        <div className="space-y-4">
          <button 
            onClick={() => setActiveModal('settings')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              activeModal === 'settings' 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg' 
                : 'text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Настройки"
          >
            <Settings className="w-6 h-6" />
          </button>
          <button 
            onClick={onOpenUser}
            className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
              isAuthenticated 
                ? 'border-[#99FF00] shadow-[0_0_15px_rgba(153,255,0,0.3)]' 
                : 'border-slate-300 dark:border-gray-700 hover:border-slate-400 dark:hover:border-gray-500'
            }`}
            title="Профиль"
          >
            <div className="w-full h-full bg-slate-100 dark:bg-[#222] flex items-center justify-center text-slate-900 dark:text-white transition-colors">
              <User className="w-5 h-5" />
            </div>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-[#222] z-[110] flex items-center justify-around px-2 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => {
          const isActive = activeModal === item.id || (item.id === 'map' && activeModal === null);
          return (
            <button
              key={item.id}
              onClick={() => setActiveModal(item.id === 'map' ? null : item.id as ModalType)}
              className={`flex flex-col items-center justify-center w-14 h-full transition-all ${
                isActive ? 'text-[#99FF00]' : 'text-slate-400 dark:text-gray-600'
              }`}
            >
              <div className={`p-2 rounded-lg ${isActive ? 'bg-[#99FF00]/10' : ''}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[8px] uppercase font-bold tracking-widest mt-0.5">{item.label}</span>
            </button>
          );
        })}
        <button 
          onClick={() => setActiveModal('settings')}
          className={`flex flex-col items-center justify-center w-14 h-full transition-all ${
            activeModal === 'settings' ? 'text-[#99FF00]' : 'text-slate-400 dark:text-gray-600'
          }`}
        >
          <div className={`p-2 rounded-lg ${activeModal === 'settings' ? 'bg-[#99FF00]/10' : ''}`}>
            <Settings className="w-5 h-5" />
          </div>
          <span className="text-[8px] uppercase font-bold tracking-widest mt-0.5">Опции</span>
        </button>
        <button 
          onClick={onOpenUser}
          className={`flex flex-col items-center justify-center w-14 h-full transition-all ${
            isAuthenticated ? 'text-[#99FF00]' : 'text-slate-400 dark:text-gray-600'
          }`}
        >
          <div className={`p-1 rounded-full border ${isAuthenticated ? 'border-[#99FF00]' : 'border-slate-300 dark:border-gray-700'}`}>
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-[#222] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[8px] uppercase font-bold tracking-widest mt-0.5">Профиль</span>
        </button>
      </nav>
    </>
  );
};

export default SidebarNav;
