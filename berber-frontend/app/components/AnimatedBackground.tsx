'use client';

import React, { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle settings for Gold Dust
    const particleCount = Math.min(Math.floor(width / 15), 70);
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      pulseSpeed: number;
      goldShade: string;
    }> = [];

    const goldColors = [
      'rgba(245, 230, 190, ', // F5E6BE Light Gold
      'rgba(212, 175, 55, ',  // D4AF37 Classic Gold
      'rgba(170, 128, 16, ',  // AA8010 Deep Gold
      'rgba(197, 168, 128, ', // C5A880 Champagne Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      const maxOpacity = Math.random() * 0.6 + 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * maxOpacity,
        maxOpacity: maxOpacity,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        goldShade: goldColors[Math.floor(Math.random() * goldColors.length)],
      });
    }

    // Mouse interactive light glow
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw mouse ambient spotlight
      const spotlightGradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        450
      );
      spotlightGradient.addColorStop(0, 'rgba(212, 175, 55, 0.06)');
      spotlightGradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.02)');
      spotlightGradient.addColorStop(1, 'rgba(10, 10, 10, 0)');

      ctx.fillStyle = spotlightGradient;
      ctx.fillRect(0, 0, width, height);

      // Update & Draw Gold Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;

        // Pulse opacity
        p.opacity += p.pulseSpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Wrap around screen boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft glow around particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.goldShade + (p.opacity * 0.3) + ')';
        ctx.fill();

        // Draw core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.goldShade + p.opacity + ')';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0A0A]">
      {/* Dynamic Animated Mesh Ambient Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-[#D4AF37]/10 rounded-full blur-[150px] animate-pulse duration-[8000ms]" />
      <div className="absolute top-1/2 -right-40 w-[650px] h-[650px] bg-[#AA8010]/10 rounded-full blur-[160px] animate-pulse duration-[10000ms] delay-1000" />
      <div className="absolute -bottom-40 left-1/4 w-[750px] h-[750px] bg-[#D4AF37]/8 rounded-full blur-[170px] animate-pulse duration-[9000ms] delay-2000" />

      {/* Subtle Geometric Luxury Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.8) 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* 60fps HTML5 Canvas Particle Engine */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Edge Radial Vignette Overlay for Depth */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80" />
    </div>
  );
}
