import React, { useState } from 'react';
import { AnimatedCounter } from './AnimatedCounter';

export const StatCard = ({ step, title, rawNumber, prefix = '', suffix = '', decimals = 0, subtitle, icon: Icon, colorVariant = 'yellow', trend }) => {
  const isPink = colorVariant === 'pink';
  const accentColor = isPink ? 'var(--pink-primary)' : 'var(--chartreuse-primary)';
  const borderHighlight = isPink ? 'var(--border-pink)' : 'var(--border-yellow)';

  // 3D holographic tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0, hover: false });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 12,
      y: (x / rect.width) * 12,
      hover: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, hover: false });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card ${isPink ? 'card-glowing-pink' : 'card-glowing-yellow'}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '165px',
        padding: '26px 28px',
        borderLeft: `4px solid ${accentColor}`,
        overflow: 'hidden',
        transform: tilt.hover 
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)` 
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: tilt.hover ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        position: 'relative'
      }}
    >
      {/* Holographic light reflection sheen */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: isPink
            ? 'linear-gradient(135deg, rgba(255, 19, 137, 0.12) 0%, transparent 60%)'
            : 'linear-gradient(135deg, rgba(204, 255, 0, 0.1) 0%, transparent 60%)',
          opacity: tilt.hover ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
      />

      {/* Top Header: Step Number & Title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            {step && (
              <span className="font-mono" style={{ fontSize: '0.78rem', fontWeight: 800, color: accentColor }}>
                {step}
              </span>
            )}
            <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
              {title}
            </span>
          </div>

          {/* Animated Counter Display */}
          <div 
            className="font-display" 
            style={{ 
              fontSize: '2.7rem', 
              color: '#ffffff', 
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginTop: '4px',
              textShadow: isPink ? '0 0 20px rgba(255, 19, 137, 0.3)' : '0 0 20px rgba(204, 255, 0, 0.2)'
            }}
          >
            <AnimatedCounter
              value={rawNumber}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
              duration={1200}
            />
          </div>
        </div>

        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          border: `1px solid ${borderHighlight}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor,
          backgroundColor: isPink ? 'var(--pink-subtle)' : 'var(--chartreuse-subtle)',
          boxShadow: isPink ? 'var(--pink-glow)' : 'var(--chartreuse-glow)',
          flexShrink: 0,
          transition: 'transform 0.3s ease',
          transform: tilt.hover ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)'
        }}>
          {Icon && <Icon size={22} />}
        </div>
      </div>

      {/* Footer Subtitle & Trend */}
      <div style={{
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '12px',
        position: 'relative',
        zIndex: 2
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          {subtitle}
        </span>
        {trend && (
          <span 
            className="eyebrow" 
            style={{ 
              color: accentColor,
              backgroundColor: isPink ? 'var(--pink-subtle)' : 'var(--chartreuse-subtle)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-pill)',
              border: `1px solid ${borderHighlight}`
            }}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
