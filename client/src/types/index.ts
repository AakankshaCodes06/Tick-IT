export interface TimeSlot {
  time: string;
  price: number;
  capacity: number;
  available: number;
}

export interface SiteFeature {
  id: string;
  name: string;
  price?: number;
}

export interface TicketType {
  type: 'adult' | 'child' | 'student';
  price: number;
  description: string;
}

export interface BookingFormData {
  siteId: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  visitDate: string;
  timeSlot: string;
  adultTickets: number;
  childTickets: number;
  studentTickets: number;
  addOns: string[];
  totalAmount: string;
}

export interface BookingStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}
