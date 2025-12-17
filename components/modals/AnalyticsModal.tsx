
import React, { useState, useMemo } from 'react';
import SidePanel from './SidePanel';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TRAFFIC_DATA, WEEKLY_DATA } from '../../constants';
import { Download, PieChart, TrendingUp, Info, Clock } from 'lucide-react';

interface AnalyticsModalProps {
  onClose: () => void;
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ onClose }) => {
  const [timeRange, setTimeRange] = useState(12);

  // Фильтрация данных на основе положения ползунка для визуального фидбека
  const displayData = useMemo(() => {
    const limit = Math.floor((timeRange / 24) * TRAFFIC_DATA.length);
    return TRAFFIC_DATA.slice(0, Math.max(2, limit));
  }, [timeRange]);

  return (
    <SidePanel title="Глобальная аналитика" onClose={onClose} side="left" width="max-w-xl">
      <div className="space-y-8 pb-10">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-[#151515] p-4 rounded-2xl border border-slate-200 dark:border-[#222] transition-colors">
            <TrendingUp className="w-4 h-4 text-[#99FF00] mb-2" />
            <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase font-bold">Эффективность</p>
            <p className="text-2xl font-mono text-slate-900 dark:text-white">{(90 + (timeRange % 10)).toFixed(1)}%</p>
          </div>
          <div className="bg-slate-50 dark:bg-[#151515] p-4 rounded-2xl border border-slate-200 dark:border-[#222] transition-colors">
            <TrendingUp className="w-4 h-4 text-blue-500 mb-2 rotate-90" />
            <p className="text-[10px] text-slate-400 dark:text-gray-500 uppercase font-bold">Сред. задержка</p>
            <p className="text-2xl font-mono text-slate-900 dark:text-white">{(10 + (timeRange / 2)).toFixed(1)} <span className="text-xs">сек</span></p>
          </div>
        </div>

        {/* Time Interval Selector */}
        <section className="bg-slate-50 dark:bg-[#151515] p-5 rounded-3xl border border-slate-200 dark:border-[#222] transition-colors shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-3 h-3" /> Временной интервал
            </h3>
            <Info className="w-3 h-3 text-slate-300 dark:text-gray-600" />
          </div>
          
          <div className="mb-6">
            <p className="text-xs text-slate-500 dark:text-gray-400 mb-2 font-medium">Диапазон прогнозирования:</p>
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-mono font-bold text-lg bg-white dark:bg-[#0A0A0A] w-fit px-4 py-2 rounded-xl border border-slate-200 dark:border-[#222]">
              <span>0:00</span>
              <span className="text-slate-300 dark:text-gray-700">→</span>
              <span className="text-[#99FF00]">{timeRange}:00</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
             <input 
              type="range" 
              min="1" 
              max="24" 
              step="1"
              value={timeRange}
              onChange={(e) => setTimeRange(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#99FF00] active:scale-[1.01] transition-transform"
            />
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-gray-500 font-mono font-bold">
              <span>СТАРТ (0:00)</span>
              <span>ФИНИШ (24:00)</span>
            </div>
          </div>
        </section>

        {/* Intensity Chart */}
        <section className="bg-slate-50 dark:bg-[#151515] p-5 rounded-3xl border border-slate-200 dark:border-[#222] transition-colors shadow-sm">
          <h3 className="text-slate-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Интенсивность движения (Live)</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayData}>
                <defs>
                  <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#99FF00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#99FF00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '12px', fontSize: '10px' }}
                  itemStyle={{ color: '#99FF00' }}
                  cursor={{ stroke: '#333', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="intensity" stroke="#99FF00" strokeWidth={2} fillOpacity={1} fill="url(#colorIntensity)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Weekly Activity */}
        <section className="bg-slate-50 dark:bg-[#151515] p-5 rounded-3xl border border-slate-200 dark:border-[#222] transition-colors shadow-sm">
          <h3 className="text-slate-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Статистика по дням недели</h3>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA}>
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                   {WEEKLY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.count > 15000 ? '#99FF00' : '#333'} />
                  ))}
                </Bar>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Export Options */}
        <section className="pt-4 border-t border-slate-200 dark:border-[#222]">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 p-4 bg-slate-100 dark:bg-[#222] hover:bg-slate-200 dark:hover:bg-[#333] transition-colors rounded-2xl text-slate-700 dark:text-white font-bold text-sm">
              <Download className="w-4 h-4 text-[#99FF00]" />
              EXCEL
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-[#99FF00] text-black font-bold rounded-2xl hover:brightness-110 transition-colors text-sm">
              <PieChart className="w-4 h-4" />
              AI REPORT
            </button>
          </div>
        </section>
      </div>
    </SidePanel>
  );
};

export default AnalyticsModal;
