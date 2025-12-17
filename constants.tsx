
import { Crossroad, User } from './types';

export const MOCK_USER: User = {
  id: '000001',
  name: 'Максим',
  surname: 'Гребенев',
  email: 'grebenevmax@mail.ru',
  phone: '8 (951) 781-97-31'
};

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
      { id: 'r2', name: 'ул. Грязнова (вост)', carCount: 130, pedestrianCount: 20 },
      { id: 'r3', name: 'пр. Ленина (юг)', carCount: 190, pedestrianCount: 55 },
      { id: 'r4', name: 'ул. Грязнова (зап)', carCount: 115, pedestrianCount: 18 }
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
      { id: 'r5', name: 'пр. К. Маркса (сев)', carCount: 450, pedestrianCount: 120 },
      { id: 'r6', name: 'ул. Завенягина (вост)', carCount: 320, pedestrianCount: 60 }
    ]
  },
  {
    id: '3',
    name: 'ул. Советская - ул. Грязнова',
    coordinates: [53.4072, 58.9754],
    trafficLights: [
      { id: 'tl5', phase: 35, direction: 'Советская' },
      { id: 'tl6', phase: 35, direction: 'Грязнова' }
    ],
    roads: [
      { id: 'r7', name: 'ул. Советская', carCount: 280, pedestrianCount: 35 },
      { id: 'r8', name: 'ул. Грязнова', carCount: 240, pedestrianCount: 25 }
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
