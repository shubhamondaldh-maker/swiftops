import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

export const THEMES = [
  {
    id: 'violet',
    name: 'Electric Violet',
    desc: 'Arc / Web3 Cyber Luxury',
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    bg: '#06060c'
  },
  {
    id: 'cyan',
    name: 'Midnight Cyan',
    desc: 'Linear / Vercel Pro Tech',
    primary: '#00f0ff',
    secondary: '#10b981',
    bg: '#04070d'
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    desc: 'Stripe / Supabase Warmth',
    primary: '#ff5722',
    secondary: '#ffb703',
    bg: '#090705'
  },
  {
    id: 'mono',
    name: 'Minimalist Mono',
    desc: 'Apple / Teenage Eng.',
    primary: '#ffffff',
    secondary: '#a1a1aa',
    bg: '#000000'
  }
];

export const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('swiftops_theme') || 'violet';
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('swiftops_theme', currentTheme);
  }, [currentTheme]);

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-outline btn-sm"
        style={{
          borderRadius: 'var(--radius-pill)',
          padding: '6px 14px',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        title="Switch color palette"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeThemeObj.primary }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeThemeObj.secondary }} />
        </div>
        <span className="eyebrow" style={{ color: '#fff', fontSize: '0.7rem' }}>
          {activeThemeObj.name}
        </span>
        <Palette size={13} color="var(--chartreuse-primary)" />
      </button>

      {isOpen && (
        <>
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 998 }} 
            onClick={() => setIsOpen(false)} 
          />
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '260px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '8px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 25px rgba(139, 92, 246, 0.2)',
            zIndex: 999,
            animation: 'fadeIn 0.15s ease'
          }}>
            <div style={{ 
              padding: '6px 10px 8px 10px', 
              borderBottom: '1px solid var(--border-subtle)', 
              marginBottom: '6px' 
            }}>
              <span className="eyebrow" style={{ fontSize: '0.65rem' }}>SELECT COLOR PALETTE</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {THEMES.map((theme) => {
                const isSelected = currentTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setCurrentTheme(theme.id);
                      setIsOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '1px solid var(--pink-primary)' : '1px solid transparent',
                      backgroundColor: isSelected ? 'var(--pink-subtle)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                      width: '100%'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: theme.primary }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: theme.secondary }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>
                          {theme.name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                          {theme.desc}
                        </div>
                      </div>
                    </div>

                    {isSelected && <Check size={14} color="var(--pink-primary)" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
