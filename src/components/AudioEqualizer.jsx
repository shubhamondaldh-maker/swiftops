import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioEqualizer = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div 
      onClick={() => setIsPlaying(!isPlaying)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: 'rgba(255, 19, 137, 0.08)',
        border: '1px solid rgba(255, 19, 137, 0.3)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        userSelect: 'none'
      }}
      title="Sound Waves Telemetry Beat (Click to toggle)"
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '14px' }}>
        {[0.6, 1.0, 0.4, 0.9, 0.7, 0.3, 0.8].map((speed, i) => (
          <div
            key={i}
            style={{
              width: '3px',
              backgroundColor: i % 2 === 0 ? 'var(--pink-primary)' : 'var(--chartreuse-primary)',
              borderRadius: '2px',
              height: isPlaying ? '100%' : '3px',
              transformOrigin: 'bottom',
              animation: isPlaying ? `equalizerBounce ${speed + 0.4}s ease-in-out infinite alternate` : 'none',
              boxShadow: i % 2 === 0 ? '0 0 6px var(--pink-primary)' : '0 0 6px var(--chartreuse-primary)'
            }}
          />
        ))}
      </div>

      <span className="eyebrow" style={{ fontSize: '0.62rem', color: isPlaying ? 'var(--pink-primary)' : 'var(--text-dim)' }}>
        {isPlaying ? 'AUDIO ON' : 'MUTED'}
      </span>

      <style>{`
        @keyframes equalizerBounce {
          0% { height: 2px; }
          50% { height: 14px; }
          100% { height: 6px; }
        }
      `}</style>
    </div>
  );
};
