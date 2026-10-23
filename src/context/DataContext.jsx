import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialOrders, last7DaysStats } from '../data/mockData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('swiftops_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('swiftops_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // Save to LocalStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem('swiftops_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('swiftops_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Product Actions
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      sku: newProduct.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      price: parseFloat(newProduct.price) || 0,
      stock: parseInt(newProduct.stock, 10) || 0,
      rating: 5.0
    };
    setProducts((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id
          ? {
              ...prod,
              ...updatedFields,
              price: updatedFields.price !== undefined ? parseFloat(updatedFields.price) : prod.price,
              stock: updatedFields.stock !== undefined ? parseInt(updatedFields.stock, 10) : prod.stock
            }
          : prod
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  // Order Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  // Reset to Mock Data
  const resetToMockData = () => {
    setProducts(initialProducts);
    setOrders(initialOrders);
    localStorage.removeItem('swiftops_products');
    localStorage.removeItem('swiftops_orders');
  };

  // Real-time Calculated Metrics
  const totalRevenue = orders
    .filter((order) => order.status !== 'cancelled')
    .reduce((acc, curr) => acc + (parseFloat(curr.total) || 0), 0);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter((order) => order.status === 'pending').length;

  const lowStockCount = products.filter((p) => Number(p.stock) < 10).length;

  return (
    <DataContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        resetToMockData,
        last7DaysStats,
        stats: {
          totalRevenue,
          totalOrders,
          pendingOrders,
          lowStockCount
        }
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
