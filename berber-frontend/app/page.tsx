'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Scissors, Clock, Star, Users, ChevronRight, Phone, MapPin, Award, ShieldCheck, Sparkles, Menu, X, Calendar, HelpCircle, ChevronDown } from 'lucide-react';
// BerberUmut - Luxury Barber Shop Web Application
import Logo from './components/Logo';
import AnimatedBackground from './components/AnimatedBackground';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen text-[#F5F5F5] font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* 60fps Interactive Animated Gold Dust & Mesh Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0A0A0A]/85 border-b border-[#D4AF37]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Logo size="md" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium text-white/80">
            <a href="#hizmetler" className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">
              Hizmetler
            </a>
            <a href="#hakkimizda" className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">
              Ayrıcalıklar
            </a>
            <a href="#sss" className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">
              S.S.S.
            </a>
            <a href="#iletisim" className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">
              İletişim & Lokasyon
            </a>
          </div>

          {/* Desktop Header CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F5E6BE] to-[#AA8010] text-black font-extrabold px-5 py-2.5 rounded-2xl hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 text-sm"
            >
              <Calendar className="w-4 h-4 text-black" />
              <span>Randevu Al</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-[#141414] border border-[#D4AF37]/35 text-[#F5E6BE] hover:bg-[#1C1C1C] transition-all shadow-md active:scale-95"
            aria-label="Mobil Menü"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6 text-[#D4AF37]" />}
          </button>
        </div>
      </nav>

      {/* Fullscreen Ultra-Luxury Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A]/98 backdrop-blur-3xl md:hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-[#D4AF37]/20">
            <Logo size="md" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#1C1C1C]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-[0.25em]">Menü Navigasyon</span>
              <a
                href="#hizmetler"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#141414] border border-white/5 text-lg font-medium text-white hover:border-[#D4AF37]/40"
              >
                <span className="flex items-center gap-3">
                  <Scissors className="w-5 h-5 text-[#D4AF37]" /> Hizmetlerimiz
                </span>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </a>

              <a
                href="#hakkimizda"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#141414] border border-white/5 text-lg font-medium text-white hover:border-[#D4AF37]/40"
              >
                <span className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#D4AF37]" /> Ayrıcalıklarımız
                </span>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </a>

              <a
                href="#sss"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#141414] border border-white/5 text-lg font-medium text-white hover:border-[#D4AF37]/40"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#D4AF37]" /> Sıkça Sorulan Sorular
                </span>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </a>

              <a
                href="#iletisim"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#141414] border border-white/5 text-lg font-medium text-white hover:border-[#D4AF37]/40"
              >
                <span className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" /> İletişim & Lokasyon
                </span>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </a>
            </div>

            {/* Mobile Drawer Actions & Quick Contact */}
            <div className="space-y-4 pt-4 border-t border-[#D4AF37]/20">
              <Link
                href="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D4AF37] via-[#F5E6BE] to-[#AA8010] text-black font-extrabold px-6 py-4 rounded-2xl text-center text-lg shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                <Calendar className="w-5 h-5 text-black" />
                <span>Online Randevu Al</span>
              </Link>

              <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex items-center justify-between text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>+90 (422) 325 44 00</span>
                </div>
                <span className="text-[#F5E6BE] font-semibold">Malatya</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Wrap for Semantic HTML */}
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-10 md:pt-40 md:pb-12 flex items-center justify-center z-10 px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto w-full">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-[#141414]/90 backdrop-blur-md border border-[#D4AF37]/35 rounded-full px-4 py-2 sm:px-5 sm:py-2 mb-6 text-[11px] sm:text-xs font-medium tracking-wide text-[#F5E6BE] shadow-[0_0_20px_rgba(212,175,55,0.12)]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="truncate">Malatya&apos;nın Seçkin Erkek Kuaförü</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight mb-6 leading-[1.18] sm:leading-[1.15]">
              Malatya Erkek Kuaförü &amp;
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#F5E6BE] via-[#D4AF37] to-[#AA8010] bg-clip-text text-transparent">
                Lüksün Zirvesi
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-xl text-white/70 mb-8 max-w-2xl mx-auto font-normal leading-relaxed px-2">
              Malatya Yeşilyurt Fahri Kayahan&apos;da uzman berber kadromuzla özel tasarım saç kesimi, sakal tıraşı ve erkek kişisel bakım hizmetleri sunuyoruz.
            </p>

            {/* Hero Actions */}
            <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center px-2">
              <Link
                href="/booking"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] via-[#F5E6BE] to-[#AA8010] text-black font-bold px-8 py-3.5 rounded-2xl hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base"
              >
                <span>Hemen Randevu Oluştur</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="#hizmetler"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#D4AF37]/35 bg-[#141414]/80 backdrop-blur-md text-[#F5E6BE] font-semibold px-8 py-3.5 rounded-2xl hover:bg-[#1C1C1C] hover:border-[#D4AF37]/70 transition-all duration-300 text-base shadow-lg"
              >
                Hizmet Kataloğu
              </a>
            </div>

            {/* Key Stats */}
            <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto pt-6 border-t border-[#D4AF37]/20 px-2">
              {[
                { value: '5.000+', label: 'Mutlu Müşteri' },
                { value: '12+', label: 'Yıllık Deneyim' },
                { value: '4.9★', label: 'Memnuniyet' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-sans font-extrabold bg-gradient-to-r from-[#F5E6BE] to-[#D4AF37] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/50 mt-1 font-medium tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="hizmetler" className="py-12 md:py-16 px-4 sm:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-semibold">Malatya Berber Hizmetleri</span>
              <h2 className="text-3xl md:text-5xl font-sans font-bold mt-2 mb-3">Erkek Kuaför Hizmetlerimiz</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
              <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto font-normal">
                Malatya&apos;da usta berberlerimizle uygulanan en üst seviye saç kesimi ve sakal tasarımı.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="group relative glass-card rounded-3xl p-6 sm:p-7 transition-all duration-400 hover:-translate-y-1.5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37]/25 to-[#AA8010]/15 border border-[#D4AF37]/35 flex items-center justify-center text-xl mb-5 text-[#D4AF37] group-hover:scale-105 transition-transform duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-sans font-bold mb-2 text-white group-hover:text-[#F5E6BE] transition-colors">{service.name}</h3>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed font-normal">{service.desc}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{service.duration}</span>
                    </div>
                    <span className="text-xl font-sans font-extrabold bg-gradient-to-r from-[#F5E6BE] to-[#D4AF37] bg-clip-text text-transparent">
                      {service.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-10">
              <Link
                href="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#181818]/90 border border-[#D4AF37]/45 text-[#F5E6BE] hover:bg-[#D4AF37] hover:text-black font-bold px-8 py-3.5 rounded-2xl transition-all duration-300 shadow-md text-base backdrop-blur-md"
              >
                <span>Seçtiğiniz Hizmet İçin Randevu Alın</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Luxury Barber */}
        <section id="hakkimizda" className="py-12 md:py-16 px-4 sm:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
              <div>
                <span className="text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-semibold">Luxury Barber Deneyimi</span>
                <h2 className="text-3xl md:text-4xl font-sans font-extrabold mt-2 mb-6">
                  Neden Malatya&apos;da <span className="bg-gradient-to-r from-[#F5E6BE] via-[#D4AF37] to-[#AA8010] bg-clip-text text-transparent">Luxury Barber</span>?
                </h2>
                
                <div className="space-y-6">
                  {features.map((f, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37] transition-colors">
                        <f.icon className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1">{f.title}</h3>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-normal">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="relative">
                <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/35 shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="w-7 h-7 text-[#D4AF37]" />
                    <div>
                      <h4 className="font-sans font-bold text-base text-white">Müşteri Yorumları</h4>
                      <p className="text-xs text-[#C5A880]">Malatya Salonumuzdan Notlar</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {testimonials.map((t, i) => (
                      <div key={i} className="bg-[#0A0A0A]/70 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-[#D4AF37]/40 transition-colors">
                        <div className="flex items-center gap-1 text-[#D4AF37] mb-2">
                          {Array(5).fill(null).map((_, j) => (
                            <Star key={j} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-white/80 italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#F5E6BE]">— {t.name}</span>
                          <span className="text-[10px] text-white/40 font-medium">Doğrulanmış Müşteri</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for High Local SEO Ranking */}
        <section id="sss" className="py-12 md:py-16 px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-semibold">Merak Edilenler</span>
              <h2 className="text-3xl md:text-4xl font-sans font-extrabold mt-2 mb-3">Sıkça Sorulan Sorular</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />
              <p className="text-white/60 text-sm max-w-lg mx-auto">
                Malatya berber ve kuaför hizmetlerimiz hakkında tüm merak edilenler.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 text-white hover:text-[#F5E6BE]"
                  >
                    <span className="font-semibold text-base sm:text-lg flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 shrink-0 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaqIndex === i && (
                    <div className="px-5 pb-5 text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Contact Section */}
        <section id="iletisim" className="py-12 md:py-16 px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="relative glass-card border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-10 md:p-12 text-center shadow-xl">
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-semibold">İletişim & Konum</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold mt-2 mb-3">Malatya Salonumuz</h2>
              <p className="text-white/60 mb-6 sm:mb-8 max-w-lg mx-auto font-normal text-xs sm:text-sm">
                Fahri Kayahan Bulvarı&apos;nda konforlu atmosferimizle hizmetinizdeyiz.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mb-8">
                <div className="bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col items-center hover:border-[#D4AF37]/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center mb-3 border border-[#D4AF37]/30">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-semibold text-white mb-1 text-sm">Adres</h3>
                  <p className="text-white/70 text-xs">Fahri Kayahan Bulvarı, Yeşilyurt / Malatya</p>
                </div>

                <div className="bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col items-center hover:border-[#D4AF37]/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center mb-3 border border-[#D4AF37]/30">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-semibold text-white mb-1 text-sm">Telefon & Bilgi</h3>
                  <p className="text-white/70 text-xs">+90 (422) 325 44 00</p>
                </div>
              </div>

              <Link
                href="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D4AF37] via-[#F5E6BE] to-[#AA8010] text-black font-extrabold px-10 py-4 rounded-2xl hover:shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 text-base"
              >
                <span>Koltuğunuzu Ayırtın</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#D4AF37]/20 py-8 sm:py-10 px-4 sm:px-6 bg-[#0A0A0A]/90 backdrop-blur-md relative z-10 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <Link 
            href="/" 
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Logo size="sm" />
          </Link>
          
          <div className="text-xs text-white/50 font-normal">
            &copy; 2026 <span className="text-[#F5E6BE] font-semibold">Luxury Barber Malatya.</span>Talha Özcan. Tüm hakları saklıdır.
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs text-white/40 font-normal">
            <span>Gizlilik Politikası</span>
            <span>&bull;</span>
            <span>Kullanım Koşulları</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const services = [
  { icon: '✂️', name: 'Tasarım Saç Kesimi', desc: 'Kafa yapınıza ve tarzınıza özel, ustalıkla şekillendirilmiş saç kesimi.', duration: '30 dk', price: '₺150' },
  { icon: '🪒', name: 'Geleneksel Sakal Tıraşı', desc: 'Sıcak havlu kompresi, ustura hassasiyeti ve besleyici bakım yağları.', duration: '20 dk', price: '₺100' },
  { icon: '💈', name: 'Komple Bakım Paketi', desc: 'Saç kesimi, sakal tasarımı, cilt bakımı ve saç yıkama ritüeli.', duration: '45 dk', price: '₺220' },
  { icon: '👦', name: 'Çocuk Saç Kesimi', desc: 'Çocuklarımız için özel tasarlanmış, konforlu ve modern saç kesimi.', duration: '20 dk', price: '₺100' },
  { icon: '🎨', name: 'Saç Renklendirme', desc: 'Doğal görünümlü gri kaplama veya özel tonlama uygulamaları.', duration: '90 dk', price: '₺400' },
  { icon: '✂️', name: 'Bıyık & Sakal Düzeltme', desc: 'Hassas sakal hattı çizimi ve sakal formu düzenleme.', duration: '15 dk', price: '₺60' },
];

const features = [
  { icon: Clock, title: 'Kesintisiz 7/24 Online Randevu', desc: 'Sıra beklemeden, dilediğiniz gün ve saat için anında randevu oluşturun.' },
  { icon: Users, title: 'Uzman Berber Kadrosu', desc: 'Alanında 10 yıldan fazla tecrübeye sahip profesyonel ekibimiz.' },
  { icon: ShieldCheck, title: 'Steril & Kaliteli Ürünler', desc: 'Kişiye özel sterilize edilmiş ekipmanlar ve kaliteli bakım ürünleri.' },
];

const testimonials = [
  { text: 'Malatya\'da böyle kaliteli bir erkek kuaförü olması harika. Fahri Kayahan\'daki rahat konsept için teşekkürler!', name: 'Murat Y.' },
  { text: 'Online randevu sistemi çok pratik. Beklemeden koltuğa oturup hizmet alıyorsunuz.', name: 'Selim K.' },
];

const faqs = [
  {
    q: 'Malatya Luxury Barber salonu tam nerede?',
    a: 'Salonumuz Malatya Yeşilyurt Fahri Kayahan Bulvarı üzerinde, rahat ulaşılabilir ve otopark imkanı olan prestijli bir konumda yer almaktadır.'
  },
  {
    q: 'Online randevu nasıl alabilirim?',
    a: 'Sitemizdeki "Randevu Al" butonuna tıklayarak istediğiniz saç/sakal hizmetini, tercih ettiğiniz stilisti ve müsait saati seçip saniyeler içinde randevunuzu tamamlayabilirsiniz.'
  },
  {
    q: 'Saç kesimi ve tıraş fiyatları ne kadar?',
    a: 'Özel tasarım saç kesimi ₺150, sakal tıraşı ₺100, saç + sakal ve cilt bakımını içeren komple paketimiz ise ₺220 fiyat tarifesiyle sunulmaktadır.'
  },
  {
    q: 'Çalışma saatleriniz nedir?',
    a: 'Pazartesi - Cumartesi günleri arasında 09:00 - 21:00 saatleri arasında kesintisiz randevulu hizmet vermekteyiz.'
  }
];
