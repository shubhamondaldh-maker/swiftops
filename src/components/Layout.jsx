import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  LogOut, 
  Menu, 
  X, 
  RefreshCw, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  Zap,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const Layout = () => {
  const { user, logout } = useAuth();
  const { stats, resetToMockData } = useData();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleResetData = () => {
    setIsResetting(true);
    resetToMockData();
    setTimeout(() => {
      setIsResetting(false);
    }, 600);
  };

  const navItems = [
    { 
      name: 'Overview', 
      path: '/', 
      icon: LayoutDashboard,
      badge: null
    },
    { 
      name: 'Orders', 
      path: '/orders', 
      icon: ShoppingBag,
      badge: stats.pendingOrders > 0 ? `${stats.pendingOrders} pending` : null,
      badgeType: 'pending'
    },
    { 
      name: 'Products', 
      path: '/products', 
      icon: Package,
      badge: stats.lowStockCount > 0 ? `${stats.lowStockCount} low` : null,
      badgeType: 'low-stock'
    }
  ];

  return (
    <div className="app-container">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 90 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        style={{
          width: '260px',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 95,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: mobileMenuOpen ? 'fixed' : 'relative',
          top: 0,
          bottom: 0,
          left: 0,
          transform: mobileMenuOpen ? 'translateX(0)' : undefined
        }}
        className={mobileMenuOpen ? 'sidebar-mobile-open' : 'sidebar-desktop'}
      >
        {/* Brand Header */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #09090c 0%, #1a1b24 100%)',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px var(--pink-glow)',
              position: 'relative'
            }}>
              <Zap size={22} color="var(--chartreuse-primary)" fill="var(--chartreuse-primary)" />
              <div style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--pink-primary)',
                boxShadow: '0 0 8px var(--pink-primary)'
              }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff' }}>
                  SWIFT<span style={{ color: 'var(--pink-primary)' }}>OPS</span>
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--chartreuse-subtle)',
                  color: 'var(--chartreuse-primary)',
                  border: '1px solid var(--chartreuse-border)',
                  borderRadius: '4px',
                  padding: '1px 5px',
                  textTransform: 'uppercase'
                }}>
                  v1.0
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                Operations Dashboard
              </div>
            </div>
          </div>

          {/* Mobile Close Button */}
          {mobileMenuOpen && (
            <button 
              className="btn btn-ghost btn-icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Live Ops Pill */}
        <div style={{ padding: '14px 18px 8px 18px' }}>
          <div style={{
            background: 'rgba(204, 255, 0, 0.05)',
            border: '1px solid rgba(204, 255, 0, 0.2)',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--chartreuse-primary)',
                boxShadow: '0 0 8px var(--chartreuse-primary)'
              }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--chartreuse-primary)' }}>
                System Online
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              LOCAL DB
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ 
            fontSize: '0.7rem', 
            fontWeight: 700, 
            color: 'var(--text-dim)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.08em',
            padding: '8px 10px 4px 10px'
          }}>
            Store Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.15s ease',
                  backgroundColor: isActive ? 'var(--pink-subtle)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--pink-border)' : '1px solid transparent',
                  boxShadow: isActive ? '0 0 16px rgba(255, 42, 133, 0.15)' : 'none'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} color="currentColor" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span 
                    className={`badge ${item.badgeType === 'low-stock' ? 'badge-low-stock' : 'badge-pending'}`}
                    style={{ fontSize: '0.68rem', padding: '2px 7px' }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={handleResetData}
              className="btn btn-outline"
              title="Reset all orders and products back to clean initial mock data"
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                fontSize: '0.8rem',
                padding: '8px 12px',
                color: 'var(--text-muted)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <RefreshCw size={14} className={isResetting ? 'spin-anim' : ''} />
              <span>{isResetting ? 'Resetting Data...' : 'Reset Demo Data'}</span>
            </button>
          </div>
        </nav>

        {/* User Footer Profile */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-base)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--pink-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#fff',
              fontSize: '0.85rem',
              boxShadow: '0 0 10px var(--pink-glow)',
              flexShrink: 0
            }}>
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user?.name || 'Administrator'}
              </div>
              <div style={{
                fontSize: '0.72rem',
                color: 'var(--chartreuse-primary)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user?.role || 'Ops Lead'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-icon"
            title="Log Out"
            style={{ color: 'var(--text-muted)', flexShrink: 0 }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navbar */}
        <header style={{
          height: '64px',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 80,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Mobile Hamburger */}
            <button
              className="btn btn-ghost btn-icon mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              style={{ display: 'none' }}
            >
              <Menu size={22} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Ecommerce Ops</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>/</span>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--chartreuse-primary)' }}>
                Internal Admin Portal
              </span>
            </div>
          </div>

          {/* Quick Metrics & Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'var(--bg-base)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>Low Stock Alert:</span>
              <span style={{ 
                fontWeight: 700, 
                color: stats.lowStockCount > 0 ? 'var(--pink-primary)' : 'var(--chartreuse-primary)',
                fontFamily: 'var(--font-mono)' 
              }}>
                {stats.lowStockCount} items
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'var(--bg-base)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>Pending:</span>
              <span style={{ 
                fontWeight: 700, 
                color: 'var(--chartreuse-primary)',
                fontFamily: 'var(--font-mono)' 
              }}>
                {stats.pendingOrders}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-container">
          <Outlet />
        </main>
      </div>

      <style>{`
        .spin-anim {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .sidebar-desktop {
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
