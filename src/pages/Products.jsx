import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  Package, 
  Filter, 
  ArrowUpDown,
  Tag,
  Check
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ProductModal } from '../components/ProductModal';
import { ConfirmModal } from '../components/ConfirmModal';

export const Products = () => {
  const { products, addProduct, updateProduct, deleteProduct, stats } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'low-stock', 'in-stock'
  const [sortField, setSortField] = useState('default');

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (categoryFilter !== 'all' && product.category !== categoryFilter) {
          return false;
        }
        // Stock filter
        if (stockFilter === 'low-stock' && Number(product.stock) >= 10) {
          return false;
        }
        if (stockFilter === 'in-stock' && Number(product.stock) < 10) {
          return false;
        }
        // Search term
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
      {/* Header with Title and Add Product Action */}
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
            Product Inventory
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Catalog management, stock levels, and automated low-inventory alerts.
          </p>
        </div>

        <button 
          onClick={handleOpenAddModal}
          className="btn btn-primary"
          style={{ gap: '8px' }}
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Critical Stock Alert Bar (if any low-stock items exist) */}
      {stats.lowStockCount > 0 && (
        <div style={{
          backgroundColor: 'rgba(255, 42, 133, 0.08)',
          border: '1px solid var(--pink-border)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--pink-subtle)',
              border: '1px solid var(--pink-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--pink-primary)',
              flexShrink: 0
            }}>
              <AlertTriangle size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                Low Inventory Alert: <span style={{ color: 'var(--pink-primary)' }}>{stats.lowStockCount} items</span> have less than 10 units in stock!
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Items below 10 units are highlighted in hot pink to prioritize replenishment.
              </div>
            </div>
          </div>

          <button
            onClick={() => setStockFilter(stockFilter === 'low-stock' ? 'all' : 'low-stock')}
            className={`btn btn-sm ${stockFilter === 'low-stock' ? 'btn-electric' : 'btn-danger'}`}
            style={{ fontSize: '0.78rem' }}
          >
            {stockFilter === 'low-stock' ? 'Show All Products' : 'Filter Low Stock Only'}
          </button>
        </div>
      )}

      {/* Controls Bar: Search, Category, Stock, Sort */}
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
            flex: '1 1 280px',
            maxWidth: '450px'
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
              placeholder="Search products by name, SKU or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '38px', height: '42px' }}
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '8px 14px', fontSize: '0.82rem' }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Sort Field */}
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '8px 14px', fontSize: '0.82rem' }}
            >
              <option value="default">Default Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock-asc">Stock: Lowest First</option>
              <option value="stock-desc">Stock: Highest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product Information</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Status</th>
              <th>Inventory Level</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-dim)' }}>
                  <Package size={36} color="var(--border-strong)" style={{ margin: '0 auto 12px auto' }} />
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    No products found matching filters
                  </div>
                  <div style={{ fontSize: '0.82rem', marginTop: '4px' }}>
                    Click "Add New Product" to create one.
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
                    {/* Product Name & SKU */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div>
                          <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>
                            {product.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="mono-num">ID: {product.id}</span>
                            {product.sku && <span>• SKU: {product.sku}</span>}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span style={{
                        fontSize: '0.78rem',
                        padding: '3px 9px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--bg-base)',
                        border: '1px solid var(--border-medium)',
                        color: 'var(--text-main)'
                      }}>
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="mono-num" style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                      ${Number(product.price).toFixed(2)}
                    </td>

                    {/* Low Stock Warning or In Stock Badge */}
                    <td>
                      {isLowStock ? (
                        <span className="badge badge-low-stock">
                          <AlertTriangle size={12} />
                          Low Stock (&lt; 10)
                        </span>
                      ) : (
                        <span className="badge badge-delivered" style={{ textTransform: 'capitalize' }}>
                          <Check size={12} />
                          Healthy Stock
                        </span>
                      )}
                    </td>

                    {/* Stock Count */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span 
                          className="mono-num" 
                          style={{ 
                            fontWeight: 800, 
                            fontSize: '1rem',
                            color: isLowStock ? 'var(--pink-primary)' : 'var(--chartreuse-primary)' 
                          }}
                        >
                          {product.stock}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>units</span>
                      </div>
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleOpenEditModal(product)}
                          title="Edit Product"
                          style={{ padding: '6px 10px' }}
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => setProductToDelete(product)}
                          title="Delete Product"
                          style={{ padding: '6px 10px' }}
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
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

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product?"
        message="Are you sure you want to remove this product from inventory? This will delete its listing."
        itemName={productToDelete?.name}
      />
    </div>
  );
};
