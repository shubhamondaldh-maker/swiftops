import React from 'react';

export const StatCard = ({ step, title, value, subtitle, icon: Icon, colorVariant = 'yellow', trend }) => {
  const isPink = colorVariant === 'pink';
  const accentColor = isPink ? 'var(--pink-primary)' : 'var(--chartreuse-primary)';
  const borderHighlight = isPink ? 'var(--border-pink)' : 'var(--border-yellow)';

  return (
    <div 
      className={`card ${isPink ? 'card-glowing-pink' : 'card-glowing-yellow'}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '160px',
        padding: '24px 28px',
        borderLeft: `4px solid ${accentColor}`,
        overflow: 'hidden'
      }}
    >
      {/* Top Header: Step Number & Title */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
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
          <div 
            className="font-display" 
            style={{ 
              fontSize: '2.6rem', 
              color: '#ffffff', 
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginTop: '4px'
            }}
          >
            {value}
          </div>
        </div>

        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: `1px solid ${borderHighlight}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accentColor,
          backgroundColor: isPink ? 'var(--pink-subtle)' : 'var(--chartreuse-subtle)',
          boxShadow: isPink ? 'var(--pink-glow)' : 'var(--chartreuse-glow)',
          flexShrink: 0
        }}>
          {Icon && <Icon size={20} />}
        </div>
      </div>

      {/* Footer Subtitle & Trend */}
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          {subtitle}
        </span>
        {trend && (
          <span 
            className="eyebrow" 
            style={{ 
              color: accentColor,
              backgroundColor: isPink ? 'var(--pink-subtle)' : 'var(--chartreuse-subtle)',
              padding: '2px 8px',
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
