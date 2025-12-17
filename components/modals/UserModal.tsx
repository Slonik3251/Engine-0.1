
import React, { useState } from 'react';
import SidePanel from './SidePanel';
import { User as UserType } from '../../types';
import { Mail, Phone, LogOut, ChevronRight, Upload, Shield, Bell } from 'lucide-react';

interface UserModalProps {
  user: UserType;
  onClose: () => void;
  onLogout: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onLogout }) => {
  const [notifications, setNotifications] = useState([
    { id: 'crit', label: 'Критические инциденты', enabled: true },
    { id: 'opt', label: 'Отчеты оптимизации', enabled: true },
    { id: 'sys', label: 'Системные обновления', enabled: false },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  return (
    <SidePanel title="Центр управления" onClose={onClose}>
      <div className="space-y-8 pb-6">
        {/* User Card */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0A0A0A] p-6 rounded-[32px] border border-[#222] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#99FF00]/5 rounded-full blur-3xl"></div>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-[#222] rounded-2xl border border-[#333] flex items-center justify-center text-2xl font-black text-[#99FF00] shadow-[0_0_20px_rgba(153,255,0,0.1)]">
              {user.name[0]}
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">{user.name} {user.surname}</p>
              <p className="text-[#99FF00] text-[10px] font-mono uppercase tracking-widest mt-1">Senior Traffic Engineer</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
             <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#99FF00] shadow-[0_0_8px_#99FF00]"></div>
                  <span className="text-white font-mono text-xs">Active</span>
                </div>
             </div>
             <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Access</p>
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-blue-500" />
                  <span className="text-white font-mono text-xs">Level 4</span>
                </div>
             </div>
          </div>
        </div>

        {/* System Settings Section */}
        <section className="space-y-3">
          <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-1 flex items-center gap-2">
            <Bell className="w-3 h-3" /> Уведомления
          </h3>
          <div className="space-y-2">
            {notifications.map((setting) => (
              <button 
                key={setting.id} 
                onClick={() => toggleNotification(setting.id)}
                className="w-full flex items-center justify-between p-4 bg-[#151515] rounded-2xl border border-[#222] hover:bg-[#1a1a1a] transition-all group"
              >
                 <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{setting.label}</span>
                 <div className={`w-10 h-5 rounded-full relative transition-colors shadow-inner ${setting.enabled ? 'bg-[#99FF00]' : 'bg-[#222]'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-md transition-all ${setting.enabled ? 'left-[24px]' : 'left-[4px]'}`}></div>
                 </div>
              </button>
            ))}
          </div>
        </section>

        {/* Contact info list */}
        <div className="space-y-4 px-1">
          <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-pointer group">
             <div className="w-10 h-10 rounded-xl bg-[#222] flex items-center justify-center group-hover:bg-[#99FF00] group-hover:text-black transition-colors shadow-lg">
               <Mail className="w-4 h-4" />
             </div>
             <span className="text-sm font-medium">{user.email}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-pointer group">
             <div className="w-10 h-10 rounded-xl bg-[#222] flex items-center justify-center group-hover:bg-[#99FF00] group-hover:text-black transition-colors shadow-lg">
               <Phone className="w-4 h-4" />
             </div>
             <span className="text-sm font-medium">{user.phone}</span>
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full mt-auto py-4 bg-red-500/5 text-red-500 font-bold rounded-2xl border border-red-500/10 hover:bg-red-500/10 transition-all uppercase text-[10px] tracking-[4px] active:scale-[0.98]"
        >
          Terminate Session
        </button>
      </div>
    </SidePanel>
  );
};

export default UserModal;
