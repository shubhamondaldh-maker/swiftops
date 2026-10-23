import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, ArrowRight, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() && !password.trim()) {
      // If blank, allow demo autofill or require input
      setEmail('admin@swiftops.com');
      setPassword('admin123');
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email || 'admin@swiftops.com', password || 'admin123');
      setIsLoading(false);
      navigate('/');
    }, 450);
  };

  const handleDemoFill = () => {
    setEmail('admin@swiftops.com');
    setPassword('demoPass2026!');
    setIsLoading(true);
    setTimeout(() => {
      login('admin@swiftops.com', 'demoPass2026!');
      setIsLoading(false);
      navigate('/');
    }, 300);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-deep)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Neon Gradients */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 42, 133, 0.12) 0%, transparent 70%)',
        top: '-10%',
        left: '10%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(204, 255, 0, 0.08) 0%, transparent 70%)',
        bottom: '-10%',
        right: '10%',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '460px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #111217 0%, #1a1c24 100%)',
            border: '1px solid var(--border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            boxShadow: '0 0 30px var(--pink-glow)',
            position: 'relative'
          }}>
            <Zap size={30} color="var(--chartreuse-primary)" fill="var(--chartreuse-primary)" />
            <div style={{
              position: 'absolute',
              top: -3,
              right: -3,
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              backgroundColor: 'var(--pink-primary)',
              boxShadow: '0 0 10px var(--pink-primary)'
            }} />
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
            SWIFT<span style={{ color: 'var(--pink-primary)' }}>OPS</span>
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Internal Ecommerce Admin & Ops Control
          </p>
        </div>

        {/* Login Box */}
        <div className="card" style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-medium)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 42, 133, 0.08)'
        }}>
          {/* Quick Demo Access banner */}
          <div style={{
            background: 'rgba(204, 255, 0, 0.07)',
            border: '1px solid rgba(204, 255, 0, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={16} color="var(--chartreuse-primary)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--chartreuse-primary)', fontWeight: 600 }}>
                Fake Login Mode: Any email works!
              </span>
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className="btn btn-sm btn-electric"
              style={{ fontSize: '0.72rem', padding: '4px 8px' }}
            >
              1-Click Demo
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Work Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="name@company.com or any email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Any value allowed</span>
              </div>
              <input
                type="password"
                className="form-input"
                placeholder="Enter any password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
              style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Feature Highlights */}
          <div style={{
            marginTop: '24px',
            paddingTop: '18px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={14} color="var(--chartreuse-primary)" />
              <span>Realtime telemetry & 7-day revenue charts</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={14} color="var(--chartreuse-primary)" />
              <span>Order management with instant status transitions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={14} color="var(--chartreuse-primary)" />
              <span>Product catalog CRUD with low-stock alerts (&lt; 10 items)</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          SwiftOps Admin Dashboard • Day 1 Challenge Submission
        </div>
      </div>
    </div>
  );
};
