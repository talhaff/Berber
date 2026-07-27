'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { format, addDays, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock, User, Phone, Check, X, RefreshCw } from 'lucide-react';
import { AppointmentStatus, AppointmentResponse } from '@/types';

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
      case 'PENDING': return <span className="bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs font-bold">BEKLEMEDE</span>;
      case 'IN_CHAIR': return <span className="bg-blue-400/20 text-blue-400 px-2 py-1 rounded text-xs font-bold">KOLTUKTA</span>;
      case 'COMPLETED': return <span className="bg-green-400/20 text-green-400 px-2 py-1 rounded text-xs font-bold">TAMAMLANDI</span>;
      case 'CANCELLED': return <span className="bg-red-400/20 text-red-400 px-2 py-1 rounded text-xs font-bold">İPTAL</span>;
      case 'NOSHOW': return <span className="bg-gray-400/20 text-gray-400 px-2 py-1 rounded text-xs font-bold">GELMEDİ</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Günlük Randevular</h2>
        <div className="flex items-center gap-4 bg-white/5 rounded-lg p-1 border border-white/10">
          <button onClick={() => setDate(subDays(date, 1))} className="p-2 hover:bg-white/10 rounded"><ChevronLeft className="w-5 h-5"/></button>
          <span className="font-semibold w-32 text-center">{format(date, 'dd MMM yyyy', { locale: tr })}</span>
          <button onClick={() => setDate(addDays(date, 1))} className="p-2 hover:bg-white/10 rounded"><ChevronRight className="w-5 h-5"/></button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-white/50 animate-pulse">Randevular yükleniyor...</div>
      ) : appointments?.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-white/50">
          Bu güne ait randevu bulunmuyor.
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments?.map((apt) => (
            <div key={apt.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between hover:bg-white/10 transition-colors">
              <div className="flex gap-4 items-center">
                <div className="text-center px-4 border-r border-white/10">
                  <div className="text-lg font-bold text-amber-400">{apt.startTime.substring(11, 16)}</div>
                  <div className="text-xs text-white/50">{apt.durationMinutes} dk</div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{apt.customerName}</h3>
                  <div className="flex items-center gap-3 text-sm text-white/60 mt-1">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {apt.customerPhone}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3"/> {apt.staffName}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="text-right">
                  <div className="font-bold">₺{apt.price}</div>
                  <div className="text-sm text-white/60">{apt.serviceName}</div>
                </div>
                
                <div className="flex items-center gap-2">
                  {getStatusBadge(apt.status)}
                  
                  {apt.status === 'PENDING' && (
                    <>
                      <button onClick={() => updateStatus.mutate({ id: apt.id, status: 'IN_CHAIR' })} className="p-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 rounded-lg" title="Koltuğa Al">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button onClick={() => updateStatus.mutate({ id: apt.id, status: 'CANCELLED' })} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg" title="İptal Et">
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {apt.status === 'IN_CHAIR' && (
                    <button onClick={() => updateStatus.mutate({ id: apt.id, status: 'COMPLETED' })} className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/40 rounded-lg" title="Tamamla">
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
