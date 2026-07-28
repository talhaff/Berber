import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import JsonLd from './components/JsonLd';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://luxurybarbermalatya.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Luxury Barber Malatya | En İyi Erkek Kuaförü & Berber Salonu',
    template: '%s | Luxury Barber Malatya',
  },
  description: "Malatya Yeşilyurt Fahri Kayahan Bulvarı'nda özel saç kesimi, sakal tasarımı ve erkek kişisel bakım hizmetleri. Saniye içinde 7/24 online randevu alın!",
  keywords: [
    'malatya berber',
    'malatya kuaför',
    'malatya erkek berber',
    'malatya erkek kuaförü',
    'malatya saç kesimi',
    'yeşilyurt berber',
    'fahri kayahan berber',
    'fahri kayahan kuaför',
    'malatya sakal tıraşı',
    'luxury barber malatya',
    'online berber randevu malatya',
  ],
  authors: [{ name: 'Luxury Barber Malatya' }],
  creator: 'Luxury Barber Malatya',
  publisher: 'Luxury Barber Malatya',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Luxury Barber Malatya | En Prestijli Erkek Kuaför Salonu',
    description: "Malatya Yeşilyurt'ta ustalıkla işlenen tarzınız için online randevunuzu hemen oluşturun.",
    url: siteUrl,
    siteName: 'Luxury Barber Malatya',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Luxury Barber Malatya Erkek Kuaförü',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Barber Malatya | Erkek Bakımında Lüksün Zirvesi',
    description: 'Malatya Yeşilyurt Fahri Kayahan Bulvarı salonumuzda 7/24 online randevu imkanı.',
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={jakarta.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
