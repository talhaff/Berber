'use client';
import Link from 'next/link';
import { Scissors, Clock, Star, Users, ChevronRight, Phone, MapPin } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-amber-400" />
            <span className="text-xl font-bold tracking-tight">BerberUmut</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#hizmetler" className="hover:text-white transition-colors">Hizmetler</a>
            <a href="#hakkimizda" className="hover:text-white transition-colors">Hakkımızda</a>
            <a href="#iletisim" className="hover:text-white transition-colors">İletişim</a>
          </div>
          <Link
            href="/booking"
            className="bg-amber-400 text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-amber-300 transition-all hover:scale-105 active:scale-95"
          >
            Randevu Al
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 text-sm text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>İstanbul&apos;un En İyi Berber Deneyimi</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
            Stilinizi
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Yeniden Keşfedin
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Profesyonel berberlerimizle kolayca online randevu alın.
            Saç kesimi, sakal tıraşı ve daha fazlası için bizi tercih edin.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="group bg-amber-400 text-black font-bold px-8 py-4 rounded-2xl hover:bg-amber-300 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg"
            >
              Hemen Randevu Al
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#hizmetler"
              className="border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-lg"
            >
              Hizmetlerimiz
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '5K+', label: 'Mutlu Müşteri' },
              { value: '10+', label: 'Yıl Deneyim' },
              { value: '4.9★', label: 'Ortalama Puan' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-amber-400">{stat.value}</div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="hizmetler" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Hizmetlerimiz</h2>
            <p className="text-white/50 text-lg">Her ihtiyacınız için profesyonel çözümler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-amber-400/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-white/50 text-sm mb-4">{service.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-white/40 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <span className="text-amber-400 font-bold text-lg">{service.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-amber-400 text-black font-bold px-8 py-4 rounded-2xl hover:bg-amber-300 transition-all hover:scale-105"
            >
              Randevu Al <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="hakkimizda" className="py-24 px-6 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Neden <span className="text-amber-400">Bizi</span> Seçmelisiniz?</h2>
              <div className="space-y-6">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{f.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-3xl p-8 border border-amber-400/20">
                <div className="text-6xl text-center mb-6">✂️</div>
                <div className="space-y-4">
                  {testimonials.map((t, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-1 text-amber-400 mb-2">
                        {Array(5).fill(null).map((_, j) => <Star key={j} className="w-3 h-3 fill-amber-400" />)}
                      </div>
                      <p className="text-sm text-white/70 italic">&ldquo;{t.text}&rdquo;</p>
                      <p className="text-xs text-white/40 mt-2">— {t.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="iletisim" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-amber-400/10 to-transparent border border-amber-400/20 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-black mb-4">Bize Ulaşın</h2>
            <p className="text-white/50 mb-8">Sorularınız için her zaman buradayız</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-amber-400" />
                <span>+90 555 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Kadıköy, İstanbul</span>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-amber-400 text-black font-bold px-10 py-4 rounded-2xl hover:bg-amber-300 transition-all hover:scale-105 text-lg"
              >
                Hemen Randevu Al <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/30 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Scissors className="w-4 h-4 text-amber-400" />
          <span className="text-white font-semibold">BerberUmut</span>
        </div>
        <p>© 2024 BerberUmut. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

const services = [
  { icon: '✂️', name: 'Saç Kesimi', desc: 'Trendlere uygun, kişiye özel saç kesimi ve şekillendirme.', duration: '30 dk', price: '₺150' },
  { icon: '🪒', name: 'Sakal Tıraşı', desc: 'Geleneksel ustura ve modern tekniklerle mükemmel sakal.', duration: '20 dk', price: '₺100' },
  { icon: '💈', name: 'Saç + Sakal', desc: 'Komple bakım paketi, tam bir dönüşüm için.', duration: '45 dk', price: '₺220' },
  { icon: '👦', name: 'Çocuk Kesimi', desc: 'Çocuklar için eğlenceli ve hızlı saç kesimi.', duration: '20 dk', price: '₺100' },
  { icon: '🎨', name: 'Saç Boyama', desc: 'Profesyonel boyama ile yeni bir görünüm.', duration: '90 dk', price: '₺400' },
  { icon: '✂️', name: 'Bıyık Düzeltme', desc: 'Şekil ve bakım için hassas bıyık düzeltme.', duration: '15 dk', price: '₺60' },
];

const features = [
  { icon: Clock, title: 'Online Randevu', desc: '7/24 online randevu alın, bekleme zamanından kurtulun.' },
  { icon: Users, title: 'Uzman Ekip', desc: '10+ yıl deneyimli, sertifikalı berberlerimizle tanışın.' },
  { icon: Star, title: 'Premium Ürünler', desc: 'Sadece en kaliteli saç bakım ürünleri kullanıyoruz.' },
];

const testimonials = [
  { text: 'Hayatımın en iyi saç kesimini burada aldım. Kesinlikle tavsiye ederim!', name: 'Ahmet K.' },
  { text: 'Online randevu sistemi çok pratik. Artık bekleme yok!', name: 'Mehmet S.' },
];
