import React from 'react';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', textAlign: 'center' }}
      >
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--pink-subtle)',
          border: '1px solid var(--border-pink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--pink-primary)',
          margin: '0 auto 16px auto',
          boxShadow: 'var(--pink-glow)'
        }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '24px' }}></i>
        </div>

        <h3 className="font-display" style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px' }}>
          {title || 'CONFIRM DELETION'}
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
          {message || 'Are you sure you want to remove this item? This action cannot be undone.'}
        </p>

        {itemName && (
          <div style={{
            background: 'var(--bg-deep)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px',
            fontSize: '0.88rem',
            fontWeight: 800,
            color: 'var(--chartreuse-primary)',
            marginBottom: '24px'
          }}>
            {itemName}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button className="btn btn-outline" onClick={onClose} style={{ borderRadius: 'var(--radius-pill)', padding: '10px 20px' }}>
            Cancel
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{ borderRadius: 'var(--radius-pill)', padding: '10px 22px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <i className="fa-solid fa-trash-can"></i>
            <span>Delete Item</span>
          </button>
        </div>
      </div>
    </div>
  );
};
