import React from 'react';

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
              <h2 className="font-display" style={{ fontSize: '1.25rem', color: '#fff' }}>
                {order.id}
              </h2>
              <span className={`badge ${getStatusBadge(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-regular fa-calendar-days" style={{ fontSize: '12px' }}></i>
              <span>Placed on {order.date}</span>
            </div>
          </div>

          <button 
            className="btn btn-ghost btn-icon" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark" style={{ fontSize: '1.2rem' }}></i>
          </button>
        </div>

        {/* Change Order Status Dropdown */}
        <div style={{
          backgroundColor: 'var(--bg-deep)',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '22px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
              Change Order Status:
            </span>
          </div>
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 14px', fontSize: '0.82rem', fontWeight: 700, borderRadius: 'var(--radius-pill)' }}
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
            backgroundColor: 'var(--bg-deep)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--pink-primary)', marginBottom: '8px' }}>
              <i className="fa-solid fa-user" style={{ fontSize: '13px' }}></i>
              <span className="eyebrow" style={{ color: 'var(--pink-primary)' }}>Customer Details</span>
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>
              {order.customer.name}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {order.customer.email}
            </div>
            {order.customer.phone && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }} className="font-mono">
                {order.customer.phone}
              </div>
            )}
          </div>

          {/* Shipping Card */}
          <div style={{
            backgroundColor: 'var(--bg-deep)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--chartreuse-primary)', marginBottom: '8px' }}>
              <i className="fa-solid fa-location-dot" style={{ fontSize: '13px' }}></i>
              <span className="eyebrow" style={{ color: 'var(--chartreuse-primary)' }}>Shipping Destination</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-white)', lineHeight: 1.4 }}>
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{order.shippingAddress.country}</span>
            </div>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="fa-solid fa-box-open" style={{ fontSize: '14px', color: 'var(--text-dim)' }}></i>
            <span className="eyebrow">Items Ordered ({order.items.length})</span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th style={{ textAlign: 'center' }}>QTY</th>
                  <th style={{ textAlign: 'right' }}>PRICE</th>
                  <th style={{ textAlign: 'right' }}>SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#fff' }}>{item.name}</div>
                      <div className="eyebrow" style={{ fontSize: '0.65rem' }}>ID: {item.productId}</div>
                    </td>
                    <td style={{ textAlign: 'center' }} className="font-mono">
                      {item.quantity}
                    </td>
                    <td style={{ textAlign: 'right' }} className="font-mono">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--chartreuse-primary)' }} className="font-mono">
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
          backgroundColor: 'var(--bg-deep)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-credit-card" style={{ fontSize: '18px', color: 'var(--pink-primary)' }}></i>
            <div>
              <div className="eyebrow" style={{ fontSize: '0.65rem' }}>PAYMENT METHOD</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                {order.paymentMethod || 'Credit Card'}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="eyebrow">GRAND TOTAL</span>
            <div className="font-display" style={{ fontSize: '1.4rem', color: 'var(--chartreuse-primary)' }}>
              ${Number(order.total).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-outline" onClick={onClose} style={{ borderRadius: 'var(--radius-pill)', padding: '8px 20px' }}>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
