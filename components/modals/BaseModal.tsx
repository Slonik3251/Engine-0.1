
import React from 'react';
import { X, ChevronLeft } from 'lucide-react';

interface BaseModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  showBack?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({ title, onClose, children, showBack = true }) => {
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md h-[90vh] bg-[#121212] rounded-[40px] border border-[#222] shadow-2xl flex flex-col overflow-hidden m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#222]">
          <div className="flex items-center gap-4">
            {showBack && (
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}
            <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
