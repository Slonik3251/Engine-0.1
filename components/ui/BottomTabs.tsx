
import React from 'react';
import { Grid, CloudUpload, Map as MapIcon, User, LayoutGrid } from 'lucide-react';
import { ModalType } from '../../types';

interface BottomTabsProps {
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ activeModal, setActiveModal }) => {
  const tabs = [
    { id: 'analytics', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'upload', icon: CloudUpload, label: 'Upload' },
    { id: 'map', icon: MapIcon, label: 'Map' },
    { id: 'user', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] px-6 pb-6 pointer-events-none">
       <div className="w-full max-w-lg mx-auto h-20 bg-[#121212] border-t-2 border-[#99FF00] rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex items-center justify-around px-8 pointer-events-auto overflow-hidden">
          {tabs.map(tab => {
            const isActive = activeModal === tab.id || (tab.id === 'map' && activeModal === null);
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveModal(tab.id === 'map' ? null : tab.id as ModalType)}
                className={`relative flex flex-col items-center justify-center gap-1 transition-all group ${
                  isActive ? 'text-[#99FF00]' : 'text-gray-600'
                }`}
              >
                {isActive && (
                  <div className="absolute -top-4 w-12 h-12 bg-[#99FF00]/10 rounded-full blur-xl animate-pulse"></div>
                )}
                <div className={`p-3 rounded-2xl transition-all ${
                  isActive ? 'bg-[#99FF00] text-black shadow-[0_0_20px_rgba(153,255,0,0.4)]' : 'hover:bg-white/5'
                }`}>
                  <tab.icon className={`w-6 h-6 transition-transform group-active:scale-90`} />
                </div>
              </button>
            );
          })}
       </div>
    </div>
  );
};

export default BottomTabs;
