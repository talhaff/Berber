export interface Service {
  id: number;
  name: string;
  durationMinutes: number;
  bufferMinutes: number;
  price: number;
}

export interface Staff {
  id: number;
  fullName: string;
  role: 'ADMIN' | 'STAFF';
  workStart: string;
  workEnd: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  locked: boolean;
}

export interface AppointmentResponse {
  id: number;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  durationMinutes: number;
  price: number;
  staffName: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
}

export type AppointmentStatus =
  | 'PENDING'
  | 'IN_CHAIR'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NOSHOW';

export interface AppointmentCreateRequest {
  serviceId: number;
  staffId: number;
  date: string;
  startTime: string;
  customerName: string;
  customerPhone: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  role: string;
  fullName: string;
}
