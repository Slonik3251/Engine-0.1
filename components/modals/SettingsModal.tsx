
import React, { useState } from 'react';
import SidePanel from './SidePanel';
import { ThemeType } from '../../types';
import { Bell, Shield, Database, Globe, Cpu, Moon, Sun } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  theme: ThemeType;
  onSetTheme: (theme: ThemeType) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, theme, onSetTheme }) => {
  const [settings, setSettings] = useState([
    { id: 'heatmap', label: 'Отображение тепловой карты', icon: Database, active: false },
    { id: 'labels', label: 'Метки проблемных зон', icon: Bell, active: true },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <SidePanel title="Настройки системы" onClose={onClose} side="right">
      <div className="space-y-8 pb-10">
        <section className="space-y-4">
          <h3 className="text-slate-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest px-1 flex items-center gap-2">
            <Cpu className="w-3 h-3" /> Вычислительный кластер
          </h3>
          <div className="bg-slate-50 dark:bg-[#151515] p-5 rounded-2xl border border-slate-200 dark:border-[#222] space-y-4 shadow-sm transition-colors">
             <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-gray-300">Режим оптимизации ИИ</span>
                <span className="text-[10px] font-mono text-[#99FF00] bg-[#99FF00]/10 px-2 py-1 rounded">ULTRA_LOW_LATENCY</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-gray-300">Частота обновления данных</span>
                <span className="text-sm text-slate-900 dark:text-white font-mono">500ms</span>
             </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-slate-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest px-1 flex items-center gap-2">
            <Globe className="w-3 h-3" /> Интерфейс и тема
          </h3>
          <div className="space-y-2">
            {/* Theme Toggle */}
            <button 
              onClick={() => onSetTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-[#151515] rounded-2xl border border-slate-200 dark:border-[#222] hover:bg-slate-100 dark:hover:bg-[#1a1a1a] transition-all group shadow-sm"
            >
               <div className="flex items-center gap-3">
                 {theme === 'dark' ? <Moon className="w-4 h-4 text-[#99FF00]" /> : <Sun className="w-4 h-4 text-orange-500" />}
                 <span className="text-sm text-slate-600 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Темная тема оформления</span>
               </div>
               <div className={`w-10 h-5 rounded-full relative transition-colors shadow-inner ${theme === 'dark' ? 'bg-[#99FF00]' : 'bg-slate-300 dark:bg-[#222]'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-md transition-all ${theme === 'dark' ? 'left-[24px]' : 'left-[4px]'}`}></div>
               </div>
            </button>

            {settings.map((item) => (
              <button 
                key={item.id} 
                onClick={() => toggleSetting(item.id)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-[#151515] rounded-2xl border border-slate-200 dark:border-[#222] hover:bg-slate-100 dark:hover:bg-[#1a1a1a] transition-all group shadow-sm"
              >
                 <div className="flex items-center gap-3">
                   <item.icon className={`w-4 h-4 transition-colors ${item.active ? 'text-[#99FF00]' : 'text-slate-400 dark:text-gray-600 group-hover:text-slate-900 dark:group-hover:text-gray-400'}`} />
                   <span className="text-sm text-slate-600 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.label}</span>
                 </div>
                 <div className={`w-10 h-5 rounded-full relative transition-colors shadow-inner ${item.active ? 'bg-[#99FF00]' : 'bg-slate-300 dark:bg-[#222]'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-md transition-all ${item.active ? 'left-[24px]' : 'left-[4px]'}`}></div>
                 </div>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-slate-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest px-1 flex items-center gap-2">
            <Shield className="w-3 h-3" /> Безопасность
          </h3>
          <button className="w-full py-4 bg-slate-100 dark:bg-[#222] text-slate-700 dark:text-white font-bold rounded-2xl border border-slate-200 dark:border-[#333] hover:bg-slate-200 dark:hover:bg-[#333] transition-all text-xs uppercase tracking-widest active:scale-95 shadow-sm">
            Сбросить токены сессии
          </button>
          <button className="w-full py-4 bg-red-500/10 text-red-600 dark:text-red-500 font-bold rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition-all text-xs uppercase tracking-widest active:scale-95 shadow-sm">
            Удалить все локальные данные
          </button>
        </section>

        <div className="pt-6 border-t border-slate-100 dark:border-[#222] text-center">
          <p className="text-[10px] text-slate-400 dark:text-gray-600 font-mono tracking-widest uppercase">SFE-MAGNITOGORSK-CORE: 53.4129N, 58.9298E</p>
        </div>
      </div>
    </SidePanel>
  );
};

export default SettingsModal;
