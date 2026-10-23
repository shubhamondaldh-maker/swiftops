import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import { OrderDetailsModal } from '../components/OrderDetailsModal';

export const Overview = () => {
  const { stats, orders, products, last7DaysStats, updateOrderStatus } = useData();
  const [chartMode, setChartMode] = useState('revenue'); // 'revenue' or 'orders'
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Recent 5 orders
  const recentOrders = orders.slice(0, 5);

  // Low stock products
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
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            {label}
          </div>
          <div style={{ 
            fontSize: '1rem', 
            fontWeight: 800, 
            color: chartMode === 'revenue' ? 'var(--pink-primary)' : 'var(--chartreuse-primary)' 
          }} className="mono-num">
            {chartMode === 'revenue' 
              ? `$${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 })}` 
              : `${payload[0].value} orders`}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Top Welcome Title */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '26px'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
            Operations Telemetry
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Live performance summary, inventory alerts, and 7-day revenue pipeline.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--bg-surface)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Calendar size={14} color="var(--chartreuse-primary)" />
            <span>Cycle: Last 7 Days</span>
          </div>
        </div>
      </div>

      {/* 4 Required Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '28px'
      }}>
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="Net completed/active sales"
          icon={DollarSign}
          colorVariant="yellow"
          trend="+18.4%"
        />

        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          subtitle="All recorded checkouts"
          icon={ShoppingBag}
          colorVariant="yellow"
          trend="+12 New"
        />

        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          subtitle="Awaiting fulfillment / dispatch"
          icon={Clock}
          colorVariant={stats.pendingOrders > 0 ? 'yellow' : 'yellow'}
          trend="Action Needed"
        />

        <StatCard
          title="Low-Stock Products"
          value={stats.lowStockCount}
          subtitle="Units under threshold (< 10)"
          icon={AlertTriangle}
          colorVariant="pink"
          trend="Restock Alert"
        />
      </div>

      {/* 7-Day Interactive Telemetry Chart */}
      <div className="card" style={{ marginBottom: '28px', padding: '24px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="var(--pink-primary)" />
              <h2 style={{ fontSize: '1.15rem', color: '#fff' }}>
                7-Day Sales Telemetry
              </h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Daily tracking of ecommerce volume and aggregate order count.
            </p>
          </div>

          {/* Toggle between Revenue & Orders */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-base)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-medium)'
          }}>
            <button
              onClick={() => setChartMode('revenue')}
              className="btn btn-sm"
              style={{
                backgroundColor: chartMode === 'revenue' ? 'var(--pink-primary)' : 'transparent',
                color: chartMode === 'revenue' ? '#fff' : 'var(--text-muted)',
                boxShadow: chartMode === 'revenue' ? '0 0 12px var(--pink-glow)' : 'none',
                padding: '6px 14px'
              }}
            >
              Revenue ($)
            </button>
            <button
              onClick={() => setChartMode('orders')}
              className="btn btn-sm"
              style={{
                backgroundColor: chartMode === 'orders' ? 'var(--chartreuse-primary)' : 'transparent',
                color: chartMode === 'orders' ? 'var(--bg-deep)' : 'var(--text-muted)',
                fontWeight: chartMode === 'orders' ? 700 : 500,
                boxShadow: chartMode === 'orders' ? '0 0 12px var(--chartreuse-glow)' : 'none',
                padding: '6px 14px'
              }}
            >
              Orders Count
            </button>
          </div>
        </div>

        {/* Recharts Area Container */}
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={last7DaysStats} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff2a85" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ff2a85" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ccff00" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ccff00" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis 
                dataKey="day" 
                stroke="#60657e" 
                fontSize={12} 
                tickLine={false} 
              />
              <YAxis 
                stroke="#60657e" 
                fontSize={12} 
                tickLine={false}
                tickFormatter={(val) => chartMode === 'revenue' ? `$${val}` : val}
              />
              <Tooltip content={<CustomTooltip />} />
              {chartMode === 'revenue' ? (
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ff2a85" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#pinkGradient)" 
                />
              ) : (
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#ccff00" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#yellowGradient)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Recent Orders & Low Stock Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '24px'
      }}>
        {/* Recent Orders Card */}
        <div className="card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#fff' }}>Recent Orders</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                Latest purchase transactions
              </p>
            </div>
            <Link to="/orders" className="btn btn-ghost btn-sm" style={{ color: 'var(--chartreuse-primary)', gap: '4px' }}>
              <span>View All</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    style={{ cursor: 'pointer' }}
                    title="Click to view order details"
                  >
                    <td className="mono-num" style={{ fontWeight: 700, color: '#fff' }}>
                      {order.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{order.customer.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{order.date}</div>
                    </td>
                    <td className="mono-num" style={{ fontWeight: 700, color: 'var(--chartreuse-primary)' }}>
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
            marginBottom: '16px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#fff' }}>Low-Stock Watchlist</h3>
                <span className="badge badge-low-stock" style={{ fontSize: '0.7rem' }}>
                  Critical
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                Items with fewer than 10 units in warehouse
              </p>
            </div>
            <Link to="/products" className="btn btn-ghost btn-sm" style={{ color: 'var(--pink-primary)', gap: '4px' }}>
              <span>Manage</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {lowStockProducts.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                No low stock alerts. All inventories healthy!
              </div>
            ) : (
              lowStockProducts.map((prod) => (
                <div 
                  key={prod.id}
                  style={{
                    backgroundColor: 'var(--bg-base)',
                    border: '1px solid var(--border-subtle)',
                    borderLeft: '3px solid var(--pink-primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                      {prod.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {prod.category} • SKU: {prod.sku}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'rgba(255, 42, 133, 0.15)',
                      color: 'var(--pink-primary)',
                      border: '1px solid var(--pink-border)',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      fontSize: '0.78rem',
                      fontWeight: 700
                    }} className="mono-num">
                      <AlertTriangle size={12} />
                      {prod.stock} left
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '3px' }} className="mono-num">
                      ${Number(prod.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Order Details Modal when clicked */}
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
