import { TicketType, AddOn } from "@/types";

export const TICKET_TYPES: TicketType[] = [
  {
    type: 'adult',
    price: 45,
    description: 'Full access to all areas'
  },
  {
    type: 'child',
    price: 25,
    description: 'Full access with supervision'
  },
  {
    type: 'student',
    price: 35,
    description: 'Valid student ID required'
  }
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'audio-guide',
    name: 'Audio Guide',
    description: 'Available in 8 languages',
    price: 8
  },
  {
    id: 'vr-experience',
    name: 'Virtual Reality Experience',
    description: 'Immersive historical recreation',
    price: 15
  }
];

export const SITE_CATEGORIES = [
  'All Sites',
  'Archaeological',
  'Museums',
  'Monuments',
  'Ancient Ruins'
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' }
];
