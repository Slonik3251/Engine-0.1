
import React, { useState } from 'react';
import SidePanel from './SidePanel';
import { Upload, File, CheckCircle, AlertCircle, MapPin, Database, Server } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

  const handleUpload = () => {
    if (!file) return;
    setStatus('uploading');
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <SidePanel title="Импорт данных" onClose={onClose}>
      <div className="space-y-8 pb-10">
        <div className="bg-[#151515] p-6 rounded-[32px] border border-[#222] border-dashed flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-[#222] rounded-full flex items-center justify-center mb-4">
              <Database className="w-8 h-8 text-[#99FF00]" />
           </div>
           <h4 className="text-white font-bold mb-2">Архив трафика</h4>
           <p className="text-xs text-gray-500 mb-6">Поддерживаемые форматы: .CSV, .JSON, .LOG. Максимальный размер 50MB.</p>
           
           <label className="w-full py-4 bg-[#222] hover:bg-[#333] text-white font-bold rounded-2xl cursor-pointer transition-colors block">
              <input 
                type="file" 
                className="hidden" 
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setStatus('idle');
                }}
              />
              {file ? 'ИЗМЕНИТЬ ФАЙЛ' : 'ВЫБРАТЬ ФАЙЛ'}
           </label>
        </div>

        {file && (
          <section className="animate-in slide-in-from-top-4 duration-300">
            <div className="bg-[#151515] p-5 rounded-2xl border border-[#222] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <File className="w-4 h-4 text-[#99FF00]" />
                  <span className="text-white text-sm font-mono truncate max-w-[150px]">{file.name}</span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">{(file.size / 1024).toFixed(1)} KB</span>
              </div>
              
              {status === 'uploading' && (
                <div className="space-y-2">
                  <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-[#99FF00] animate-[loading_2s_ease-in-out_infinite]"></div>
                  </div>
                  <style>{`
                    @keyframes loading {
                      0% { width: 0; }
                      100% { width: 100%; }
                    }
                  `}</style>
                  <p className="text-[10px] text-[#99FF00] font-bold uppercase text-center animate-pulse">Syncing with cluster...</p>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center justify-center gap-2 py-2">
                  <CheckCircle className="w-4 h-4 text-[#99FF00]" />
                  <span className="text-[#99FF00] text-xs font-bold uppercase">Data Indexed Successfully</span>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="bg-[#151515] p-5 rounded-2xl border border-[#222]">
          <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">Назначение</h3>
          <div className="flex items-center gap-4 p-4 bg-[#0A0A0A] rounded-xl border border-[#222]">
             <Server className="w-5 h-5 text-blue-500" />
             <div className="flex-1">
                <p className="text-white text-xs font-bold">Node: EUROPE_MSK_1</p>
                <p className="text-[10px] text-gray-500">Latency: 14ms</p>
             </div>
             <div className="w-2 h-2 rounded-full bg-[#99FF00] shadow-[0_0_10px_#99FF00]"></div>
          </div>
        </section>

        <button 
          onClick={handleUpload}
          disabled={!file || status !== 'idle'}
          className={`w-full py-5 font-black rounded-[24px] transition-all active:scale-95 text-xs tracking-[5px] uppercase ${
            !file || status !== 'idle' 
              ? 'bg-[#222] text-gray-600 cursor-not-allowed' 
              : 'bg-[#99FF00] text-black shadow-[0_0_30px_rgba(153,255,0,0.2)]'
          }`}
        >
          Execute Upload
        </button>
      </div>
    </SidePanel>
  );
};

export default UploadModal;
