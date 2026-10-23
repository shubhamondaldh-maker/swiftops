import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { ProductModal } from '../components/ProductModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { StockMeter } from '../components/StockMeter';

export const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct, stats } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortField, setSortField] = useState('default');

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (categoryFilter !== 'all' && product.category !== categoryFilter) return false;
        if (stockFilter === 'low-stock' && Number(product.stock) >= 10) return false;
        if (stockFilter === 'in-stock' && Number(product.stock) < 10) return false;
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesCategory = product.category.toLowerCase().includes(q);
          const matchesSku = product.sku ? product.sku.toLowerCase().includes(q) : false;
          return matchesName || matchesCategory || matchesSku;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortField === 'price-asc') return a.price - b.price;
        if (sortField === 'price-desc') return b.price - a.price;
        if (sortField === 'stock-asc') return a.stock - b.stock;
        if (sortField === 'stock-desc') return b.stock - a.stock;
        return 0;
      });
  }, [products, categoryFilter, stockFilter, searchTerm, sortField]);

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setProductToEdit(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (formData) => {
    if (productToEdit) {
      updateProduct(productToEdit.id, formData);
    } else {
      addProduct(formData);
    }
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div>
      {/* Editorial Title & Add Action */}
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
            <span className="eyebrow eyebrow-pink">03 CATALOGUE</span>
            <span className="eyebrow" style={{ color: 'var(--text-dim)' }}>•</span>
            <span className="eyebrow">INVENTORY INTELLIGENCE</span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', color: '#fff', lineHeight: 1.1 }}>
            PRODUCT <span style={{ color: 'var(--pink-primary)' }}>INVENTORY</span>
          </h1>
        </div>

        <button 
          onClick={handleOpenAddModal}
          className="btn btn-primary"
          style={{ padding: '12px 26px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <i className="fa-solid fa-plus"></i>
          <span>ADD NEW PRODUCT</span>
        </button>
      </div>

      {/* Critical Stock Alert Banner */}
      {stats.lowStockCount > 0 && (
        <div style={{
          backgroundColor: 'var(--pink-subtle)',
          border: '1px solid var(--border-pink)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 24px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: 'var(--pink-glow)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--pink-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0
            }}>
              <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '18px' }}></i>
            </div>
            <div>
              <div className="font-display" style={{ fontSize: '1.05rem', color: '#fff' }}>
                CRITICAL INVENTORY ALERT: <span style={{ color: 'var(--chartreuse-primary)' }}>{stats.lowStockCount} PRODUCTS</span> &lt; 10 UNITS
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                These items require immediate warehouse restocking. Highlighted with pulsing energy meters below.
              </div>
            </div>
          </div>

          <button
            onClick={() => setStockFilter(stockFilter === 'low-stock' ? 'all' : 'low-stock')}
            className={`btn btn-sm ${stockFilter === 'low-stock' ? 'btn-electric' : 'btn-danger'}`}
            style={{ borderRadius: 'var(--radius-pill)', padding: '8px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <i className="fa-solid fa-filter"></i>
            <span>{stockFilter === 'low-stock' ? 'SHOW ALL CATALOGUE' : 'FILTER LOW STOCK ONLY'}</span>
          </button>
        </div>
      )}

      {/* Controls Bar */}
      <div className="card" style={{ padding: '18px 24px', marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            flex: '1 1 300px',
            maxWidth: '480px'
          }}>
            <i 
              className="fa-solid fa-magnifying-glass"
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
              placeholder="Search by name, SKU or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '44px', height: '44px', borderRadius: 'var(--radius-pill)' }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '10px 16px', borderRadius: 'var(--radius-pill)', fontSize: '0.82rem' }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'ALL CATEGORIES' : cat.toUpperCase()}
                </option>
              ))}
            </select>

            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '10px 16px', borderRadius: 'var(--radius-pill)', fontSize: '0.82rem' }}
            >
              <option value="default">DEFAULT ORDER</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="stock-asc">STOCK: LOWEST FIRST</option>
              <option value="stock-desc">STOCK: HIGHEST FIRST</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>PRODUCT CATALOGUE</th>
              <th>CATEGORY</th>
              <th>UNIT PRICE</th>
              <th>HEALTH STATUS</th>
              <th>TELEMETRY STOCK METER</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '56px 20px', color: 'var(--text-dim)' }}>
                  <i className="fa-solid fa-box-open" style={{ fontSize: '38px', color: 'var(--border-medium)', marginBottom: '14px', display: 'block' }}></i>
                  <div className="font-display" style={{ fontSize: '1.2rem', color: '#fff' }}>
                    NO PRODUCTS FOUND
                  </div>
                  <div style={{ fontSize: '0.85rem', marginTop: '6px', color: 'var(--text-muted)' }}>
                    Add a new item to populate the catalogue.
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => {
                const isLowStock = Number(product.stock) < 10;
                return (
                  <tr 
                    key={product.id}
                    className={isLowStock ? 'highlight-low-stock' : ''}
                  >
                    <td>
                      <div>
                        <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.98rem' }}>
                          {product.name}
                        </div>
                        <div className="eyebrow" style={{ fontSize: '0.68rem', marginTop: '3px' }}>
                          <span className="font-mono">ID: {product.id}</span>
                          {product.sku && <span> • SKU: {product.sku}</span>}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="eyebrow" style={{
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'var(--bg-deep)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-muted)'
                      }}>
                        {product.category}
                      </span>
                    </td>

                    <td className="font-mono" style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff' }}>
                      ${Number(product.price).toFixed(2)}
                    </td>

                    <td>
                      {isLowStock ? (
                        <span className="badge badge-low-stock">
                          <i className="fa-solid fa-triangle-exclamation"></i>
                          <span>LOW STOCK (&lt; 10)</span>
                        </span>
                      ) : (
                        <span className="badge badge-delivered">
                          <i className="fa-solid fa-circle-check"></i>
                          <span>HEALTHY INVENTORY</span>
                        </span>
                      )}
                    </td>

                    {/* Futuristic Stock Battery Meter Gauge */}
                    <td>
                      <StockMeter stock={product.stock} />
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleOpenEditModal(product)}
                          style={{ borderRadius: 'var(--radius-pill)', padding: '6px 14px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                          <span>EDIT</span>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setProductToDelete(product)}
                          style={{ borderRadius: 'var(--radius-pill)', padding: '6px 14px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                          <span>DELETE</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />

      <ConfirmModal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="DELETE PRODUCT FROM CATALOGUE?"
        message="This action will remove the listing and all inventory records."
        itemName={productToDelete?.name}
      />
    </div>
  );
};
