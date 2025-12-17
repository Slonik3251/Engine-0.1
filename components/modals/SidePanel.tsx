
import React from 'react';
import { X } from 'lucide-react';

interface SidePanelProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
  width?: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ 
  title, 
  onClose, 
  children, 
  side = 'right',
  width = 'max-w-md'
}) => {
  const sideClasses = side === 'right' ? 'right-0 border-l' : 'left-0 border-r';
  const animationClass = side === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left';

  return (
    <div className={`fixed inset-y-0 ${sideClasses} ${width} w-full z-[150] bg-white/95 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-slate-200 dark:border-[#222] shadow-2xl flex flex-col ${animationClass} transition-colors duration-300 pb-16 md:pb-0`}>
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right { animation: slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-slide-in-left { animation: slide-in-left 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-[#222]">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <div className="w-1 h-5 bg-[#99FF00] rounded-full"></div>
          {title}
        </h2>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        {children}
      </div>
    </div>
  );
};

export default SidePanel;
