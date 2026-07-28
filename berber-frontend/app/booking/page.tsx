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
import Logo from '@/app/components/Logo';
import AnimatedBackground from '@/app/components/AnimatedBackground';
import Link from 'next/link';

export default function BookingPage() {
  const { step, setStep, selectedService, selectedStaff, selectedDate, selectedSlot } = useBookingStore();
  const router = useRouter();

  useEffect(() => {
    if (step === 2 && !selectedService) setStep(1);
    if (step === 3 && (!selectedService || !selectedStaff)) setStep(1);
    if (step === 4 && (!selectedService || !selectedStaff || !selectedDate || !selectedSlot)) setStep(1);
  }, [step, selectedService, selectedStaff, selectedDate, selectedSlot, setStep]);

  return (
    <div className="relative min-h-screen text-[#F5F5F5] py-6 sm:py-10 px-3 sm:px-6 overflow-x-hidden font-sans">
      {/* 60fps Interactive Animated Gold Dust & Mesh Background */}
      <AnimatedBackground />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Branding */}
        <div className="flex items-center justify-between mb-6 pb-4 sm:pb-6 border-b border-[#D4AF37]/20 backdrop-blur-sm">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <div className="text-right">
            <span className="text-[11px] sm:text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">Online Randevu</span>
            <p className="text-[10px] sm:text-[11px] text-white/50">Malatya</p>
          </div>
        </div>

        {/* Step Title Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : router.push('/')}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#141414]/80 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center text-[#F5E6BE] hover:border-[#D4AF37] hover:bg-[#1C1C1C] transition-all shadow-md shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-sans font-bold bg-gradient-to-r from-[#F5E6BE] via-[#D4AF37] to-[#AA8010] bg-clip-text text-transparent">
              {step === 5 ? 'Randevu Onayı' : 'Randevu Oluştur'}
            </h1>
            <p className="text-white/60 text-[11px] sm:text-xs tracking-wider uppercase font-medium mt-0.5">Adım {step} / 4</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 sm:h-2 flex-1 rounded-full transition-all duration-500 ${
                i <= step 
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#F5E6BE] to-[#AA8010] shadow-[0_0_15px_rgba(212,175,55,0.5)]' 
                  : 'bg-[#181818]/60 border border-white/10'
              }`} 
            />
          ))}
        </div>

        {/* Form Container */}
        <div className="glass-card rounded-3xl p-4 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
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

  if (isLoading) return <div className="text-center py-16 text-[#D4AF37] animate-pulse font-light">Hizmet listesi yükleniyor...</div>;
  if (error) return <div className="text-center py-16 text-red-400">Hizmetler yüklenirken hata oluştu.</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      <h2 className="text-xl sm:text-2xl font-sans font-bold mb-4 sm:mb-6 flex items-center gap-2.5 text-[#F5E6BE]">
        <Scissors className="text-[#D4AF37] w-5 h-5 sm:w-6 sm:h-6" /> Hizmet Seçiniz
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {services?.map((service) => (
          <button
            key={service.id}
            onClick={() => { setService(service); setStep(2); }}
            className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 min-h-[72px] ${
              selectedService?.id === service.id 
                ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)]' 
                : 'bg-[#0A0A0A]/70 border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#181818]'
            }`}
          >
            <div className="flex justify-between items-start mb-1.5">
              <h3 className="font-semibold text-base sm:text-lg text-white">{service.name}</h3>
              <span className="text-[#D4AF37] font-sans font-bold text-base sm:text-lg shrink-0 ml-2">₺{service.price}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{service.durationMinutes} dk sürmektedir</span>
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

  if (isLoading) return <div className="text-center py-16 text-[#D4AF37] animate-pulse font-light">Personel listesi yükleniyor...</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      <h2 className="text-xl sm:text-2xl font-sans font-bold mb-4 sm:mb-6 flex items-center gap-2.5 text-[#F5E6BE]">
        <User className="text-[#D4AF37] w-5 h-5 sm:w-6 sm:h-6" /> Berber/Stilist Seçiniz
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {staffList?.map((staff) => (
          <button
            key={staff.id}
            onClick={() => { setStaff(staff); setStep(3); }}
            className={`flex items-center gap-3.5 sm:gap-4 text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 min-h-[72px] ${
              selectedStaff?.id === staff.id 
                ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)]' 
                : 'bg-[#0A0A0A]/70 border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#181818]'
            }`}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#F5E6BE] to-[#AA8010] flex items-center justify-center text-lg sm:text-xl font-sans font-bold text-black shrink-0 shadow-lg">
              {staff.fullName.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-white">{staff.fullName}</h3>
              <p className="text-xs text-[#C5A880] tracking-wider font-medium">Usta Kuaför & Berber</p>
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
  
  const today = new Date();
  const dates = Array.from({ length: 7 }).map((_, i) => addDays(today, i));
  const activeDate = selectedDate || dates[0];

  useEffect(() => {
    if (!selectedDate) setDate(dates[0]);
  }, [selectedDate, setDate, dates]);

  const { data: slots, isLoading } = useQuery({
    queryKey: ['slots', selectedStaff?.id, selectedService?.id, format(activeDate, 'yyyy-MM-dd')],
    queryFn: () => api.getSlots(selectedStaff!.id, selectedService!.id, format(activeDate, 'yyyy-MM-dd')),
    enabled: !!selectedStaff && !!selectedService,
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      <h2 className="text-xl sm:text-2xl font-sans font-bold mb-4 sm:mb-6 flex items-center gap-2.5 text-[#F5E6BE]">
        <CalendarIcon className="text-[#D4AF37] w-5 h-5 sm:w-6 sm:h-6" /> Tarih ve Saat Seçimi
      </h2>
      
      {/* Date Selector Horizontal Scroll */}
      <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-3 mb-6 scrollbar-hide -mx-2 px-2">
        {dates.map((d) => {
          const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(d, 'yyyy-MM-dd');
          return (
            <button
              key={d.toISOString()}
              onClick={() => setDate(d)}
              className={`flex-shrink-0 w-16 sm:w-20 py-2.5 sm:py-3 rounded-2xl border transition-all ${
                isSelected 
                  ? 'bg-gradient-to-br from-[#D4AF37] to-[#AA8010] text-black font-bold border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                  : 'bg-[#0A0A0A]/70 border-white/10 hover:border-[#D4AF37]/50 text-white hover:bg-[#181818]'
              }`}
            >
              <div className="text-[10px] uppercase font-medium mb-0.5 opacity-80">{format(d, 'EEE', { locale: tr })}</div>
              <div className="text-xl sm:text-2xl font-bold">{format(d, 'dd')}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-3 text-white/80 text-xs sm:text-sm tracking-wider uppercase">Müsait Tıraş Saatleri</h3>
        {isLoading ? (
          <div className="text-center py-10 text-[#D4AF37] animate-pulse font-light">Müsaitlik durumu sorgulanıyor...</div>
        ) : slots?.length === 0 ? (
          <div className="text-center py-8 text-white/60 bg-[#0A0A0A]/70 rounded-2xl border border-white/10 text-xs sm:text-sm">
            Bu tarih için uygun saat bulunamadı. Lütfen başka bir gün seçin.
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3">
            {slots?.map((slot, i) => (
              <button
                key={i}
                disabled={slot.locked}
                onClick={() => setSlot(slot)}
                className={`py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
                  slot.locked 
                    ? 'opacity-30 cursor-not-allowed border-white/5 bg-transparent'
                    : selectedSlot?.startTime === slot.startTime
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5E6BE] text-black border-[#D4AF37] shadow-lg font-bold'
                      : 'bg-[#0A0A0A]/70 border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#181818] text-white'
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
          className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] via-[#F5E6BE] to-[#AA8010] text-black font-extrabold px-8 py-3.5 rounded-2xl hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-md"
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
      setErrorMsg(err.message || 'Randevu kaydedilirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans">
      <h2 className="text-xl sm:text-2xl font-sans font-bold mb-4 sm:mb-6 text-[#F5E6BE]">Randevu Özeti ve Onay</h2>
      
      <div className="bg-[#0A0A0A]/80 rounded-2xl p-4 sm:p-6 border border-[#D4AF37]/30 mb-6 sm:mb-8 space-y-2.5">
        <div className="flex justify-between py-1.5 border-b border-white/10">
          <span className="text-white/60 text-xs sm:text-sm">Seçilen Hizmet</span>
          <span className="font-semibold text-white text-xs sm:text-sm">{selectedService?.name}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-white/10">
          <span className="text-white/60 text-xs sm:text-sm">Stilist / Berber</span>
          <span className="font-semibold text-white text-xs sm:text-sm">{selectedStaff?.fullName}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-white/10">
          <span className="text-white/60 text-xs sm:text-sm">Tarih</span>
          <span className="font-semibold text-white text-xs sm:text-sm">{selectedDate && format(selectedDate, 'dd MMMM yyyy', { locale: tr })}</span>
        </div>
        <div className="flex justify-between py-1.5 border-b border-white/10">
          <span className="text-white/60 text-xs sm:text-sm">Randevu Saati</span>
          <span className="font-semibold text-[#D4AF37] text-xs sm:text-sm">{selectedSlot?.startTime.substring(0, 5)}</span>
        </div>
        <div className="flex justify-between py-2 pt-3 text-base sm:text-lg">
          <span className="text-white/80 font-medium">Toplam Ücret</span>
          <span className="font-sans font-extrabold text-xl sm:text-2xl text-[#D4AF37]">₺{selectedService?.price}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#C5A880] uppercase tracking-wider mb-1.5">Müşteri Ad Soyad</label>
          <input
            required
            type="text"
            value={customerName}
            onChange={(e) => setCustomerDetails(e.target.value, customerPhone)}
            className="w-full bg-[#0A0A0A] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-base focus:outline-none focus:border-[#D4AF37] transition-all"
            placeholder="Adınızı ve Soyadınızı giriniz"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#C5A880] uppercase tracking-wider mb-1.5">Telefon Numarası</label>
          <input
            required
            type="tel"
            pattern="05[0-9]{9}"
            value={customerPhone}
            onChange={(e) => setCustomerDetails(customerName, e.target.value)}
            className="w-full bg-[#0A0A0A] border border-white/15 rounded-2xl px-4 py-3.5 text-white text-base focus:outline-none focus:border-[#D4AF37] transition-all"
            placeholder="05XX XXX XX XX"
          />
        </div>

        {errorMsg && <div className="text-red-400 text-xs sm:text-sm mt-2">{errorMsg}</div>}

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F5E6BE] to-[#AA8010] text-black font-extrabold px-8 py-4 rounded-2xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-4 transition-all text-base sm:text-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] min-h-[48px]"
        >
          {isSubmitting ? 'Randevunuz İşleniyor...' : 'Randevuyu Tamamla & Onayla'}
        </button>
      </form>
    </div>
  );
}

// ─── Step 5: Success ─────────────────────────────────────────────────
function Step5Success() {
  const { reset } = useBookingStore();
  const router = useRouter();

  const whatsappMessage = encodeURIComponent(
    'Merhaba Luxury Barber Malatya, web siteniz üzerinden randevumu oluşturdum. Randevumu onaylamak/bilgi almak istiyorum.'
  );

  return (
    <div className="text-center py-8 sm:py-12 animate-in zoom-in-95 duration-500 font-sans">
      <CheckCircle2 className="w-20 h-20 sm:w-24 sm:h-24 text-[#D4AF37] mx-auto mb-6 drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]" />
      <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F5E6BE] mb-3 sm:mb-4">Randevunuz Başarıyla Alındı!</h2>
      <p className="text-white/70 mb-6 sm:mb-8 max-w-md mx-auto font-light leading-relaxed text-xs sm:text-sm px-2">
        Luxury Barber Malatya salonumuzda sizleri ağırlamaktan onur duyacağız. Randevu detaylarınız sisteme kaydedilmiştir.
      </p>

      <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center max-w-md mx-auto">
        <a
          href={`https://wa.me/904223254400?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-2xl transition-all shadow-lg text-sm sm:text-base min-h-[44px]"
        >
          <span>WhatsApp&apos;tan Bilgi Ver</span>
        </a>

        <button
          onClick={() => { reset(); router.push('/'); }}
          className="w-full sm:w-auto bg-[#181818]/90 border border-[#D4AF37]/40 text-[#F5E6BE] font-semibold px-7 py-3.5 rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-all shadow-md backdrop-blur-md text-sm sm:text-base min-h-[44px]"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}
