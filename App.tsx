
import React, { useState, useMemo } from 'react';
import MapView from './components/map/MapView';
import SidebarNav from './components/ui/SidebarNav';
import LoginModal from './components/modals/LoginModal';
import AnalyticsModal from './components/modals/AnalyticsModal';
import EditCrossroadModal from './components/modals/EditCrossroadModal';
import UserModal from './components/modals/UserModal';
import UploadModal from './components/modals/UploadModal';
import SettingsModal from './components/modals/SettingsModal';
import { AppState, ModalType, Crossroad, ThemeType } from './types';
import { INITIAL_CROSSROADS, MOCK_USER } from './constants';
import { Search, Activity, Zap, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    activeModal: null,
    selectedCrossroadId: null,
    isAuthenticated: false,
    currentUser: null,
    crossroads: INITIAL_CROSSROADS,
    searchQuery: '',
    theme: 'dark',
  });

  const setActiveModal = (modal: ModalType) => setState(prev => ({ ...prev, activeModal: modal }));
  const setSelectedCrossroad = (id: string | null) => setState(prev => ({ ...prev, selectedCrossroadId: id }));
  const setSearchQuery = (query: string) => setState(prev => ({ ...prev, searchQuery: query }));
  const setTheme = (theme: ThemeType) => setState(prev => ({ ...prev, theme }));
  
  const login = () => setState(prev => ({ 
    ...prev, 
    isAuthenticated: true, 
    currentUser: MOCK_USER,
    activeModal: null 
  }));

  const logout = () => setState(prev => ({ 
    ...prev, 
    isAuthenticated: false, 
    currentUser: null,
    activeModal: null 
  }));

  const handleOpenUser = () => {
    if (state.isAuthenticated) {
      setActiveModal('user');
    } else {
      setActiveModal('login');
    }
  };

  const handleCrossroadPhaseUpdate = (crossroadId: string, lightId: string, newPhase: number) => {
    setState(prev => ({
      ...prev,
      crossroads: prev.crossroads.map(cr => {
        if (cr.id === crossroadId) {
          return {
            ...cr,
            trafficLights: cr.trafficLights.map(tl => tl.id === lightId ? { ...tl, phase: newPhase } : tl)
          };
        }
        return cr;
      })
    }));
  };

  const filteredCrossroads = useMemo(() => {
    if (!state.searchQuery) return state.crossroads;
    return state.crossroads.filter(cr => 
      cr.name.toLowerCase().includes(state.searchQuery.toLowerCase())
    );
  }, [state.crossroads, state.searchQuery]);

  const selectedCrossroad = useMemo(() => 
    state.crossroads.find(cr => cr.id === state.selectedCrossroadId) || null,
    [state.crossroads, state.selectedCrossroadId]
  );

  return (
    <div className={`relative w-full h-screen overflow-hidden flex flex-col md:flex-row transition-colors duration-300 ${state.theme === 'dark' ? 'dark bg-[#050505]' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar - Desktop: Left, Mobile: Bottom */}
      <SidebarNav 
        activeModal={state.activeModal}
        setActiveModal={setActiveModal}
        isAuthenticated={state.isAuthenticated}
        onOpenUser={handleOpenUser}
        theme={state.theme}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden order-1 md:order-2">
        {/* Top Header Overlay - Responsive Optimization for Vertical Phones */}
        <div className="absolute top-4 left-4 right-4 z-[40] flex flex-col sm:flex-row items-start sm:items-center gap-3 pointer-events-none">
          {/* Search Bar Container */}
          <div className="w-full sm:w-72 pointer-events-auto">
            <div className="relative group shadow-2xl rounded-2xl overflow-hidden">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#99FF00] transition-colors" />
              <input 
                type="text" 
                placeholder="Поиск..." 
                value={state.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90 dark:bg-[#0A0A0A]/85 backdrop-blur-md border border-slate-200 dark:border-[#222] py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#99FF00]/30 transition-all shadow-lg"
              />
            </div>
          </div>

          {/* Stats Badges - Fixed for vertical view to prevent overlapping */}
          <div className="flex gap-2 pointer-events-auto w-full sm:w-auto overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            <div className="bg-white/90 dark:bg-[#0A0A0A]/85 backdrop-blur-md border border-slate-200 dark:border-[#222] rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xl whitespace-nowrap min-w-fit">
              <Activity className="w-4 h-4 text-[#99FF00]" />
              <div className="flex flex-col">
                <p className="text-[8px] uppercase text-slate-400 dark:text-gray-500 font-bold tracking-widest leading-none mb-0.5">Flow Rate</p>
                <p className="text-slate-900 dark:text-white font-mono font-bold text-xs">12,410 <span className="text-[10px] opacity-50 font-normal">v/h</span></p>
              </div>
            </div>
            <div className="bg-white/90 dark:bg-[#0A0A0A]/85 backdrop-blur-md border border-slate-200 dark:border-[#222] rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xl whitespace-nowrap min-w-fit">
              <Zap className="w-4 h-4 text-yellow-500" />
              <div className="flex flex-col">
                <p className="text-[8px] uppercase text-slate-400 dark:text-gray-500 font-bold tracking-widest leading-none mb-0.5">AI Engine</p>
                <p className="text-slate-900 dark:text-white font-mono font-bold text-xs uppercase">Optimization Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location / Cluster Info */}
        <div className="absolute bottom-20 md:bottom-6 left-4 z-10 hidden sm:block">
          <div className="bg-white/90 dark:bg-[#0A0A0A]/85 backdrop-blur-md border border-slate-200 dark:border-[#222] rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
            <MapPin className="w-3 h-3 text-[#99FF00]" />
            <span className="text-[9px] text-slate-900 dark:text-white font-bold uppercase tracking-widest">SFE Cluster: Magnitogorsk</span>
          </div>
        </div>

        {/* The Map Container */}
        <MapView 
          crossroads={filteredCrossroads} 
          theme={state.theme}
          onCrossroadClick={(id) => {
            setSelectedCrossroad(id);
            setActiveModal('edit-crossroad');
          }}
        />

        {/* Modals & Panels System */}
        {state.activeModal === 'login' && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm p-4">
             <LoginModal onClose={() => setActiveModal(null)} onLogin={login} />
          </div>
        )}
        
        {state.activeModal === 'analytics' && (
          <AnalyticsModal onClose={() => setActiveModal(null)} />
        )}

        {state.activeModal === 'edit-crossroad' && selectedCrossroad && (
          <EditCrossroadModal 
            crossroad={selectedCrossroad}
            onClose={() => setActiveModal(null)}
            onUpdatePhase={(lightId, val) => handleCrossroadPhaseUpdate(selectedCrossroad.id, lightId, val)}
          />
        )}

        {state.activeModal === 'user' && state.currentUser && (
          <UserModal 
            user={state.currentUser}
            onClose={() => setActiveModal(null)}
            onLogout={logout}
          />
        )}

        {state.activeModal === 'upload' && (
          <UploadModal 
            onClose={() => setActiveModal(null)}
          />
        )}

        {state.activeModal === 'settings' && (
          <SettingsModal 
            onClose={() => setActiveModal(null)}
            theme={state.theme}
            onSetTheme={setTheme}
          />
        )}
      </main>
    </div>
  );
};

export default App;
