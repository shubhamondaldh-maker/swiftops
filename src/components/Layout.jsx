import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Package, 
  LogOut, 
  Menu, 
  X, 
  RefreshCw, 
  Zap,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { MarqueeTicker } from './MarqueeTicker';
import { AudioEqualizer } from './AudioEqualizer';
import { ThemeSelector } from './ThemeSelector';

export const Layout = () => {
  const { user, logout } = useAuth();
  const { stats, resetToMockData } = useData();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live real-time seconds clock for ultra-cool cyber feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReset = () => {
    setIsResetting(true);
    resetToMockData();
    setTimeout(() => {
      setIsResetting(false);
    }, 600);
  };

  const navItems = [
    { num: '01', name: 'OVERVIEW', path: '/', badge: null },
    { 
      num: '02', 
      name: 'ORDERS', 
      path: '/orders', 
      badge: stats.pendingOrders > 0 ? `${stats.pendingOrders} PENDING` : null,
      badgeColor: 'var(--chartreuse-primary)'
    },
    { 
      num: '03', 
      name: 'PRODUCTS', 
      path: '/products', 
      badge: stats.lowStockCount > 0 ? `${stats.lowStockCount} LOW STOCK` : null,
      badgeColor: 'var(--pink-primary)'
    }
  ];

  return (
    <div className="app-container" style={{ flexDirection: 'column' }}>
      {/* Top Kinetic Marquee Ticker */}
      <MarqueeTicker />

      {/* High-Impact Editorial Header */}
      <header style={{
        height: '76px',
        backgroundColor: 'rgba(5, 5, 7, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        {/* Brand Logo & Editorial Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button 
            className="btn btn-ghost btn-icon mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', color: '#fff' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--pink-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: 'var(--pink-glow)',
              flexShrink: 0
            }}>
              <Zap size={22} fill="#fff" />
            </div>
            <div>
              <div className="font-display" style={{ fontSize: '1.25rem', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>
                SWIFT<span style={{ color: 'var(--pink-primary)' }}>OPS</span>
              </div>
              <div className="eyebrow" style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--text-dim)', marginTop: '2px' }}>
                INTERNAL COMMERCE SUITE
              </div>
            </div>
          </div>
        </div>

        {/* Numbered Editorial Navigation Links (Desktop) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: 'var(--radius-pill)',
                textDecoration: 'none',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                backgroundColor: isActive ? 'var(--pink-primary)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-muted)',
                boxShadow: isActive ? 'var(--pink-glow)' : 'none',
                border: isActive ? '1px solid transparent' : '1px solid transparent'
              })}
            >
              {({ isActive }) => (
                <>
                  <span 
                    className="font-mono" 
                    style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 800, 
                      color: isActive ? 'var(--chartreuse-primary)' : 'var(--text-dim)' 
                    }}
                  >
                    {item.num}
                  </span>
                  <span className="eyebrow" style={{ color: isActive ? '#fff' : 'inherit', fontSize: '0.78rem' }}>
                    {item.name}
                  </span>
                  {item.badge && (
                    <span 
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: isActive ? 'rgba(0,0,0,0.35)' : 'var(--pink-subtle)',
                        color: isActive ? '#fff' : item.badgeColor,
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Tools: Theme Selector, Audio Equalizer, Clock, Reset Data, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Live Theme Switcher */}
          <ThemeSelector />

          {/* Animated Audio Wave Equalizer */}
          <div className="desktop-equalizer">
            <AudioEqualizer />
          </div>

          {/* Live System Clock */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: 'var(--bg-deep)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-pill)',
            color: 'var(--text-muted)'
          }} className="desktop-clock">
            <Clock size={13} color="var(--chartreuse-primary)" />
            <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>
              {currentTime}
            </span>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={handleReset}
            className="btn btn-outline btn-sm"
            style={{ borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', padding: '6px 14px' }}
            title="Reset data back to initial mock state"
          >
            <RefreshCw size={13} className={isResetting ? 'spin-anim' : ''} />
            <span>RESET DATA</span>
          </button>

          {/* User Profile & Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '6px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '2px solid var(--pink-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#fff',
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--pink-glow)'
            }}>
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
            </div>

            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-icon"
              title="Log Out"
              style={{ color: 'var(--text-muted)' }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-medium)',
          padding: '20px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 90
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--pink-primary)' : 'transparent',
                color: '#fff',
                textDecoration: 'none'
              })}
            >
              <span className="font-display">{item.num} {item.name}</span>
              {item.badge && <span className="badge badge-low-stock">{item.badge}</span>}
            </NavLink>
          ))}
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="main-content">
        <div className="page-container">
          <Outlet />
        </div>
      </main>

      <style>{`
        .spin-anim {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-equalizer {
            display: none !important;
          }
          .desktop-clock {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};
