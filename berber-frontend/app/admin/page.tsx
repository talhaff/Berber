'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { format, addDays, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, User, Phone, Check, X, RefreshCw, Calendar as CalendarIcon, DollarSign, Activity, CheckCircle2 } from 'lucide-react';
import { AppointmentStatus } from '@/types';

export default function AdminDashboard() {
  const [date, setDate] = useState(new Date());
  const queryClient = useQueryClient();

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments', format(date, 'yyyy-MM-dd')],
    queryFn: () => api.getDayAppointments(format(date, 'yyyy-MM-dd')),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: AppointmentStatus }) => 
      api.updateAppointmentStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['appointments'] }),
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'PENDING': 
        return <span className="bg-[#D4AF37]/20 text-[#F5E6BE] border border-[#D4AF37]/30 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider shrink-0">BEKLEMEDE</span>;
      case 'IN_CHAIR': 
        return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider shrink-0">KOLTUKTA</span>;
      case 'COMPLETED': 
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider shrink-0">TAMAMLANDI</span>;
      case 'CANCELLED': 
        return <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider shrink-0">İPTAL</span>;
      case 'NOSHOW': 
        return <span className="bg-gray-500/20 text-gray-400 border border-gray-500/30 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider shrink-0">GELMEDİ</span>;
    }
  };

  // Stat Calculations
  const totalCount = appointments?.length || 0;
  const pendingCount = appointments?.filter(a => a.status === 'PENDING').length || 0;
  const inChairCount = appointments?.filter(a => a.status === 'IN_CHAIR').length || 0;
  const totalRevenue = appointments?.reduce((acc, a) => a.status !== 'CANCELLED' ? acc + a.price : acc, 0) || 0;

  return (
    <div className="max-w-7xl mx-auto py-2 sm:py-4 font-sans">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white">Günlük Randevular</h2>
          <p className="text-xs text-[#C5A880] mt-1 font-medium">Luxury Barber Malatya Salon Yönetimi</p>
        </div>
        
        <div className="flex items-center justify-between w-full md:w-auto gap-3 bg-[#141414] rounded-2xl p-1.5 border border-[#D4AF37]/20 shadow-lg">
          <button onClick={() => setDate(subDays(date, 1))} className="p-2.5 hover:bg-[#202020] text-[#D4AF37] rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5"/>
          </button>
          <span className="font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 text-[#F5E6BE] px-2">
            <CalendarIcon className="w-4 h-4 text-[#D4AF37]" />
            {format(date, 'dd MMM yyyy', { locale: tr })}
          </span>
          <button onClick={() => setDate(addDays(date, 1))} className="p-2.5 hover:bg-[#202020] text-[#D4AF37] rounded-xl transition-colors">
            <ChevronRight className="w-5 h-5"/>
          </button>
        </div>
      </div>

      {/* Quick Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-white/50">Toplam Randevu</div>
            <div className="text-xl font-bold text-white mt-0.5">{totalCount}</div>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#F5E6BE]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-white/50">Bekleyenler</div>
            <div className="text-xl font-bold text-[#F5E6BE] mt-0.5">{pendingCount}</div>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-white/50">Koltuğa Alınan</div>
            <div className="text-xl font-bold text-blue-400 mt-0.5">{inChairCount}</div>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-white/50">Günlük Ciro</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">₺{totalRevenue}</div>
          </div>
        </div>
      </div>

      {/* Appointment Cards List */}
      {isLoading ? (
        <div className="text-center py-20 text-[#D4AF37] animate-pulse">Randevular yükleniyor...</div>
      ) : appointments?.length === 0 ? (
        <div className="bg-[#141414] border border-[#D4AF37]/15 rounded-3xl p-10 sm:p-16 text-center text-white/50 shadow-xl text-sm">
          Bu tarihe ait kayıtlı randevu bulunmuyor.
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {appointments?.map((apt) => (
            <div key={apt.id} className="bg-[#141414] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between hover:border-[#D4AF37]/40 hover:bg-[#181818] transition-all shadow-md">
              <div className="flex gap-3.5 sm:gap-5 items-center">
                <div className="text-center px-3 sm:px-4 py-2 bg-[#0A0A0A] rounded-xl border border-[#D4AF37]/20 min-w-[80px] sm:min-w-[90px] shrink-0">
                  <div className="text-base sm:text-lg font-sans font-bold text-[#D4AF37]">{apt.startTime.substring(11, 16)}</div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">{apt.durationMinutes} dk</div>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white">{apt.customerName}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 mt-1">
                    <span className="flex items-center gap-1.5 text-[#F5E6BE]"><Phone className="w-3.5 h-3.5 text-[#D4AF37]"/> {apt.customerPhone}</span>
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#D4AF37]"/> {apt.staffName}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                <div className="text-left md:text-right">
                  <div className="font-sans font-bold text-lg sm:text-xl text-[#D4AF37]">₺{apt.price}</div>
                  <div className="text-xs text-white/60 font-medium">{apt.serviceName}</div>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start pt-2 sm:pt-0">
                  {getStatusBadge(apt.status)}
                  
                  {apt.status === 'PENDING' && (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateStatus.mutate({ id: apt.id, status: 'IN_CHAIR' })} 
                        className="p-2.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 rounded-xl transition-colors border border-blue-500/30" 
                        title="Koltuğa Al"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => updateStatus.mutate({ id: apt.id, status: 'CANCELLED' })} 
                        className="p-2.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 rounded-xl transition-colors border border-rose-500/30" 
                        title="İptal Et"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {apt.status === 'IN_CHAIR' && (
                    <button 
                      onClick={() => updateStatus.mutate({ id: apt.id, status: 'COMPLETED' })} 
                      className="p-2.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 rounded-xl transition-colors border border-emerald-500/30" 
                      title="Tamamla"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
