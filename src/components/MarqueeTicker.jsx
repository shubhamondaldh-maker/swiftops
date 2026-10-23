import React from 'react';

export const MarqueeTicker = () => {
  const items = [
    '● LIVE TELEMETRY ACTIVE',
    '⚡ NET REVENUE: $128,450.00 (+18.4% SURGE)',
    '✦ DISPATCH QUEUE: 38 PENDING',
    '⚠️ CRITICAL ALERT: 5 INVENTORY ITEMS < 10 UNITS',
    '● GLOBAL FULFILLMENT: 1,420 COMPLETED CHECKOUTS',
    '✦ SYSTEM OPERATIONAL • ENCRYPTED NODE 01'
  ];

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#030305',
      borderBottom: '1px solid rgba(255, 19, 137, 0.25)',
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
        {[...items, ...items, ...items].map((text, idx) => {
          const isAlert = text.includes('CRITICAL');
          const isSurge = text.includes('SURGE');
          return (
            <span
              key={idx}
              className="font-mono"
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '0 24px',
                color: isAlert ? 'var(--pink-primary)' : isSurge ? 'var(--chartreuse-primary)' : 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              {text}
            </span>
          );
        })}
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
