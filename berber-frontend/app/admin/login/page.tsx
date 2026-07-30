'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Logo from '@/app/components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.login(email, password);
      sessionStorage.setItem('berber_token', res.token);
      router.push('/admin');
    } catch (err: any) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-[#D4AF37]/30 p-8 md:p-10 rounded-3xl w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" showText={false} />
          <h2 className="text-2xl font-serif font-black mt-4 text-center bg-gradient-to-r from-[#F5E6BE] via-[#D4AF37] to-[#AA8010] bg-clip-text text-transparent">
            Yönetici Girişi
          </h2>
          <p className="text-xs text-white/40 mt-1">Luxury Barber Malatya Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[#C5A880]">E-posta Adresi</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#D4AF37] focus:outline-none transition-all" 
              placeholder="admin@berber.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[#C5A880]">Şifre</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-3.5 text-white focus:border-[#D4AF37] focus:outline-none transition-all" 
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F5E6BE] to-[#AA8010] text-black font-extrabold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] text-base mt-2"
          >
            Sisteme Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
