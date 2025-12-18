
// Import Crossroad type to ensure correct property types for constants
import { Crossroad } from './types';

export const MOCK_USER = {
  id: '000001',
  name: 'Максим',
  surname: 'Гребенев',
  email: 'grebenevmax@mail.ru',
  phone: '8 (951) 781-97-31'
};

// Explicitly type the array to [number, number] tuple for coordinates
export const INITIAL_CROSSROADS: Crossroad[] = [
  {
    id: '1',
    name: 'пр. Ленина - ул. Грязнова',
    coordinates: [53.4065, 58.9912],
    trafficLights: [
      { id: 'tl1', phase: 45, direction: 'Ленина (сев-юг)' },
      { id: 'tl2', phase: 25, direction: 'Грязнова (зап-вост)' }
    ],
    roads: [
      { id: 'r1', name: 'пр. Ленина (сев)', carCount: 210, pedestrianCount: 45 },
      { id: 'r2', name: 'ул. Грязнова (вост)', carCount: 130, pedestrianCount: 20 }
    ]
  },
  {
    id: '2',
    name: 'пр. К. Маркса - ул. Завенягина',
    coordinates: [53.3854, 58.9815],
    trafficLights: [
      { id: 'tl3', phase: 60, direction: 'К. Маркса' },
      { id: 'tl4', phase: 30, direction: 'Завенягина' }
    ],
    roads: [
      { id: 'r5', name: 'пр. К. Маркса (сев)', carCount: 450, pedestrianCount: 120 }
    ]
  }
];

export const TRAFFIC_DATA = [
  { time: '0:00', intensity: 8 },
  { time: '3:00', intensity: 3 },
  { time: '7:30', intensity: 75 },
  { time: '9:00', intensity: 92 },
  { time: '12:00', intensity: 55 },
  { time: '15:00', intensity: 65 },
  { time: '17:30', intensity: 98 },
  { time: '20:00', intensity: 45 },
  { time: '24:00', intensity: 12 },
];

export const WEEKLY_DATA = [
  { day: 'Пн', count: 18500 },
  { day: 'Вт', count: 19200 },
  { day: 'Ср', count: 18900 },
  { day: 'Чт', count: 20100 },
  { day: 'Пт', count: 22500 },
  { day: 'Сб', count: 14200 },
  { day: 'Вс', count: 9800 },
];
