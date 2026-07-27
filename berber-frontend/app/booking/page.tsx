'use client';

import { useEffect, useState } from 'react';
import { useBookingStore } from '@/lib/store';
import { api } from '@/lib/api';
import { Service, Staff, TimeSlot } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { format, addDays } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock, User, Scissors, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const { step, setStep, selectedService, selectedStaff, selectedDate, selectedSlot, customerName, customerPhone } = useBookingStore();
  const router = useRouter();

  // Redirect to home if someone directly accesses steps > 1 without selecting previous options
  useEffect(() => {
    if (step === 2 && !selectedService) setStep(1);
    if (step === 3 && (!selectedService || !selectedStaff)) setStep(1);
    if (step === 4 && (!selectedService || !selectedStaff || !selectedDate || !selectedSlot)) setStep(1);
  }, [step, selectedService, selectedStaff, selectedDate, selectedSlot, setStep]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : router.push('/')}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-black">Randevu Al</h1>
            <p className="text-white/50 text-sm">Adım {step} / 4</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-amber-400' : 'bg-white/10'}`} />
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            {step === 1 && <Step1Services />}
            {step === 2 && <Step2Staff />}
            {step === 3 && <Step3DateTime />}
            {step === 4 && <Step4Confirm />}
            {step === 5 && <Step5Success />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 1: Services ────────────────────────────────────────────────
function Step1Services() {
  const { setService, setStep, selectedService } = useBookingStore();
  const { data: services, isLoading, error } = useQuery({ queryKey: ['services'], queryFn: api.getServices });

  if (isLoading) return <div className="text-center py-20 text-white/50 animate-pulse">Hizmetler yükleniyor...</div>;
  if (error) return <div className="text-center py-20 text-red-400">Hizmetler yüklenirken hata oluştu.</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Scissors className="text-amber-400" /> Hizmet Seçin
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {services?.map((service) => (
          <button
            key={service.id}
            onClick={() => { setService(service); setStep(2); }}
            className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
              selectedService?.id === service.id 
                ? 'bg-amber-400/10 border-amber-400' 
                : 'bg-white/5 border-white/10 hover:border-amber-400/50 hover:bg-white/10'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <span className="text-amber-400 font-bold">₺{service.price}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-sm">
              <Clock className="w-4 h-4" />
              <span>{service.durationMinutes} dk</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2: Staff ───────────────────────────────────────────────────
function Step2Staff() {
  const { setStaff, setStep, selectedStaff } = useBookingStore();
  const { data: staffList, isLoading } = useQuery({ queryKey: ['staff'], queryFn: api.getStaff });

  if (isLoading) return <div className="text-center py-20 text-white/50 animate-pulse">Personel yükleniyor...</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <User className="text-amber-400" /> Personel Seçin
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {staffList?.map((staff) => (
          <button
            key={staff.id}
            onClick={() => { setStaff(staff); setStep(3); }}
            className={`flex items-center gap-4 text-left p-4 rounded-2xl border transition-all duration-300 ${
              selectedStaff?.id === staff.id 
                ? 'bg-amber-400/10 border-amber-400' 
                : 'bg-white/5 border-white/10 hover:border-amber-400/50 hover:bg-white/10'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl font-bold text-black shrink-0">
              {staff.fullName.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{staff.fullName}</h3>
              <p className="text-white/50 text-sm">Uzman Berber</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 3: Date & Time ─────────────────────────────────────────────
function Step3DateTime() {
  const { selectedStaff, selectedService, selectedDate, setDate, selectedSlot, setSlot, setStep } = useBookingStore();
  
  // Date picker logic (next 7 days)
  const today = new Date();
  const dates = Array.from({ length: 7 }).map((_, i) => addDays(today, i));
  const activeDate = selectedDate || dates[0];

  // Set default date if null
  useEffect(() => {
    if (!selectedDate) setDate(dates[0]);
  }, [selectedDate, setDate, dates]);

  const { data: slots, isLoading } = useQuery({
    queryKey: ['slots', selectedStaff?.id, selectedService?.id, format(activeDate, 'yyyy-MM-dd')],
    queryFn: () => api.getSlots(selectedStaff!.id, selectedService!.id, format(activeDate, 'yyyy-MM-dd')),
    enabled: !!selectedStaff && !!selectedService,
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <CalendarIcon className="text-amber-400" /> Tarih ve Saat
      </h2>
      
      {/* Date Selector Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {dates.map((d) => {
          const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(d, 'yyyy-MM-dd');
          return (
            <button
              key={d.toISOString()}
              onClick={() => setDate(d)}
              className={`flex-shrink-0 w-20 py-3 rounded-2xl border transition-all ${
                isSelected 
                  ? 'bg-amber-400 text-black border-amber-400' 
                  : 'bg-white/5 border-white/10 hover:border-amber-400/50 hover:bg-white/10 text-white'
              }`}
            >
              <div className="text-xs uppercase font-medium mb-1 opacity-80">{format(d, 'EEE', { locale: tr })}</div>
              <div className="text-2xl font-bold">{format(d, 'dd')}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-4 text-white/70">Müsait Saatler</h3>
        {isLoading ? (
          <div className="text-center py-10 text-white/50 animate-pulse">Slotlar hesaplanıyor...</div>
        ) : slots?.length === 0 ? (
          <div className="text-center py-10 text-white/50 bg-white/5 rounded-2xl border border-white/5">
            Bu tarih için uygun saat bulunamadı. Lütfen başka bir gün seçin.
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {slots?.map((slot, i) => (
              <button
                key={i}
                disabled={slot.locked}
                onClick={() => setSlot(slot)}
                className={`py-3 rounded-xl border text-sm font-semibold transition-all ${
                  slot.locked 
                    ? 'opacity-30 cursor-not-allowed border-white/5 bg-transparent'
                    : selectedSlot?.startTime === slot.startTime
                      ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-white/5 border-white/10 hover:border-amber-400/50 hover:bg-white/10'
                }`}
              >
                {slot.startTime.substring(0, 5)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          disabled={!selectedSlot}
          onClick={() => setStep(4)}
          className="bg-amber-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Devam Et <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Confirm & Create ────────────────────────────────────────
function Step4Confirm() {
  const { selectedStaff, selectedService, selectedDate, selectedSlot, customerName, customerPhone, setCustomerDetails, setStep } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await api.createAppointment({
        serviceId: selectedService!.id,
        staffId: selectedStaff!.id,
        date: format(selectedDate!, 'yyyy-MM-dd'),
        startTime: selectedSlot!.startTime.substring(0, 5),
        customerName,
        customerPhone
      });
      setStep(5);
    } catch (err: any) {
      setErrorMsg(err.message || 'Bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold mb-6">Randevu Özeti</h2>
      
      <div className="bg-black/30 rounded-2xl p-6 border border-white/5 mb-8">
        <div className="flex justify-between py-2 border-b border-white/10 mb-2">
          <span className="text-white/50">Hizmet</span>
          <span className="font-semibold">{selectedService?.name}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/10 mb-2">
          <span className="text-white/50">Personel</span>
          <span className="font-semibold">{selectedStaff?.fullName}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/10 mb-2">
          <span className="text-white/50">Tarih</span>
          <span className="font-semibold">{selectedDate && format(selectedDate, 'dd MMMM yyyy', { locale: tr })}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-white/10 mb-2">
          <span className="text-white/50">Saat</span>
          <span className="font-semibold text-amber-400">{selectedSlot?.startTime.substring(0, 5)}</span>
        </div>
        <div className="flex justify-between py-2 mt-4 text-lg">
          <span className="text-white/50 font-medium">Toplam</span>
          <span className="font-bold text-amber-400">₺{selectedService?.price}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Ad Soyad</label>
          <input
            required
            type="text"
            value={customerName}
            onChange={(e) => setCustomerDetails(e.target.value, customerPhone)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
            placeholder="Adınızı giriniz"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Telefon Numarası</label>
          <input
            required
            type="tel"
            pattern="05[0-9]{9}"
            value={customerPhone}
            onChange={(e) => setCustomerDetails(customerName, e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
            placeholder="05XX XXX XX XX"
          />
        </div>

        {errorMsg && <div className="text-red-400 text-sm mt-2">{errorMsg}</div>}

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-amber-400 text-black font-bold px-8 py-4 rounded-xl hover:bg-amber-300 disabled:opacity-50 mt-6 transition-all"
        >
          {isSubmitting ? 'Onaylanıyor...' : 'Randevuyu Onayla'}
        </button>
      </form>
    </div>
  );
}

// ─── Step 5: Success ─────────────────────────────────────────────────
function Step5Success() {
  const { reset } = useBookingStore();
  const router = useRouter();

  return (
    <div className="text-center py-12 animate-in zoom-in-95 duration-500">
      <CheckCircle2 className="w-24 h-24 text-green-400 mx-auto mb-6" />
      <h2 className="text-3xl font-black mb-4">Randevunuz Onaylandı!</h2>
      <p className="text-white/60 mb-8 max-w-sm mx-auto">
        Bizi tercih ettiğiniz için teşekkür ederiz. Randevu detaylarınız sisteme başarıyla kaydedildi.
      </p>
      <button
        onClick={() => { reset(); router.push('/'); }}
        className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-all"
      >
        Ana Sayfaya Dön
      </button>
    </div>
  );
}
