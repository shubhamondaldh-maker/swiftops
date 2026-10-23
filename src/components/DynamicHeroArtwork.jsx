import React, { useEffect, useRef } from 'react';

export const DynamicHeroArtwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    let mouse = { x: -1000, y: -1000, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes floating in sound waves
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 700,
      radius: Math.random() * 2 + 1,
      speedY: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2
    }));

    const render = () => {
      time += 0.025;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Read current dynamic theme colors from CSS variables
      const computed = getComputedStyle(document.documentElement);
      const primaryColor = computed.getPropertyValue('--pink-primary').trim() || '#8b5cf6';
      const secondaryColor = computed.getPropertyValue('--chartreuse-primary').trim() || '#06b6d4';
      const bgColor = computed.getPropertyValue('--bg-pitch').trim() || '#06060c';
      const cardColor = computed.getPropertyValue('--bg-card').trim() || '#10111e';

      // Clear Canvas with rich dark gradient
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width);
      bgGrad.addColorStop(0, cardColor);
      bgGrad.addColorStop(1, bgColor);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Halftone Dot Matrix Pattern in Background
      const dotSpacing = 22;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      for (let x = 0; x < width; x += dotSpacing) {
        for (let y = 0; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw Rotating Cybernetic Sound Rings (Holographic core)
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Outer dashed ring
      ctx.rotate(time * 0.15);
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.38, 0, Math.PI * 2);
      ctx.setLineDash([12, 16]);
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 18;
      ctx.stroke();

      // Middle counter-rotating ring
      ctx.rotate(-time * 0.3);
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.28, 0, Math.PI * 2);
      ctx.setLineDash([4, 12, 20, 8]);
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = secondaryColor;
      ctx.shadowBlur = 22;
      ctx.stroke();

      // Center glowing vinyl disc / sound nucleus
      ctx.rotate(time * 0.2);
      const nucleusGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, Math.min(width, height) * 0.18);
      nucleusGrad.addColorStop(0, primaryColor);
      nucleusGrad.addColorStop(0.6, secondaryColor);
      nucleusGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nucleusGrad;
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 3. Draw Generative Kinetic Sound Waves (Fluid undulating ribbons)
      const waveCount = 5;
      for (let w = 0; w < waveCount; w++) {
        ctx.save();
        ctx.beginPath();

        const waveHeight = height * (0.35 + w * 0.1);
        const waveFreq = 0.008 + w * 0.002;
        const waveSpeed = time * (1.2 + w * 0.3);

        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 10) {
          // Calculate mouse proximity displacement for interactive ripple
          let mouseDisplacement = 0;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dist = Math.abs(dx);
            if (dist < 120) {
              mouseDisplacement = Math.sin((dist / 120) * Math.PI) * 45;
            }
          }

          const y = waveHeight +
            Math.sin(x * waveFreq + waveSpeed) * (28 + w * 8) +
            Math.cos(x * 0.015 - time) * 16 -
            mouseDisplacement;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Wave Fill Gradient matching dynamic active colors
        const waveGrad = ctx.createLinearGradient(0, waveHeight - 60, width, height);
        if (w % 2 === 0) {
          waveGrad.addColorStop(0, primaryColor);
          waveGrad.addColorStop(1, 'transparent');
        } else {
          waveGrad.addColorStop(0, secondaryColor);
          waveGrad.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = waveGrad;
        ctx.globalAlpha = 0.28 - w * 0.04;
        ctx.shadowColor = w % 2 === 0 ? primaryColor : secondaryColor;
        ctx.shadowBlur = 24;
        ctx.fill();

        // Wave Crest Luminous Line
        ctx.strokeStyle = w % 2 === 0 ? primaryColor : secondaryColor;
        ctx.lineWidth = 2.5 - w * 0.3;
        ctx.globalAlpha = 0.85 - w * 0.12;
        ctx.stroke();

        ctx.restore();
      }

      // 4. Floating Ambient Frequency Particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.save();
        ctx.fillStyle = p.alpha > 0.5 ? primaryColor : secondaryColor;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 5. High-Fashion Editorial Canvas Overlay Stamping
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.letterSpacing = '2px';
      ctx.fillText('AUDIO FREQUENCY ENGINE // REALTIME GENERATIVE', 24, 32);

      ctx.fillStyle = primaryColor;
      ctx.fillText('● SYSTEM FLUIDITY 100%', 24, 48);

      // Bottom Right Coordinates
      ctx.textAlign = 'right';
      ctx.fillStyle = secondaryColor;
      ctx.fillText(`PHASE ${(time % (Math.PI * 2)).toFixed(2)} rad • DYNAMIC THEME LIVE`, width - 24, height - 28);
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95), 0 0 60px var(--pink-subtle)',
      border: '1px solid var(--border-medium)',
      backgroundColor: 'var(--bg-pitch)'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'crosshair'
        }}
      />
    </div>
  );
};
