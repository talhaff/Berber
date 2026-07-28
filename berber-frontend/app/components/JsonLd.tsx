import React from 'react';

export default function JsonLd() {
  const barberShopSchema = {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    'name': 'Luxury Barber Malatya',
    'image': 'https://luxurybarbermalatya.com/logo.png',
    '@id': 'https://luxurybarbermalatya.com/#barbershop',
    'url': 'https://luxurybarbermalatya.com',
    'telephone': '+904223254400',
    'priceRange': '₺₺',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Fahri Kayahan Bulvarı, Yeşilyurt',
      'addressLocality': 'Yeşilyurt',
      'addressRegion': 'Malatya',
      'postalCode': '44090',
      'addressCountry': 'TR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 38.3552,
      'longitude': 38.3095
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        'opens': '09:00',
        'closes': '21:00'
      }
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '128',
      'bestRating': '5',
      'worstRating': '1'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Erkek Bakım Hizmetleri',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Tasarım Saç Kesimi',
            'description': 'Kafa yapınıza ve tarzınıza özel saç kesimi'
          },
          'price': '150.00',
          'priceCurrency': 'TRY'
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Geleneksel Sakal Tıraşı',
            'description': 'Sıcak havlu kompresli ustura sakal tıraşı'
          },
          'price': '100.00',
          'priceCurrency': 'TRY'
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Komple Bakım Paketi',
            'description': 'Saç kesimi, sakal tasarımı ve cilt bakımı'
          },
          'price': '220.00',
          'priceCurrency': 'TRY'
        }
      ]
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Malatya Luxury Barber salonu nerede?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Luxury Barber salonumuz Malatya Yeşilyurt Fahri Kayahan Bulvarı üzerinde bulunmaktadır.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Online berber randevusu nasıl alınır?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Web sitemiz üzerinden 7/24 dilediğiniz gün, saat, hizmet ve berber stilistini seçerek saniyeler içinde online randevu alabilirsiniz.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Malatya erkek saç kesimi ve tıraş fiyatları ne kadar?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Tasarım saç kesimi ₺150, geleneksel sakal tıraşı ₺100, komple bakım paketi ise ₺220 fiyat tarifesiyle sunulmaktadır.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(barberShopSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
