import React from 'react';

export const LiquidWaves = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      {/* Morphing Liquid Blob 1 (Hot Pink) */}
      <div 
        className="liquid-blob liquid-blob-pink"
        style={{
          position: 'absolute',
          top: '-150px',
          right: '-100px',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(255, 19, 137, 0.16) 0%, rgba(255, 0, 128, 0.05) 50%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'morphWave 18s ease-in-out infinite alternate, floatSlow 22s ease-in-out infinite alternate'
        }}
      />

      {/* Morphing Liquid Blob 2 (Chartreuse Electric Yellow) */}
      <div 
        className="liquid-blob liquid-blob-yellow"
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-100px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(204, 255, 0, 0.12) 0%, rgba(204, 255, 0, 0.03) 50%, transparent 70%)',
          filter: 'blur(45px)',
          animation: 'morphWaveReverse 20s ease-in-out infinite alternate, floatSlowReverse 25s ease-in-out infinite alternate'
        }}
      />

      {/* Floating Ambient Glowing Ring */}
      <div 
        style={{
          position: 'absolute',
          top: '40%',
          left: '20%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          border: '1px dashed rgba(255, 19, 137, 0.18)',
          filter: 'drop-shadow(0 0 12px rgba(255, 19, 137, 0.3))',
          animation: 'spinSlow 60s linear infinite'
        }}
      />

      <style>{`
        @keyframes morphWave {
          0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          100% {
            border-radius: 50% 50% 40% 60% / 40% 40% 60% 50%;
          }
        }

        @keyframes morphWaveReverse {
          0% {
            border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 70% 30% 40% 60% / 40% 70% 30% 60%;
          }
          100% {
            border-radius: 50% 50% 30% 70% / 50% 30% 60% 40%;
          }
        }

        @keyframes floatSlow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.08); }
          100% { transform: translate(20px, -20px) scale(0.96); }
        }

        @keyframes floatSlowReverse {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.05); }
          100% { transform: translate(-20px, 30px) scale(0.95); }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
