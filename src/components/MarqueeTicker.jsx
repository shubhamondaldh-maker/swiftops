import React from 'react';

export const MarqueeTicker = () => {
  const items = [
    { icon: 'fa-solid fa-circle', iconStyle: { fontSize: '7px', color: 'var(--chartreuse-primary)' }, text: 'LIVE TELEMETRY ACTIVE', isAlert: false, isHighlight: false },
    { icon: 'fa-solid fa-bolt', iconStyle: { color: 'var(--chartreuse-primary)' }, text: 'NET REVENUE: $128,450.00 (+18.4% SURGE)', isAlert: false, isHighlight: true },
    { icon: 'fa-solid fa-box', iconStyle: { color: 'var(--pink-primary)' }, text: 'DISPATCH QUEUE: 38 PENDING', isAlert: false, isHighlight: false },
    { icon: 'fa-solid fa-triangle-exclamation', iconStyle: { color: 'var(--pink-primary)' }, text: 'CRITICAL ALERT: 5 INVENTORY ITEMS < 10 UNITS', isAlert: true, isHighlight: false },
    { icon: 'fa-solid fa-globe', iconStyle: { color: 'var(--chartreuse-primary)' }, text: 'GLOBAL FULFILLMENT: 1,420 COMPLETED CHECKOUTS', isAlert: false, isHighlight: false },
    { icon: 'fa-solid fa-shield-halved', iconStyle: { color: 'var(--pink-primary)' }, text: 'SYSTEM OPERATIONAL • ENCRYPTED NODE 01', isAlert: false, isHighlight: false }
  ];

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#030305',
      borderBottom: '1px solid rgba(139, 92, 246, 0.25)',
      height: '34px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      zIndex: 110,
      userSelect: 'none'
    }}>
      {/* Edge gradient fades */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '60px',
        background: 'linear-gradient(to right, #030305, transparent)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '60px',
        background: 'linear-gradient(to left, #030305, transparent)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      <div className="marquee-track">
        {[...items, ...items, ...items].map((item, idx) => (
          <span
            key={idx}
            className="font-mono"
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '0 24px',
              color: item.isAlert ? 'var(--pink-primary)' : item.isHighlight ? 'var(--chartreuse-primary)' : 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap'
            }}
          >
            <i className={item.icon} style={item.iconStyle} />
            <span>{item.text}</span>
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marqueeScroll 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};
