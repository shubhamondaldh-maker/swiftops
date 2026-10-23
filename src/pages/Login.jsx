import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Menu, Zap, Terminal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeSelector } from '../components/ThemeSelector';
import heroArtwork from '../assets/hero_wave.jpg';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email || 'admin@swiftops.com', password || 'admin123');
      setIsLoading(false);
      navigate('/');
    }, 400);
  };

  const handleDemoFill = () => {
    setEmail('admin@swiftops.com');
    setPassword('swiftops2026');
    setIsLoading(true);
    setTimeout(() => {
      login('admin@swiftops.com', 'swiftops2026');
      setIsLoading(false);
      navigate('/');
    }, 300);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-pitch)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Editorial Navbar */}
      <header style={{
        height: '80px',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        zIndex: 20
      }}>
        {/* Left hamburger & title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button className="btn btn-ghost btn-icon" style={{ color: '#fff' }} aria-label="Menu">
            <Menu size={24} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="font-display" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', color: '#fff' }}>
              SWIFT<span style={{ color: 'var(--pink-primary)' }}>OPS</span>
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="desktop-links">
          {['TELEMETRY', 'DISPATCH', 'CATALOGUE', 'TERMINAL'].map((link, idx) => (
            <span 
              key={link}
              className="eyebrow"
              style={{ 
                color: idx === 0 ? '#fff' : 'var(--text-muted)', 
                cursor: 'pointer',
                letterSpacing: '0.14em',
                transition: 'color 0.2s'
              }}
            >
              {link}
            </span>
          ))}
        </nav>

        {/* Right Search, Theme Selector & Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Live Theme Switcher on Login Page */}
          <ThemeSelector />

          <button 
            onClick={handleDemoFill}
            className="btn btn-outline"
            style={{ 
              borderRadius: 'var(--radius-pill)', 
              borderColor: 'var(--pink-primary)', 
              color: 'var(--pink-primary)',
              fontSize: '0.78rem',
              padding: '8px 18px'
            }}
          >
            1-CLICK DEMO
          </button>
        </div>
      </header>

      {/* Main Hero Showcase */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        padding: '24px 48px',
        zIndex: 10
      }}>
        {/* Giant Background Typography Layers */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pointerEvents: 'none',
          padding: '0 48px',
          zIndex: 1,
          overflow: 'hidden'
        }}>
          <h1 
            className="font-display" 
            style={{
              fontSize: 'clamp(5rem, 16vw, 15rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.06em',
              color: 'var(--pink-primary)',
              textShadow: 'var(--pink-glow)',
              userSelect: 'none'
            }}
          >
            SWIFT
          </h1>
          <h1 
            className="font-display" 
            style={{
              fontSize: 'clamp(5rem, 16vw, 15rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.06em',
              color: 'transparent',
              WebkitTextStroke: '2px #ffffff',
              opacity: 0.85,
              userSelect: 'none',
              marginLeft: 'auto'
            }}
          >
            WAVES
          </h1>
        </div>

        {/* Center Artwork Integration - Adjusted to the new Cosmic Luxury style */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(320px, 44vw, 620px)',
          height: 'clamp(380px, 66vh, 660px)',
          zIndex: 2,
          pointerEvents: 'none',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.95), 0 0 80px var(--pink-subtle)',
          border: '1px solid var(--border-medium)'
        }}>
          <img 
            src={heroArtwork} 
            alt="SwiftOps Hero Art" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'contrast(1.12) brightness(1.04)'
            }} 
          />
        </div>

        {/* Left Editorial Text Column */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }} className="hero-left-column">
          <div>
            <div className="eyebrow eyebrow-pink" style={{ marginBottom: '6px' }}>
              SCALE / PEOPLE / CONTROL
            </div>
            <div className="eyebrow" style={{ color: 'var(--text-muted)' }}>
              INTERNAL COMMERCE OPS
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '240px' }}>
            A high-velocity operations cockpit engineered for next-generation digital storefronts.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={handleDemoFill}
              className="circle-arrow-btn"
              title="Click to sign in instantly"
              aria-label="Explore Now"
            >
              <ArrowRight size={20} />
            </button>
            <span className="eyebrow" style={{ color: '#fff', letterSpacing: '0.14em' }}>
              EXPLORE NOW
            </span>
          </div>
        </div>

        {/* Right Editorial Steps Column */}
        <div style={{
          position: 'absolute',
          right: '48px',
          top: '35%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 10
        }} className="hero-steps-column">
          {[
            { num: '01', label: 'TELEMETRY', active: true },
            { num: '02', label: 'DISPATCH', active: false },
            { num: '03', label: 'CATALOGUE', active: false },
            { num: '04', label: 'INTELLIGENCE', active: false }
          ].map((step) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span 
                className="font-mono" 
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: step.active ? 'var(--pink-primary)' : 'var(--text-dim)'
                }}
              >
                {step.num}
              </span>
              <span className="eyebrow" style={{ color: step.active ? '#fff' : 'var(--text-dim)', fontSize: '0.68rem' }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Center-Right Floating Authentication Card */}
        <div style={{
          position: 'relative',
          zIndex: 15,
          marginLeft: 'auto',
          marginRight: '60px',
          width: '100%',
          maxWidth: '380px'
        }} className="hero-login-card">
          <div className="card" style={{
            background: 'rgba(10, 11, 20, 0.9)',
            backdropFilter: 'blur(20px)',
            borderColor: 'var(--border-pink)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px var(--pink-subtle)',
            padding: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <span className="eyebrow eyebrow-yellow">01 AUTHENTICATION</span>
                <h2 className="font-display" style={{ fontSize: '1.35rem', color: '#fff', marginTop: '4px' }}>
                  OPERATIONS LOGIN
                </h2>
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--pink-subtle)',
                border: '1px solid var(--pink-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--pink-primary)'
              }}>
                <Zap size={16} />
              </div>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">OPERATOR EMAIL</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="admin@swiftops.com (or any email)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '22px' }}>
                <label className="form-label">SECURITY KEY</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter any password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                  style={{ width: '100%', padding: '14px', fontSize: '0.88rem' }}
                >
                  <span>{isLoading ? 'ACCESSING...' : 'SIGN IN TO PORTAL'}</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="btn btn-electric"
                  style={{ width: '100%', padding: '12px', fontSize: '0.82rem' }}
                >
                  <Terminal size={15} />
                  <span>⚡ INSTANT 1-CLICK DEMO</span>
                </button>
              </div>
            </form>

            <div style={{
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.72rem',
              color: 'var(--text-dim)',
              textAlign: 'center'
            }}>
              PROTECTED ENVIRONMENT • SESSION SURVIVES REFRESH
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Editorial Banner */}
      <footer style={{
        height: '70px',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative',
        zIndex: 20
      }}>
        <div className="eyebrow" style={{ color: 'var(--text-dim)' }}>
          DAY 1 SUBMISSION • ECOMMERCE ADMIN DASHBOARD
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--chartreuse-primary)',
            boxShadow: 'var(--chartreuse-glow)'
          }} />
          <span className="eyebrow" style={{ color: '#fff', letterSpacing: '0.12em' }}>
            REAL METRICS • REAL PEOPLE
          </span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-links {
            display: none !important;
          }
          .hero-steps-column {
            display: none !important;
          }
          .hero-login-card {
            margin: 0 auto !important;
          }
          .hero-left-column {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
