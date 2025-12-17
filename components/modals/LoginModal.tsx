
import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Mail, Phone, ChevronRight } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const toggleMode = () => setMode(mode === 'login' ? 'register' : 'login');

  return (
    <div className="relative w-full max-w-md bg-[#0A0A0A] rounded-[40px] border border-[#222] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      <div className="p-8">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-[#1a1a1a] rounded-[24px] border-2 border-[#99FF00] flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(153,255,0,0.1)]">
             <div className="relative w-12 h-12">
                <div className="absolute top-0 right-0 w-6 h-6 bg-[#99FF00] rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-9 border-2 border-[#99FF00] rounded-tr-lg"></div>
             </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              {mode === 'login' ? 'Вход в систему' : 'Регистрация'}
            </h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Magnitogorsk Cluster v2.4</p>
          </div>
        </div>

        {/* Form Mode Toggle Tabs */}
        <div className="flex bg-[#151515] p-1 rounded-2xl border border-[#222] mb-8">
          <button 
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${mode === 'login' ? 'bg-[#222] text-[#99FF00]' : 'text-gray-600 hover:text-white'}`}
          >
            LOGIN
          </button>
          <button 
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${mode === 'register' ? 'bg-[#222] text-[#99FF00]' : 'text-gray-600 hover:text-white'}`}
          >
            SIGNUP
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#99FF00] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Имя" 
                  className="w-full bg-[#151515] border border-[#222] rounded-2xl py-3.5 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#99FF00] transition-all"
                />
              </div>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Фамилия" 
                  className="w-full bg-[#151515] border border-[#222] rounded-2xl py-3.5 px-5 text-sm text-white focus:outline-none focus:border-[#99FF00] transition-all"
                />
              </div>
            </div>
          )}

          <div className="relative group">
            {mode === 'login' ? (
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#99FF00] transition-colors" />
            ) : (
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#99FF00] transition-colors" />
            )}
            <input 
              type="text" 
              placeholder={mode === 'login' ? "Логин или E-mail" : "E-mail адрес"} 
              defaultValue={mode === 'login' ? "admin_max" : ""}
              className="w-full bg-[#151515] border border-[#222] rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#99FF00] transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#99FF00] transition-colors" />
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Пароль" 
              defaultValue={mode === 'login' ? "password" : ""}
              className="w-full bg-[#151515] border border-[#222] rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-[#99FF00] transition-all"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#99FF00] transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          {mode === 'register' && (
            <div className="relative group animate-in fade-in slide-in-from-top-1 duration-300">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#99FF00] transition-colors" />
              <input 
                type="tel" 
                placeholder="Номер телефона" 
                className="w-full bg-[#151515] border border-[#222] rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#99FF00] transition-all"
              />
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button 
          onClick={onLogin}
          className="w-full py-5 bg-[#99FF00] text-black font-black rounded-[24px] hover:brightness-110 active:scale-[0.98] transition-all text-xs tracking-[4px] uppercase mt-10 shadow-[0_10px_40px_rgba(153,255,0,0.15)] flex items-center justify-center gap-2 group"
        >
          {mode === 'login' ? 'Авторизоваться' : 'Создать аккаунт'}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Footer Toggle Link */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <button 
            onClick={toggleMode}
            className="text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-[#99FF00] transition-colors"
          >
            {mode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
          
          <button 
            onClick={onClose} 
            className="text-gray-700 text-[9px] font-bold uppercase tracking-widest hover:text-red-500 transition-colors"
          >
            Закрыть окно
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
