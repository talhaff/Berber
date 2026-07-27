'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('berber_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else if (token) {
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  if (!isAuthenticated && pathname !== '/admin/login') {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {isAuthenticated && (
        <nav className="border-b border-white/10 bg-black/50 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="font-bold text-amber-400">BerberUmut Admin</h1>
            <button 
              onClick={() => { localStorage.removeItem('berber_token'); router.push('/admin/login'); }}
              className="text-sm text-white/60 hover:text-white"
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
