'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.login(email, password);
      localStorage.setItem('berber_token', res.token);
      router.push('/admin');
    } catch (err: any) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-400">Admin Girişi</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-white/70">E-posta</label>
            <input 
              type="email" 
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-amber-400 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-white/70">Şifre</label>
            <input 
              type="password" 
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-amber-400 outline-none" 
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-amber-400 text-black font-bold py-3 rounded-lg hover:bg-amber-300">
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
