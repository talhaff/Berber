'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from '@/app/components/Logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('berber_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (token) {
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  if (!isAuthenticated && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#D4AF37] animate-pulse">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
      {isAuthenticated && (
        <nav className="border-b border-[#D4AF37]/20 bg-[#0A0A0A]/90 backdrop-blur-md px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Logo size="sm" showText={false} />
              <h1 className="font-serif font-bold text-lg bg-gradient-to-r from-[#F5E6BE] to-[#D4AF37] bg-clip-text text-transparent">
                Luxury Barber <span className="text-xs font-sans text-white/40 font-normal uppercase ml-1">Yönetim Paneli</span>
              </h1>
            </div>

            <button 
              onClick={() => { sessionStorage.removeItem('berber_token'); router.push('/admin/login'); }}
              className="text-xs font-medium text-white/60 hover:text-[#D4AF37] border border-white/10 px-4 py-2 rounded-xl hover:border-[#D4AF37]/40 transition-all"
            >
              Çıkış Yap
            </button>
          </div>
        </nav>
      )}
      <main className={isAuthenticated ? "p-6" : ""}>{children}</main>
    </div>
  );
}
