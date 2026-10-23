import React from 'react';

export const StockMeter = ({ stock }) => {
  const isLow = Number(stock) < 10;
  const maxVisual = 40;
  const percentage = Math.min(100, Math.max(10, (stock / maxVisual) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span 
          className="font-mono" 
          style={{ 
            fontWeight: 900, 
            fontSize: '1.05rem',
            color: isLow ? 'var(--pink-primary)' : 'var(--chartreuse-primary)' 
          }}
        >
          {stock}
        </span>
        <span className="eyebrow" style={{ fontSize: '0.62rem', color: isLow ? 'var(--pink-primary)' : 'var(--text-dim)' }}>
          {isLow ? 'CRITICAL' : 'OPTIMAL'}
        </span>
      </div>

      {/* Cyberpunk segmented bar */}
      <div style={{
        height: '6px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: '3px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div 
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: isLow ? 'var(--pink-primary)' : 'var(--chartreuse-primary)',
            boxShadow: isLow ? '0 0 10px var(--pink-primary)' : '0 0 10px var(--chartreuse-primary)',
            borderRadius: '3px',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            backgroundImage: isLow 
              ? 'linear-gradient(45deg, rgba(0,0,0,0.3) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3) 75%, transparent 75%, transparent)' 
              : 'none',
            backgroundSize: '12px 12px'
          }}
          className={isLow ? 'striped-pulse-meter' : ''}
        />
      </div>

      <style>{`
        .striped-pulse-meter {
          animation: stripeMove 1.2s linear infinite, pulseGlow 1.5s ease-in-out infinite alternate;
        }
        @keyframes stripeMove {
          0% { background-position: 0 0; }
          100% { background-position: 24px 0; }
        }
        @keyframes pulseGlow {
          from { opacity: 0.8; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
