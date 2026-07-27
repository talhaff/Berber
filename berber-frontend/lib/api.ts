import { AppointmentCreateRequest, AppointmentResponse, AppointmentStatus, AuthResponse, Service, Staff, TimeSlot } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('berber_token') : null;

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Sunucu hatası' }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// ─── Public Endpoints ───────────────────────────────────────────────
export const api = {
  getServices: () => request<Service[]>('/public/services'),

  getStaff: () => request<Staff[]>('/public/staff'),

  getSlots: (staffId: number, serviceId: number, date: string) =>
    request<TimeSlot[]>(`/slots?staffId=${staffId}&serviceId=${serviceId}&date=${date}`),

  createAppointment: (data: AppointmentCreateRequest) =>
    request<AppointmentResponse>('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // ─── Auth ──────────────────────────────────────────────────────────
  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  // ─── Admin Endpoints ───────────────────────────────────────────────
  getDayAppointments: (date: string) =>
    request<AppointmentResponse[]>(`/appointments/day?date=${date}`),

  updateAppointmentStatus: (id: number, status: AppointmentStatus) =>
    request<AppointmentResponse>(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  cancelAppointment: (id: number) =>
    request<void>(`/appointments/${id}`, { method: 'DELETE' }),
};
