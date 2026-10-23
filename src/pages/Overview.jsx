import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight, 
  Calendar,
  Layers,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import { OrderDetailsModal } from '../components/OrderDetailsModal';
import heroArtwork from '../assets/hero_wave.jpg';

export const Overview = () => {
  const { stats, orders, products, last7DaysStats, updateOrderStatus } = useData();
  const [chartMode, setChartMode] = useState('revenue');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = products.filter((p) => Number(p.stock) < 10).slice(0, 4);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'badge-pending';
      case 'shipped': return 'badge-shipped';
      case 'delivered': return 'badge-delivered';
      case 'cancelled': return 'badge-cancelled';
      default: return 'badge-pending';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-pink)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          boxShadow: 'var(--pink-glow)'
        }}>
          <div className="eyebrow" style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>
            {label}
          </div>
          <div className="font-display" style={{ 
            fontSize: '1.4rem', 
            color: chartMode === 'revenue' ? 'var(--pink-primary)' : 'var(--chartreuse-primary)' 
          }}>
            {chartMode === 'revenue' 
              ? `$${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 })}` 
              : `${payload[0].value} ORDERS`}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Editorial Hero Telemetry Header (Inspired by Sound Waves layout) */}
      <div style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, #090a10 0%, #12131d 100%)',
        border: '1px solid var(--border-subtle)',
        padding: '36px 44px',
        marginBottom: '32px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        {/* Subtle background wave art thumbnail with gentle pulse */}
        <div style={{
          position: 'absolute',
          right: '4%',
          top: '-15%',
          width: '340px',
          height: '260px',
          opacity: 0.2,
          pointerEvents: 'none',
          backgroundImage: `url(${heroArtwork})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(1px) contrast(1.2)',
          borderRadius: '24px',
          animation: 'pulseGlow 6s ease-in-out infinite alternate'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="eyebrow eyebrow-pink">01 TELEMETRY</span>
            <span className="eyebrow" style={{ color: 'var(--text-dim)' }}>•</span>
            <span className="eyebrow eyebrow-yellow">REAL-TIME COMMERCE PIPELINE</span>
          </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.05, color: '#fff' }}>
            OPERATIONS <span style={{ color: 'var(--pink-primary)' }}>CONTROL</span>
          </h1>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '10px', lineHeight: 1.5 }}>
            Automated sales telemetry, customer checkout pipelines, and low-inventory restock triggers.
          </p>
        </div>

        {/* Live Cycle Badge */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'right' }} className="overview-cycle-badge">
          <div className="eyebrow" style={{ color: 'var(--text-dim)', marginBottom: '4px' }}>TELEMETRY WINDOW</div>
          <div className="font-display" style={{ fontSize: '1.25rem', color: 'var(--chartreuse-primary)' }}>
            PAST 7 DAYS
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {orders.length} total orders recorded
          </div>
        </div>
      </div>

      {/* 4 Stat Cards with Animated Count-Up & 3D Tilt */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <StatCard
          step="01"
          title="TOTAL REVENUE"
          rawNumber={stats.totalRevenue}
          prefix="$"
          decimals={2}
          subtitle="Net completed volume"
          icon={DollarSign}
          colorVariant="yellow"
          trend="+18.4% SURGE"
        />

        <StatCard
          step="02"
          title="TOTAL ORDERS"
          rawNumber={stats.totalOrders}
          subtitle="All recorded checkouts"
          icon={ShoppingBag}
          colorVariant="yellow"
          trend="ACTIVE PIPELINE"
        />

        <StatCard
          step="03"
          title="PENDING ORDERS"
          rawNumber={stats.pendingOrders}
          subtitle="Awaiting fulfillment"
          icon={Clock}
          colorVariant="yellow"
          trend="DISPATCH QUEUE"
        />

        <StatCard
          step="04"
          title="LOW-STOCK ALERT"
          rawNumber={stats.lowStockCount}
          suffix=" ITEMS"
          subtitle="Inventory < 10 units"
          icon={AlertTriangle}
          colorVariant="pink"
          trend="ACTION NEEDED"
        />
      </div>

      {/* 7-Day Interactive Telemetry Chart */}
      <div className="card" style={{ marginBottom: '32px', padding: '30px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="var(--pink-primary)" />
              <h2 className="font-display" style={{ fontSize: '1.35rem', color: '#fff' }}>
                7-DAY SALES VELOCITY
              </h2>
            </div>
            <p className="eyebrow" style={{ color: 'var(--text-dim)', marginTop: '4px' }}>
              REVENUE CURVE AND VOLUME DISPATCH
            </p>
          </div>

          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-deep)',
            padding: '4px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={() => setChartMode('revenue')}
              className="btn btn-sm"
              style={{
                backgroundColor: chartMode === 'revenue' ? 'var(--pink-primary)' : 'transparent',
                color: chartMode === 'revenue' ? '#fff' : 'var(--text-muted)',
                boxShadow: chartMode === 'revenue' ? 'var(--pink-glow)' : 'none',
                borderRadius: 'var(--radius-pill)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              REVENUE ($)
            </button>
            <button
              onClick={() => setChartMode('orders')}
              className="btn btn-sm"
              style={{
                backgroundColor: chartMode === 'orders' ? 'var(--chartreuse-primary)' : 'transparent',
                color: chartMode === 'orders' ? 'var(--bg-pitch)' : 'var(--text-muted)',
                boxShadow: chartMode === 'orders' ? 'var(--chartreuse-glow)' : 'none',
                borderRadius: 'var(--radius-pill)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              ORDERS COUNT
            </button>
          </div>
        </div>

        {/* Recharts Area Container */}
        <div style={{ width: '100%', height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={last7DaysStats} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="pinkWaveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff1389" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#ff1389" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="yellowWaveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ccff00" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#ccff00" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis 
                dataKey="day" 
                stroke="#545768" 
                fontSize={12} 
                tickLine={false} 
              />
              <YAxis 
                stroke="#545768" 
                fontSize={12} 
                tickLine={false}
                tickFormatter={(val) => chartMode === 'revenue' ? `$${val}` : val}
              />
              <Tooltip content={<CustomTooltip />} />
              {chartMode === 'revenue' ? (
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ff1389" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#pinkWaveGradient)" 
                />
              ) : (
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#ccff00" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#yellowWaveGradient)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Recent Orders & Low Stock Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '28px'
      }}>
        {/* Recent Orders Card */}
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <div>
              <span className="eyebrow eyebrow-yellow">02 DISPATCH</span>
              <h3 className="font-display" style={{ fontSize: '1.2rem', color: '#fff', marginTop: '2px' }}>
                RECENT ORDERS
              </h3>
            </div>
            <Link to="/orders" className="btn btn-ghost btn-sm" style={{ color: 'var(--chartreuse-primary)' }}>
              <span>VIEW ALL</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ORDER</th>
                  <th>CUSTOMER</th>
                  <th>TOTAL</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="font-mono" style={{ fontWeight: 700, color: '#fff' }}>
                      {order.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{order.customer.name}</div>
                      <div className="eyebrow" style={{ fontSize: '0.65rem', marginTop: '2px' }}>{order.date}</div>
                    </td>
                    <td className="font-mono" style={{ fontWeight: 700, color: 'var(--chartreuse-primary)' }}>
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Watchlist */}
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <div>
              <span className="eyebrow eyebrow-pink">03 CRITICAL INVENTORY</span>
              <h3 className="font-display" style={{ fontSize: '1.2rem', color: '#fff', marginTop: '2px' }}>
                LOW STOCK WATCHLIST
              </h3>
            </div>
            <Link to="/products" className="btn btn-ghost btn-sm" style={{ color: 'var(--pink-primary)' }}>
              <span>CATALOG</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {lowStockProducts.map((prod) => (
              <div 
                key={prod.id}
                style={{
                  backgroundColor: 'var(--bg-deep)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: '4px solid var(--pink-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                className="hover-lift"
              >
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>
                    {prod.name}
                  </div>
                  <div className="eyebrow" style={{ fontSize: '0.68rem', marginTop: '2px' }}>
                    {prod.category} • SKU: {prod.sku}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="badge badge-low-stock">
                    <AlertTriangle size={12} />
                    {prod.stock} UNITS LEFT
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    ${Number(prod.price).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={(id, status) => {
            updateOrderStatus(id, status);
            setSelectedOrder((prev) => (prev ? { ...prev, status } : null));
          }}
        />
      )}
    </div>
  );
};
