
export type ModalType = 'login' | 'analytics' | 'edit-crossroad' | 'user' | 'upload' | 'problems' | 'settings' | null;
export type ThemeType = 'dark' | 'light';

export interface TrafficLight {
  id: string;
  phase: number;
  direction: string;
}

export interface RoadData {
  id: string;
  name: string;
  carCount: number;
  pedestrianCount: number;
}

export interface Crossroad {
  id: string;
  name: string;
  coordinates: [number, number];
  trafficLights: TrafficLight[];
  roads: RoadData[];
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface AppState {
  activeModal: ModalType;
  selectedCrossroadId: string | null;
  isAuthenticated: boolean;
  currentUser: User | null;
  crossroads: Crossroad[];
  searchQuery: string;
  theme: ThemeType;
}
