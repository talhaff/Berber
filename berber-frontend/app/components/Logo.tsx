'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Icon Container */}
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)]"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E6BE" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="80%" stopColor="#AA8010" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="goldBorder" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#AA8010" />
              <stop offset="50%" stopColor="#F5E6BE" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>

          {/* Outer Crest Ring */}
          <circle cx="50" cy="50" r="46" stroke="url(#goldBorder)" strokeWidth="2.5" fill="#0D0D0D" />
          <circle cx="50" cy="50" r="41" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />

          {/* Crown at top */}
          <path
            d="M38 32 L44 37 L50 28 L56 37 L62 32 L60 41 L40 41 Z"
            fill="url(#goldGradient)"
          />
          
          {/* Crossed Scissors */}
          <path
            d="M34 68 C34 71.5 31.5 74 28 74 C24.5 74 22 71.5 22 68 C22 64.5 24.5 62 28 62 C30 62 31.5 62.8 32.5 64 L46 48 L68 28 C69 27 71 28 70 29.5 L49 53 L34 68 Z"
            fill="url(#goldGradient)"
          />
          <path
            d="M66 68 C66 71.5 68.5 74 72 74 C75.5 74 78 71.5 78 68 C78 64.5 75.5 62 72 62 C70 62 68.5 62.8 67.5 64 L54 48 L32 28 C31 27 29 28 30 29.5 L51 53 L66 68 Z"
            fill="url(#goldGradient)"
          />
          
          {/* Center Screw */}
          <circle cx="50" cy="50" r="3.5" fill="#0D0D0D" stroke="url(#goldGradient)" strokeWidth="1.5" />

          {/* Bottom Star */}
          <polygon points="50,78 51.5,82 55,82 52,84.5 53.5,88.5 50,86 46.5,88.5 48,84.5 45,82 48.5,82" fill="url(#goldGradient)" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className={`font-sans font-extrabold tracking-wider ${textSizes[size]} leading-none bg-gradient-to-r from-[#F5E6BE] via-[#D4AF37] to-[#AA8010] bg-clip-text text-transparent uppercase`}>
            Luxury Barber
          </div>
          <span className="text-[10px] tracking-[0.25em] text-[#C5A880]/80 font-sans uppercase font-semibold mt-0.5">
            Malatya &bull; Erkek Kuaförü
          </span>
        </div>
      )}
    </div>
  );
}
