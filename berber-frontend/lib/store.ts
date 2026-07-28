import { create } from 'zustand';
import { Service, Staff, TimeSlot } from '@/types';

interface BookingState {
  step: number;
  selectedService: Service | null;
  selectedStaff: Staff | null;
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  customerName: string;
  customerPhone: string;
  
  setStep: (step: number) => void;
  setService: (service: Service) => void;
  setStaff: (staff: Staff) => void;
  setDate: (date: Date) => void;
  setSlot: (slot: TimeSlot) => void;
  setCustomerDetails: (name: string, phone: string) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  selectedService: null,
  selectedStaff: null,
  selectedDate: null,
  selectedSlot: null,
  customerName: '',
  customerPhone: '',
  
  setStep: (step) => set({ step }),
  setService: (service) => set({ selectedService: service }),
  setStaff: (staff) => set({ selectedStaff: staff }),
  setDate: (date) => set({ selectedDate: date, selectedSlot: null }), // Date değişirse slot resetlenir
  setSlot: (slot) => set({ selectedSlot: slot }),
  setCustomerDetails: (name, phone) => set({ customerName: name, customerPhone: phone }),
  reset: () => set({
    step: 1,
    selectedService: null,
    selectedStaff: null,
    selectedDate: null,
    selectedSlot: null,
    customerName: '',
    customerPhone: '',
  }),
}));
