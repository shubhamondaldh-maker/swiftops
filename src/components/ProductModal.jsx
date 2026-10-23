import React, { useState, useEffect } from 'react';

export const ProductModal = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Gaming',
    price: '',
    stock: '',
    sku: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || 'Gaming',
        price: productToEdit.price !== undefined ? productToEdit.price : '',
        stock: productToEdit.stock !== undefined ? productToEdit.stock : '',
        sku: productToEdit.sku || '',
        description: productToEdit.description || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'Gaming',
        price: '',
        stock: '',
        sku: '',
        description: ''
      });
    }
    setErrors({});
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Valid price greater than 0 is required';
    }
    if (formData.stock === '' || isNaN(formData.stock) || Number(formData.stock) < 0) {
      newErrors.stock = 'Valid stock count (>= 0) is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10)
    });
    onClose();
  };

  const categories = ['Gaming', 'Audio', 'Apparel', 'Electronics', 'Accessories', 'Furniture', 'Other'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '540px' }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-medium)',
          marginBottom: '20px'
        }}>
          <div>
            <h2 className="font-display" style={{ fontSize: '1.25rem', color: '#fff' }}>
              {productToEdit ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              {productToEdit 
                ? `Updating specifications for ${productToEdit.id}`
                : 'Create a new inventory listing in your catalog'}
            </p>
          </div>
          <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close modal">
            <i className="fa-solid fa-xmark" style={{ fontSize: '1.1rem' }}></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Cyberdeck Mechanical Keyboard"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              autoFocus
            />
            {errors.name && (
              <span style={{ fontSize: '0.75rem', color: 'var(--pink-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>{errors.name}</span>
              </span>
            )}
          </div>

          {/* Category & SKU */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">SKU (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. KB-RGB-99"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              />
            </div>
          </div>

          {/* Price & Stock */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Price ($ USD) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="form-input"
                placeholder="e.g. 149.99"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              {errors.price && (
                <span style={{ fontSize: '0.75rem', color: 'var(--pink-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{errors.price}</span>
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Stock Quantity *</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="e.g. 25"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
              {errors.stock && (
                <span style={{ fontSize: '0.75rem', color: 'var(--pink-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{errors.stock}</span>
                </span>
              )}
              {formData.stock !== '' && Number(formData.stock) < 10 && (
                <span style={{ fontSize: '0.73rem', color: 'var(--pink-primary)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span>Stock is below 10 (Low-stock highlight will trigger)</span>
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Key specifications, materials, warranty..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <i className={productToEdit ? 'fa-solid fa-check' : 'fa-solid fa-plus'}></i>
              <span>{productToEdit ? 'Save Changes' : 'Add to Inventory'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
