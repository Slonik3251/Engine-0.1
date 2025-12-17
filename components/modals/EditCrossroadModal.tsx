
import React from 'react';
import SidePanel from './SidePanel';
import { Crossroad } from '../../types';
import { RefreshCw, Car, User as UserIcon, ShieldCheck, Clock } from 'lucide-react';

interface EditCrossroadModalProps {
  crossroad: Crossroad;
  onClose: () => void;
  onUpdatePhase: (lightId: string, val: number) => void;
}

const EditCrossroadModal: React.FC<EditCrossroadModalProps> = ({ crossroad, onClose, onUpdatePhase }) => {
  return (
    <SidePanel title={crossroad.name} onClose={onClose} side="right">
      <div className="space-y-6 pb-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#99FF00]/10 border border-[#99FF00]/20 rounded-full w-fit">
           <ShieldCheck className="w-3 h-3 text-[#99FF00]" />
           <span className="text-[10px] text-[#99FF00] font-bold uppercase tracking-widest">Online</span>
        </div>

        {/* Mini Preview */}
        <div className="w-full aspect-video bg-slate-100 dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-[#222] flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
             <div className="w-full h-12 bg-gray-500 absolute"></div>
             <div className="w-12 h-full bg-gray-500 absolute"></div>
          </div>
          <div className="w-12 h-12 bg-[#99FF00] rounded-full shadow-[0_0_30px_rgba(153,255,0,0.2)] z-10 animate-pulse"></div>
          <div className="absolute top-3 left-3 flex gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-gray-700"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-gray-700"></div>
          </div>
          <span className="absolute bottom-2 right-3 text-[8px] text-slate-400 dark:text-gray-600 font-mono tracking-tighter">REF_{crossroad.id}</span>
        </div>

        {/* Traffic Light Control */}
        <section className="space-y-3">
          <h3 className="text-slate-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest px-1">Фазы светофоров</h3>
          <div className="space-y-2">
            {crossroad.trafficLights.map((light) => (
              <div key={light.id} className="bg-slate-50 dark:bg-[#151515] p-4 rounded-xl border border-slate-200 dark:border-[#222] hover:border-[#99FF00]/20 transition-colors group">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#222] border border-slate-200 dark:border-transparent flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5 text-[#99FF00]" />
                    </div>
                    <span className="text-slate-900 dark:text-white font-bold text-xs">{light.direction}</span>
                  </div>
                  <span className="text-[#99FF00] font-bold font-mono text-lg">{light.phase}s</span>
                </div>
                
                <div className="grid grid-cols-4 gap-1.5">
                  <button 
                    onClick={() => onUpdatePhase(light.id, Math.max(0, light.phase - 5))}
                    className="py-1.5 bg-white dark:bg-[#222] border border-slate-200 dark:border-transparent hover:bg-slate-100 dark:hover:bg-[#333] text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white rounded-lg text-[10px] font-bold transition-all active:scale-95 shadow-sm"
                  >
                    -5
                  </button>
                  <button 
                    onClick={() => onUpdatePhase(light.id, Math.max(0, light.phase - 1))}
                    className="py-1.5 bg-white dark:bg-[#222] border border-slate-200 dark:border-transparent hover:bg-slate-100 dark:hover:bg-[#333] text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white rounded-lg text-[10px] font-bold transition-all active:scale-95 shadow-sm"
                  >
                    -1
                  </button>
                  <button 
                    onClick={() => onUpdatePhase(light.id, light.phase + 1)}
                    className="py-1.5 bg-white dark:bg-[#222] border border-slate-200 dark:border-transparent hover:bg-slate-100 dark:hover:bg-[#333] text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white rounded-lg text-[10px] font-bold transition-all active:scale-95 shadow-sm"
                  >
                    +1
                  </button>
                  <button 
                    onClick={() => onUpdatePhase(light.id, light.phase + 5)}
                    className="py-1.5 bg-white dark:bg-[#222] border border-slate-200 dark:border-transparent hover:bg-slate-100 dark:hover:bg-[#333] text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white rounded-lg text-[10px] font-bold transition-all active:scale-95 shadow-sm"
                  >
                    +5
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lane Occupancy */}
        <section className="space-y-3">
          <h3 className="text-slate-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest px-1">Загруженность</h3>
          <div className="bg-slate-50 dark:bg-[#151515] rounded-xl border border-slate-200 dark:border-[#222] divide-y divide-slate-200 dark:divide-[#222]">
            {crossroad.roads.map(road => (
              <div key={road.id} className="p-3 flex items-center justify-between group cursor-default">
                <div className="flex-1 mr-4">
                  <p className="text-slate-900 dark:text-white text-[11px] font-bold group-hover:text-[#99FF00] transition-colors truncate">{road.name}</p>
                  <div className="flex gap-2 mt-0.5 opacity-60">
                    <span className="text-[9px] font-mono flex items-center gap-1">
                      <Car className="w-2.5 h-2.5" /> {road.carCount}
                    </span>
                    <span className="text-[9px] font-mono flex items-center gap-1">
                      <UserIcon className="w-2.5 h-2.5" /> {road.pedestrianCount}
                    </span>
                  </div>
                </div>
                <div className="w-16 h-1 bg-slate-200 dark:bg-[#222] rounded-full overflow-hidden">
                   <div 
                    className={`h-full transition-all duration-1000 ${road.carCount > 150 ? 'bg-red-500' : 'bg-[#99FF00]'}`}
                    style={{ width: `${Math.min(100, (road.carCount / 200) * 100)}%` }}
                   ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-4 border-t border-slate-100 dark:border-[#222] flex gap-2">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-[#99FF00] text-black font-black rounded-xl hover:brightness-110 transition-all active:scale-95 uppercase text-[10px] tracking-widest shadow-md"
          >
            Применить
          </button>
          <button className="p-3 bg-slate-100 dark:bg-[#222] border border-slate-200 dark:border-transparent text-slate-700 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-[#333] transition-all active:scale-95 shadow-sm">
             <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </SidePanel>
  );
};

export default EditCrossroadModal;
