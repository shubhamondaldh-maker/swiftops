import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, colorVariant = 'yellow', trend }) => {
  const isPink = colorVariant === 'pink';
  const accentColor = isPink ? 'var(--pink-primary)' : 'var(--chartreuse-primary)';
  const glowShadow = isPink ? 'var(--shadow-pink)' : 'var(--shadow-yellow)';
  const subtleBg = isPink ? 'var(--pink-subtle)' : 'var(--chartreuse-subtle)';
  const borderCol = isPink ? 'var(--pink-border)' : 'var(--chartreuse-border)';

  return (
    <div 
      className={`card ${isPink ? 'card-glowing-pink' : 'card-glowing-yellow'}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '135px'
      }}
    >
      {/* Decorative top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, ${accentColor} 0%, transparent 100%)`
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            color: 'var(--text-muted)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.06em' 
          }}>
            {title}
          </span>
          <div style={{ 
            fontSize: '1.9rem', 
            fontWeight: 800, 
            color: '#fff', 
            marginTop: '6px',
            lineHeight: 1.1
          }} className="mono-num">
            {value}
          </div>
        </div>

        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: subtleBg,
          border: `1px solid ${borderCol}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor,
          flexShrink: 0
        }}>
          {Icon && <Icon size={22} />}
        </div>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {trend && (
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: subtleBg,
            color: accentColor,
            fontFamily: 'var(--font-mono)'
          }}>
            {trend}
          </span>
        )}
        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          {subtitle}
        </span>
      </div>
    </div>
  );
};
