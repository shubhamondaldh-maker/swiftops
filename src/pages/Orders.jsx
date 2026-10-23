import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Eye, 
  ArrowUpDown, 
  ShoppingBag,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { OrderDetailsModal } from '../components/OrderDetailsModal';

export const Orders = () => {
  const { orders, updateOrderStatus } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'badge-pending';
      case 'shipped': return 'badge-shipped';
      case 'delivered': return 'badge-delivered';
      case 'cancelled': return 'badge-cancelled';
      default: return 'badge-pending';
    }
  };

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        if (statusFilter !== 'all' && order.status !== statusFilter) return false;
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchesId = order.id.toLowerCase().includes(query);
          const matchesName = order.customer.name.toLowerCase().includes(query);
          const matchesEmail = order.customer.email.toLowerCase().includes(query);
          return matchesId || matchesName || matchesEmail;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
        if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date);
        if (sortOrder === 'highest') return b.total - a.total;
        if (sortOrder === 'lowest') return a.total - b.total;
        return 0;
      });
  }, [orders, statusFilter, searchTerm, sortOrder]);

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length
  };

  return (
    <div>
      {/* Editorial Title */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '28px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="eyebrow eyebrow-yellow">02 DISPATCH</span>
            <span className="eyebrow" style={{ color: 'var(--text-dim)' }}>•</span>
            <span className="eyebrow">ORDER FULFILLMENT MATRIX</span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', color: '#fff', lineHeight: 1.1 }}>
            CUSTOMER <span style={{ color: 'var(--chartreuse-primary)' }}>ORDERS</span>
          </h1>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--border-subtle)'
        }}>
          <span className="eyebrow" style={{ color: 'var(--text-dim)' }}>FILTERED:</span>
          <span className="font-mono" style={{ fontWeight: 800, color: 'var(--chartreuse-primary)' }}>
            {filteredOrders.length} / {orders.length}
          </span>
        </div>
      </div>

      {/* Editorial Status Filter Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '24px'
      }}>
        {[
          { id: 'all', label: 'ALL ORDERS', count: counts.all },
          { id: 'pending', label: 'PENDING', count: counts.pending, color: 'var(--chartreuse-primary)' },
          { id: 'shipped', label: 'SHIPPED', count: counts.shipped, color: '#00d4ff' },
          { id: 'delivered', label: 'DELIVERED', count: counts.delivered, color: '#00e699' },
          { id: 'cancelled', label: 'CANCELLED', count: counts.cancelled, color: 'var(--pink-primary)' }
        ].map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className="btn btn-sm"
              style={{
                borderRadius: 'var(--radius-pill)',
                backgroundColor: isActive ? 'var(--pink-primary)' : 'var(--bg-card)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                boxShadow: isActive ? 'var(--pink-glow)' : 'none',
                border: isActive ? '1px solid transparent' : '1px solid var(--border-subtle)',
                padding: '8px 18px'
              }}
            >
              <span>{tab.label}</span>
              <span 
                className="font-mono" 
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: isActive ? 'rgba(0,0,0,0.35)' : 'var(--bg-pitch)',
                  color: isActive ? '#fff' : (tab.color || '#fff')
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Sort Toolbar */}
      <div className="card" style={{ padding: '18px 24px', marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{
            position: 'relative',
            flex: '1 1 320px',
            maxWidth: '520px'
          }}>
            <Search 
              size={18} 
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
                pointerEvents: 'none'
              }} 
            />
            <input
              type="text"
              placeholder="Search customer, email, or Order ID (e.g. ORD-9401)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '44px', height: '44px', borderRadius: 'var(--radius-pill)' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUpDown size={14} /> SORT BY:
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '10px 16px', borderRadius: 'var(--radius-pill)', fontSize: '0.82rem' }}
            >
              <option value="newest">DATE: NEWEST FIRST</option>
              <option value="oldest">DATE: OLDEST FIRST</option>
              <option value="highest">TOTAL: HIGHEST FIRST</option>
              <option value="lowest">TOTAL: LOWEST FIRST</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>DATE</th>
              <th>ITEMS</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '56px 20px', color: 'var(--text-dim)' }}>
                  <ShoppingBag size={42} color="var(--border-medium)" style={{ margin: '0 auto 14px auto' }} />
                  <div className="font-display" style={{ fontSize: '1.2rem', color: '#fff' }}>
                    NO ORDERS MATCHED
                  </div>
                  <div style={{ fontSize: '0.85rem', marginTop: '6px', color: 'var(--text-muted)' }}>
                    Try searching another query or reset the status filters.
                  </div>
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr 
                  key={order.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="font-mono" style={{ fontWeight: 800, color: '#fff' }}>
                    <span style={{ color: 'var(--pink-primary)' }}>#</span>
                    <span>{order.id}</span>
                  </td>

                  <td>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{order.customer.name}</div>
                    <div className="eyebrow" style={{ fontSize: '0.68rem', marginTop: '2px' }}>
                      {order.customer.email}
                    </div>
                  </td>

                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }} className="font-mono">
                    {order.date}
                  </td>

                  <td>
                    <span style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'var(--bg-deep)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} ITEMS
                    </span>
                  </td>

                  <td className="font-mono" style={{ fontWeight: 800, color: 'var(--chartreuse-primary)', fontSize: '1.05rem' }}>
                    ${Number(order.total).toFixed(2)}
                  </td>

                  <td onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`badge ${getStatusBadge(order.status)}`}
                      style={{
                        cursor: 'pointer',
                        outline: 'none',
                        border: '1px solid transparent',
                        padding: '6px 14px',
                        appearance: 'none',
                        textAlign: 'center'
                      }}
                      title="Click to update order status"
                    >
                      <option value="pending" style={{ background: '#0e0f15', color: '#ccff00' }}>PENDING</option>
                      <option value="shipped" style={{ background: '#0e0f15', color: '#00d4ff' }}>SHIPPED</option>
                      <option value="delivered" style={{ background: '#0e0f15', color: '#00e699' }}>DELIVERED</option>
                      <option value="cancelled" style={{ background: '#0e0f15', color: '#ff1389' }}>CANCELLED</option>
                    </select>
                  </td>

                  <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedOrder(order)}
                      style={{ borderRadius: 'var(--radius-pill)', padding: '6px 14px', fontSize: '0.75rem' }}
                    >
                      <Eye size={13} />
                      <span>INSPECT</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
