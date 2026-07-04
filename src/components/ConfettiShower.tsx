/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface ConfettiShowerProps {
  triggerKey: number; // Increment to burst another celebratory cascade
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: 'circle' | 'square' | 'star';
}

export const ConfettiShower: React.FC<ConfettiShowerProps> = ({ triggerKey }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Luxury palette matching MZ+ branding: gold, silver, glowing cyan, deep violet
    const colors = [
      '#dfb15b', // Gold
      '#ffd700', // Bright Sovereign Gold
      '#00d2ff', // Electric Cyan
      '#0066ff', // Royal Blue
      '#ffffff', // Diamond White
      '#8a2be2', // Indigo Violet
      '#c0c0c0', // Holographic Silver
    ];

    const createParticle = (side: 'left' | 'right' | 'center'): Particle => {
      const isCenter = side === 'center';
      const x = isCenter ? canvas.width / 2 : side === 'left' ? 0 : canvas.width;
      const y = isCenter ? canvas.height * 0.4 : canvas.height * 0.85;
      
      const angle = isCenter
        ? Math.random() * Math.PI * 2
        : side === 'left'
          ? -Math.PI / 4 - Math.random() * Math.PI / 4 // Shooting right-up
          : -Math.PI * 3 / 4 + Math.random() * Math.PI / 4; // Shooting left-up

      const speed = isCenter
        ? Math.random() * 4 + 1.5
        : Math.random() * 11 + 9; // High velocity from corners

      const shapes: ('circle' | 'square' | 'star')[] = ['circle', 'square', 'star'];

      return {
        x,
        y,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - (isCenter ? 1.5 : 0),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
    };

    // Instantiate celebratory elements
    const particles: Particle[] = [];
    
    // Left fountain
    for (let i = 0; i < 45; i++) {
      particles.push(createParticle('left'));
    }
    // Right fountain
    for (let i = 0; i < 45; i++) {
      particles.push(createParticle('right'));
    }
    // Ambient floating centers
    for (let i = 0; i < 25; i++) {
      particles.push(createParticle('center'));
    }

    particlesRef.current = particles;

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeParticles = particlesRef.current.filter((p) => p.opacity > 0);

      activeParticles.forEach((p) => {
        // Physics update
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.16; // Mild gravity
        p.speedX *= 0.985; // Air drag
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.0075; // Graceful decay

        if (p.opacity <= 0) return;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'square') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.shape === 'star') {
          drawStar(0, 0, 5, p.size, p.size / 2.2);
        }

        ctx.restore();
      });

      particlesRef.current = activeParticles;

      if (activeParticles.length > 0) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [triggerKey]);

  return (
    <canvas
      ref={canvasRef}
      id="confetti-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none z-40"
    />
  );
};
