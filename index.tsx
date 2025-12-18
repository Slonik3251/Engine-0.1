
// Add imports for Leaflet and Chart.js to resolve "Cannot find name" errors
import L from 'leaflet';
import Chart from 'chart.js/auto';
import { INITIAL_CROSSROADS, MOCK_USER, TRAFFIC_DATA, WEEKLY_DATA } from './constants';

// Extend the Window interface for global dispatchers to resolve property access errors
declare global {
  interface Window {
    dispatchModal: (val: string | null) => void;
    dispatchUser: () => void;
    dispatchSearch: (val: string) => void;
    dispatchTheme: () => void;
    dispatchTime: (val: string) => void;
    dispatchLogin: () => void;
    dispatchLogout: () => void;
  }
}

// --- State Management ---
let state = {
  activeModal: null as string | null, // 'analytics' | 'edit-crossroad' | 'user' | 'upload' | 'settings' | 'login'
  selectedCrossroadId: null as string | null,
  isAuthenticated: false,
  currentUser: null as any,
  crossroads: [...INITIAL_CROSSROADS],
  searchQuery: '',
  theme: 'dark', // 'dark' | 'light'
  timeRange: 12
};

// Type variables to fix "Cannot find name" and "property does not exist on type unknown" errors
let map: L.Map | null = null;
let markers: { [key: string]: L.Layer } = {};
let tileLayer: L.TileLayer | null = null;
let currentChart: Chart | null = null;

// --- Icons (SVG Strings) ---
const ICONS = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  map: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.617a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>`,
  analytics: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  problems: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  data: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  activity: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="m13 2-2 10h3L12 22l9-15h-3l4-5z"/></svg>`,
};

// --- Helper Functions ---
function setState(update: Partial<typeof state>) {
  state = { ...state, ...update };
  render();
}

function initMap() {
  const container = document.getElementById('map');
  if (!container) return;
  
  map = L.map('map', {
    center: [53.4129, 58.9298],
    zoom: 13,
    zoomControl: false,
  });

  updateTiles();
  updateMarkers();
}

function updateTiles() {
  // TileLayer has remove() method, ensure it's not null before calling
  if (tileLayer) tileLayer.remove();
  const tileUrl = state.theme === 'dark' 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  
  tileLayer = L.tileLayer(tileUrl, { attribution: '&copy; CARTO' }).addTo(map!);
}

function updateMarkers() {
  Object.values(markers).forEach(m => m.remove());
  markers = {};

  const filtered = state.searchQuery 
    ? state.crossroads.filter(c => c.name.toLowerCase().includes(state.searchQuery.toLowerCase()))
    : state.crossroads;

  filtered.forEach(cr => {
    const marker = L.circleMarker(cr.coordinates as L.LatLngExpression, {
      radius: 10,
      fillColor: '#99FF00',
      color: state.theme === 'dark' ? '#fff' : '#000',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(map!);

    marker.on('click', () => {
      setState({ selectedCrossroadId: cr.id, activeModal: 'edit-crossroad' });
    });

    marker.bindTooltip(cr.name, { className: 'leaflet-tooltip' });
    markers[cr.id] = marker;
  });
}

// --- Render Functions ---

function renderNavigation() {
  const container = document.getElementById('navigation-container');
  if (!container) return;
  const isDark = state.theme === 'dark';
  
  container.innerHTML = `
    <!-- Desktop Sidebar -->
    <aside class="hidden md:flex w-20 h-full ${isDark ? 'bg-[#050505] border-[#222]' : 'bg-white border-slate-200'} border-r flex-col items-center py-8 z-[110] transition-colors">
      <div class="mb-12 cursor-pointer" onclick="window.dispatchModal(null)">
        <div class="w-12 h-12 bg-[#99FF00] rounded-2xl flex items-center justify-center rotate-45 shadow-lg">
          <div class="-rotate-45">${ICONS.map}</div>
        </div>
      </div>
      <nav class="flex-1 space-y-4">
        ${['map', 'analytics', 'problems', 'upload'].map(id => `
          <button onclick="window.dispatchModal('${id === 'map' ? 'null' : id}')" 
            class="w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              (state.activeModal === id || (id === 'map' && !state.activeModal)) 
              ? 'bg-[#99FF00] text-black shadow-lg' 
              : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }">
            ${ICONS[id === 'upload' ? 'data' : id]}
          </button>
        `).join('')}
      </nav>
      <div class="space-y-4">
        <button onclick="window.dispatchModal('settings')" class="w-12 h-12 rounded-xl flex items-center justify-center ${state.activeModal === 'settings' ? 'bg-slate-900 dark:bg-white text-white dark:text-black' : 'text-slate-400'}">
          ${ICONS.settings}
        </button>
        <button onclick="window.dispatchUser()" class="w-12 h-12 rounded-full border-2 ${state.isAuthenticated ? 'border-[#99FF00]' : 'border-slate-300 dark:border-gray-700'} flex items-center justify-center bg-slate-100 dark:bg-[#222]">
          ${ICONS.user}
        </button>
      </div>
    </aside>

    <!-- Mobile Navigation -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 h-16 ${isDark ? 'bg-[#0A0A0A] border-[#222]' : 'bg-white border-slate-200'} border-t z-[110] flex items-center justify-around px-2 pb-safe shadow-lg">
      ${['map', 'analytics', 'settings'].map(id => `
        <button onclick="window.dispatchModal('${id === 'map' ? 'null' : id}')" class="flex flex-col items-center p-2 ${state.activeModal === (id === 'map' ? null : id) ? 'text-[#99FF00]' : 'text-slate-400'}">
          ${ICONS[id]}
          <span class="text-[8px] uppercase font-bold mt-1">${id}</span>
        </button>
      `).join('')}
      <button onclick="window.dispatchUser()" class="flex flex-col items-center p-2 ${state.isAuthenticated ? 'text-[#99FF00]' : 'text-slate-400'}">
        ${ICONS.user}
        <span class="text-[8px] uppercase font-bold mt-1">Profile</span>
      </button>
    </nav>
  `;
}

function renderOverlays() {
  const container = document.getElementById('overlays-container');
  if (!container) return;
  const isDark = state.theme === 'dark';
  
  container.innerHTML = `
    <div class="w-full sm:w-72 pointer-events-auto">
      <div class="relative group shadow-2xl rounded-2xl overflow-hidden">
        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">${ICONS.search}</div>
        <input type="text" placeholder="Поиск объектов..." value="${state.searchQuery}" 
          oninput="window.dispatchSearch(this.value)"
          class="w-full ${isDark ? 'bg-[#0A0A0A]/85 text-white border-[#222]' : 'bg-white/90 text-slate-900 border-slate-200'} backdrop-blur-md border py-3 pl-12 pr-4 text-sm focus:outline-none"
        />
      </div>
    </div>
    <div class="flex gap-2 pointer-events-auto overflow-x-auto no-scrollbar pb-2 sm:pb-0">
      <div class="${isDark ? 'bg-[#0A0A0A]/85 text-white border-[#222]' : 'bg-white/90 text-slate-900 border-slate-200'} backdrop-blur-md border rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xl whitespace-nowrap">
        <div class="text-[#99FF00]">${ICONS.activity}</div>
        <div class="flex flex-col">
          <span class="text-[8px] uppercase text-slate-400 font-bold leading-none mb-0.5">Flow Rate</span>
          <span class="font-mono font-bold text-xs">12,410 <span class="text-[10px] opacity-50 font-normal">v/h</span></span>
        </div>
      </div>
      <div class="${isDark ? 'bg-[#0A0A0A]/85 text-white border-[#222]' : 'bg-white/90 text-slate-900 border-slate-200'} backdrop-blur-md border rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-xl whitespace-nowrap">
        <div class="text-yellow-500">${ICONS.zap}</div>
        <div class="flex flex-col">
          <span class="text-[8px] uppercase text-slate-400 font-bold leading-none mb-0.5">AI Engine</span>
          <span class="font-mono font-bold text-xs">READY</span>
        </div>
      </div>
    </div>
  `;
}

function renderModal() {
  const container = document.getElementById('modal-container');
  if (!container) return;
  if (!state.activeModal) {
    container.innerHTML = '';
    return;
  }

  const isDark = state.theme === 'dark';
  const side = (state.activeModal === 'analytics') ? 'left' : 'right';
  const animation = side === 'right' ? 'animate-slide-in' : 'animate-slide-in';
  const posClass = side === 'right' ? 'right-0 border-l' : 'left-0 border-r';

  if (state.activeModal === 'login') {
    container.innerHTML = `
      <div class="fixed inset-0 z-[200] flex items-center justify-center modal-backdrop p-4">
        <div class="relative w-full max-w-md bg-[#0A0A0A] rounded-[40px] border border-[#222] p-8 animate-in fade-in zoom-in-95">
          <h2 class="text-2xl font-black text-white text-center uppercase mb-8">Вход в систему</h2>
          <div class="space-y-4">
            <input type="text" placeholder="Логин" class="w-full bg-[#151515] border border-[#222] rounded-2xl py-4 px-6 text-white" value="admin" />
            <input type="password" placeholder="Пароль" class="w-full bg-[#151515] border border-[#222] rounded-2xl py-4 px-6 text-white" value="password" />
          </div>
          <button onclick="window.dispatchLogin()" class="w-full py-5 bg-[#99FF00] text-black font-black rounded-[24px] uppercase mt-8 tracking-widest shadow-lg">Войти</button>
          <button onclick="window.dispatchModal(null)" class="w-full mt-4 text-gray-500 text-[10px] font-bold uppercase">Отмена</button>
        </div>
      </div>
    `;
    return;
  }

  // Layout for Side Panels
  container.innerHTML = `
    <div class="fixed inset-y-0 ${posClass} w-full max-w-lg z-[150] ${isDark ? 'bg-[#0A0A0A]/95 border-[#222]' : 'bg-white border-slate-200'} backdrop-blur-xl shadow-2xl flex flex-col ${animation} pb-16 md:pb-0 transition-colors">
      <div class="flex items-center justify-between p-5 border-b ${isDark ? 'border-[#222]' : 'border-slate-100'}">
        <h2 class="text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex items-center gap-2">
          <div class="w-1 h-5 bg-[#99FF00] rounded-full"></div>
          ${state.activeModal.toUpperCase()}
        </h2>
        <button onclick="window.dispatchModal(null)" class="p-2 text-slate-400 hover:text-red-500 transition-colors">${ICONS.close}</button>
      </div>
      <div id="modal-content" class="flex-1 overflow-y-auto custom-scrollbar p-6">
        <!-- Content will be injected here -->
      </div>
    </div>
  `;

  injectModalContent();
}

function injectModalContent() {
  const content = document.getElementById('modal-content');
  if (!content) return;
  const isDark = state.theme === 'dark';
  
  if (state.activeModal === 'analytics') {
    content.innerHTML = `
      <div class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="${isDark ? 'bg-[#151515] border-[#222]' : 'bg-slate-50 border-slate-200'} p-4 rounded-2xl border">
            <p class="text-[10px] text-slate-400 uppercase font-bold">Эффективность</p>
            <p class="text-2xl font-mono ${isDark ? 'text-white' : 'text-slate-900'}">${(90 + (state.timeRange % 5)).toFixed(1)}%</p>
          </div>
          <div class="${isDark ? 'bg-[#151515] border-[#222]' : 'bg-slate-50 border-slate-200'} p-4 rounded-2xl border">
            <p class="text-[10px] text-slate-400 uppercase font-bold">Задержка</p>
            <p class="text-2xl font-mono ${isDark ? 'text-white' : 'text-slate-900'}">${(12 + (state.timeRange / 3)).toFixed(1)}s</p>
          </div>
        </div>
        
        <div class="${isDark ? 'bg-[#151515] border-[#222]' : 'bg-slate-50 border-slate-200'} p-5 rounded-3xl border">
          <p class="text-xs text-slate-400 uppercase font-bold mb-4">Временной интервал: 0:00 → <span class="text-[#99FF00]">${state.timeRange}:00</span></p>
          <input type="range" min="1" max="24" value="${state.timeRange}" oninput="window.dispatchTime(this.value)" class="w-full h-2 rounded-lg accent-[#99FF00]" />
        </div>

        <div class="h-64">
           <canvas id="intensityChart"></canvas>
        </div>
      </div>
    `;
    initCharts();
  }

  if (state.activeModal === 'settings') {
    content.innerHTML = `
      <div class="space-y-8">
        <section class="space-y-4">
          <h3 class="text-slate-400 text-[10px] font-bold uppercase tracking-widest px-1">Интерфейс</h3>
          <button onclick="window.dispatchTheme()" class="w-full flex items-center justify-between p-4 ${isDark ? 'bg-[#151515] border-[#222]' : 'bg-slate-50 border-slate-200'} rounded-2xl border">
             <span class="text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}">Темная тема</span>
             <div class="w-10 h-5 rounded-full relative ${state.theme === 'dark' ? 'bg-[#99FF00]' : 'bg-slate-300'}">
                <div class="absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${state.theme === 'dark' ? 'left-[24px]' : 'left-[4px]'}"></div>
             </div>
          </button>
        </section>
        <button onclick="window.dispatchLogout()" class="w-full py-4 bg-red-500/10 text-red-500 font-bold rounded-2xl border border-red-500/20 uppercase text-[10px] tracking-widest">Выйти из системы</button>
      </div>
    `;
  }

  if (state.activeModal === 'edit-crossroad') {
    const cr = state.crossroads.find(c => c.id === state.selectedCrossroadId);
    if (!cr) return;
    content.innerHTML = `
      <div class="space-y-6">
        <div class="bg-[#99FF00]/10 border border-[#99FF00]/20 rounded-full px-3 py-1 w-fit text-[10px] text-[#99FF00] font-bold uppercase">Online</div>
        <div class="aspect-video bg-slate-100 dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-[#222] flex items-center justify-center">
          <div class="w-12 h-12 bg-[#99FF00] rounded-full animate-pulse shadow-lg"></div>
        </div>
        <div class="space-y-3">
          <h3 class="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Фазы светофоров</h3>
          ${cr.trafficLights.map(tl => `
            <div class="${isDark ? 'bg-[#151515] border-[#222]' : 'bg-slate-50 border-slate-200'} p-4 rounded-xl border">
              <div class="flex justify-between items-center">
                <span class="${isDark ? 'text-white' : 'text-slate-900'} font-bold text-xs">${tl.direction}</span>
                <span class="text-[#99FF00] font-bold font-mono text-lg">${tl.phase}s</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

function initCharts() {
  const ctx = document.getElementById('intensityChart') as HTMLCanvasElement;
  if (!ctx) return;
  
  if (currentChart) currentChart.destroy();
  
  const limit = Math.floor((state.timeRange / 24) * TRAFFIC_DATA.length);
  const data = TRAFFIC_DATA.slice(0, Math.max(2, limit));

  // Chart is now defined from import
  currentChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.time),
      datasets: [{
        label: 'Traffic Intensity',
        data: data.map(d => d.intensity),
        borderColor: '#99FF00',
        backgroundColor: 'rgba(153, 255, 0, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { grid: { color: state.theme === 'dark' ? '#222' : '#eee' }, ticks: { color: '#666' } }
      }
    }
  });
}

// --- Dispatchers (Global for Inline HTML Events) ---
// Assign methods to window using the extended interface to fix TS errors
window.dispatchModal = (val) => {
  const modal = val === 'null' ? null : val;
  setState({ activeModal: modal });
};

window.dispatchUser = () => {
  if (state.isAuthenticated) setState({ activeModal: 'user' });
  else setState({ activeModal: 'login' });
};

window.dispatchSearch = (val) => {
  state.searchQuery = val;
  updateMarkers();
  renderOverlays();
};

window.dispatchTheme = () => {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  document.body.className = newTheme;
  setState({ theme: newTheme });
  updateTiles();
  updateMarkers();
};

window.dispatchTime = (val) => {
  state.timeRange = parseInt(val);
  const content = document.getElementById('modal-content');
  if (state.activeModal === 'analytics' && content) injectModalContent();
};

window.dispatchLogin = () => {
  setState({ isAuthenticated: true, currentUser: MOCK_USER, activeModal: null });
};

window.dispatchLogout = () => {
  setState({ isAuthenticated: false, currentUser: null, activeModal: null });
};

// --- Initial Render ---
function render() {
  renderNavigation();
  renderOverlays();
  renderModal();
}

// Start app
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  render();
});
