import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Calendar, 
  ArrowUpDown, 
  Download, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  ShoppingBag
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { OrderDetailsModal } from '../components/OrderDetailsModal';

export const Orders = () => {
  const { orders, updateOrderStatus } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'oldest', 'highest', 'lowest'
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Status badge styles
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'badge-pending';
      case 'shipped': return 'badge-shipped';
      case 'delivered': return 'badge-delivered';
      case 'cancelled': return 'badge-cancelled';
      default: return 'badge-pending';
    }
  };

  // Filter & Search Logic
  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        // Status Filter
        if (statusFilter !== 'all' && order.status !== statusFilter) {
          return false;
        }
        // Search Term (matches order id, customer name, customer email)
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

  // Counts for tabs
  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length
  };

  return (
    <div>
      {/* Page Title & Stats */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
            Customer Orders
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Inspect receipts, update delivery states, and search orders across all channels.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>Showing</span>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--chartreuse-primary)',
            fontFamily: 'var(--font-mono)'
          }}>
            {filteredOrders.length} of {orders.length}
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>orders</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '20px'
      }}>
        {[
          { id: 'all', label: 'All Orders', count: counts.all },
          { id: 'pending', label: 'Pending', count: counts.pending, color: 'var(--chartreuse-primary)' },
          { id: 'shipped', label: 'Shipped', count: counts.shipped, color: '#00d4ff' },
          { id: 'delivered', label: 'Delivered', count: counts.delivered, color: '#00e699' },
          { id: 'cancelled', label: 'Cancelled', count: counts.cancelled, color: 'var(--pink-primary)' }
        ].map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className="btn btn-sm"
              style={{
                backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-muted)',
                border: isActive ? '1px solid var(--border-strong)' : '1px solid var(--border-subtle)',
                boxShadow: isActive ? '0 0 14px rgba(255, 42, 133, 0.1)' : 'none'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '999px',
                backgroundColor: 'var(--bg-base)',
                color: tab.color || 'var(--text-main)',
                fontFamily: 'var(--font-mono)'
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Search & Sorting */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '22px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px'
        }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            flex: '1 1 300px',
            maxWidth: '500px'
          }}>
            <Search 
              size={17} 
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
                pointerEvents: 'none'
              }} 
            />
            <input
              type="text"
              placeholder="Search by Customer name, email, or Order ID (e.g. ORD-9401)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '38px', height: '42px' }}
            />
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpDown size={14} /> Sort By:
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '8px 14px', fontSize: '0.82rem' }}
            >
              <option value="newest">Date: Newest First</option>
              <option value="oldest">Date: Oldest First</option>
              <option value="highest">Total: Highest First</option>
              <option value="lowest">Total: Lowest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-dim)' }}>
                  <ShoppingBag size={36} color="var(--border-strong)" style={{ margin: '0 auto 12px auto' }} />
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    No orders match your filter criteria
                  </div>
                  <div style={{ fontSize: '0.82rem', marginTop: '4px' }}>
                    Try searching a different keyword or resetting status filters.
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
                  {/* Order ID */}
                  <td className="mono-num" style={{ fontWeight: 700, color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--pink-primary)' }}>#</span>
                      <span>{order.id}</span>
                    </div>
                  </td>

                  {/* Customer */}
                  <td>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{order.customer.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{order.customer.email}</div>
                  </td>

                  {/* Date */}
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {order.date}
                  </td>

                  {/* Items count */}
                  <td>
                    <span style={{
                      fontSize: '0.78rem',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-base)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)'
                    }}>
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </span>
                  </td>

                  {/* Total */}
                  <td className="mono-num" style={{ fontWeight: 800, color: 'var(--chartreuse-primary)', fontSize: '0.95rem' }}>
                    ${Number(order.total).toFixed(2)}
                  </td>

                  {/* Status Dropdown (inline mutation) */}
                  <td onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`badge ${getStatusBadge(order.status)}`}
                      style={{
                        cursor: 'pointer',
                        outline: 'none',
                        border: '1px solid transparent',
                        padding: '4px 10px',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        textAlign: 'center'
                      }}
                      title="Click to update order status"
                    >
                      <option value="pending" style={{ background: '#111217', color: '#ccff00' }}>PENDING</option>
                      <option value="shipped" style={{ background: '#111217', color: '#00d4ff' }}>SHIPPED</option>
                      <option value="delivered" style={{ background: '#111217', color: '#00e699' }}>DELIVERED</option>
                      <option value="cancelled" style={{ background: '#111217', color: '#ff2a85' }}>CANCELLED</option>
                    </select>
                  </td>

                  {/* View Details button */}
                  <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedOrder(order)}
                      style={{ gap: '6px', fontSize: '0.78rem' }}
                    >
                      <Eye size={14} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
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
