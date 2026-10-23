import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

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
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: 'var(--pink-subtle)',
          border: '1px solid var(--pink-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--pink-primary)',
          margin: '0 auto 16px auto',
          boxShadow: '0 0 20px var(--pink-glow)'
        }}>
          <AlertTriangle size={26} />
        </div>

        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>
          {title || 'Confirm Deletion'}
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
          {message || 'Are you sure you want to remove this item? This action cannot be undone.'}
        </p>

        {itemName && (
          <div style={{
            background: 'var(--bg-base)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--chartreuse-primary)',
            marginBottom: '24px'
          }}>
            {itemName}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>Delete Item</span>
          </button>
        </div>
      </div>
    </div>
  );
};
