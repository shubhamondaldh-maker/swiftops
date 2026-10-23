import React from 'react';
import { X, Package, MapPin, CreditCard, User, Calendar, CheckCircle } from 'lucide-react';

export const OrderDetailsModal = ({ order, onClose, onStatusChange }) => {
  if (!order) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'badge-pending';
      case 'shipped': return 'badge-shipped';
      case 'delivered': return 'badge-delivered';
      case 'cancelled': return 'badge-cancelled';
      default: return 'badge-pending';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '650px' }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '18px',
          borderBottom: '1px solid var(--border-medium)',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#fff' }} className="mono-num">
                {order.id}
              </h2>
              <span className={`badge ${getStatusBadge(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} />
              <span>Placed on {order.date}</span>
            </div>
          </div>

          <button 
            className="btn btn-ghost btn-icon" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Change Order Status Dropdown */}
        <div style={{
          backgroundColor: 'var(--bg-base)',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '22px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Change Order Status:
            </span>
          </div>
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem', fontWeight: 600 }}
          >
            <option value="pending">PENDING</option>
            <option value="shipped">SHIPPED</option>
            <option value="delivered">DELIVERED</option>
            <option value="cancelled">CANCELLED</option>
          </select>
        </div>

        {/* Customer & Shipping Information Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {/* Customer Card */}
          <div style={{
            backgroundColor: 'var(--bg-base)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--pink-primary)', marginBottom: '8px' }}>
              <User size={15} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>Customer Details</span>
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>
              {order.customer.name}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {order.customer.email}
            </div>
            {order.customer.phone && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                {order.customer.phone}
              </div>
            )}
          </div>

          {/* Shipping Card */}
          <div style={{
            backgroundColor: 'var(--bg-base)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--chartreuse-primary)', marginBottom: '8px' }}>
              <MapPin size={15} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>Shipping Destination</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{order.shippingAddress.country}</span>
            </div>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            fontSize: '0.82rem', 
            fontWeight: 700, 
            color: 'var(--text-muted)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.04em',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Package size={15} />
            <span>Items Ordered ({order.items.length})</span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style={{ textAlign: 'center' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Price</th>
                  <th style={{ textAlign: 'right' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>ID: {item.productId}</div>
                    </td>
                    <td style={{ textAlign: 'center' }} className="mono-num">
                      {item.quantity}
                    </td>
                    <td style={{ textAlign: 'right' }} className="mono-num">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--chartreuse-primary)' }} className="mono-num">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total & Payment Summary */}
        <div style={{
          backgroundColor: 'var(--bg-base)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="var(--pink-primary)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Payment Method</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {order.paymentMethod || 'Credit Card'}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Grand Total</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--chartreuse-primary)' }} className="mono-num">
              ${Number(order.total).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-outline" onClick={onClose}>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
