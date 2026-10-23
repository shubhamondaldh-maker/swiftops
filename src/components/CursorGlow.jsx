import React, { useEffect, useState } from 'react';

export const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '450px',
        height: '450px',
        transform: `translate(${pos.x - 225}px, ${pos.y - 225}px)`,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 19, 137, 0.12) 0%, rgba(204, 255, 0, 0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)',
        mixBlendMode: 'screen'
      }}
    />
  );
};
