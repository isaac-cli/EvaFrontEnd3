import React, { useState, useEffect } from 'react';
import './App.css';

// Componentes reutilizables (separación de responsabilidades)
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import InventoryTab from './components/InventoryTab';
import MovementsTab from './components/MovementsTab';
import ProductModal from './components/ProductModal';
import MovementModal from './components/MovementModal';
import Footer from './components/Footer';

// Initial default data if LocalStorage is empty
const DEFAULT_PRODUCTS = [
  { id: '1', name: 'Almendras Enteras', category: 'Frutos Secos', stock: 12.5, minStock: 25.0, priceBuy: 4500, priceSell: 8000, description: 'Almendras chilenas de exportación, variedad Nonpareil.', unit: 'kg' },
  { id: '2', name: 'Nuez Mariposa Light', category: 'Frutos Secos', stock: 8.0, minStock: 15.0, priceBuy: 5200, priceSell: 9500, description: 'Nueces peladas mariposa color claro, cosecha nueva.', unit: 'kg' },
  { id: '3', name: 'Pistachos Tostados con Sal', category: 'Frutos Secos', stock: 22.0, minStock: 10.0, priceBuy: 7500, priceSell: 13000, description: 'Pistachos importados de California con cáscara.', unit: 'kg' },
  { id: '4', name: 'Pasas de Uva Sultana', category: 'Fruta Deshidratada', stock: 45.0, minStock: 20.0, priceBuy: 1800, priceSell: 3800, description: 'Pasas morenas dulces sin semilla, ideales para repostería.', unit: 'kg' },
  { id: '5', name: 'Semillas de Zapallo', category: 'Semillas', stock: 4.5, minStock: 12.0, priceBuy: 3200, priceSell: 6500, description: 'Semillas de calabaza peladas y crudas, excelente fuente de zinc.', unit: 'kg' },
  { id: '6', name: 'Arándanos Deshidratados', category: 'Fruta Deshidratada', stock: 15.0, minStock: 15.0, priceBuy: 4000, priceSell: 8500, description: 'Arándanos endulzados con jugo de manzana.', unit: 'kg' },
  { id: '7', name: 'Castañas de Cajú W450', category: 'Frutos Secos', stock: 6.0, minStock: 15.0, priceBuy: 6800, priceSell: 12000, description: 'Castañas de cajú crudas y enteras.', unit: 'kg' }
];

const DEFAULT_MOVEMENTS = [
  { id: 'm1', productId: '1', productName: 'Almendras Enteras', type: 'entrada', quantity: 30.0, reason: 'Compra Proveedor', date: '2026-06-20T10:30:00.000Z' },
  { id: 'm2', productId: '1', productName: 'Almendras Enteras', type: 'salida', quantity: 17.5, reason: 'Venta Local', date: '2026-06-24T15:45:00.000Z' },
  { id: 'm3', productId: '2', productName: 'Nuez Mariposa Light', type: 'entrada', quantity: 15.0, reason: 'Compra Proveedor', date: '2026-06-21T09:15:00.000Z' },
  { id: 'm4', productId: '2', productName: 'Nuez Mariposa Light', type: 'salida', quantity: 7.0, reason: 'Venta Local', date: '2026-06-25T11:00:00.000Z' },
  { id: 'm5', productId: '5', productName: 'Semillas de Zapallo', type: 'salida', quantity: 7.5, reason: 'Venta Local', date: '2026-06-25T14:20:00.000Z' }
];

function App() {
  // State initialization with localStorage
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('nutristock_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [movements, setMovements] = useState(() => {
    const saved = localStorage.getItem('nutristock_movements');
    return saved ? JSON.parse(saved) : DEFAULT_MOVEMENTS;
  });

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'inventory', 'movements'
  
  // Inventory Filtering States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [stockStatusFilter, setStockStatusFilter] = useState('Todos'); // 'Todos', 'Bajo Stock', 'Suficiente'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Modal States
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    category: 'Frutos Secos',
    stock: 0,
    minStock: 10,
    priceBuy: 1000,
    priceSell: 2000,
    description: '',
    unit: 'kg'
  });

  const [showMovementModal, setShowMovementModal] = useState(false);
  const [quickMovementProduct, setQuickMovementProduct] = useState(null);
  const [movementForm, setMovementForm] = useState({
    productId: '',
    type: 'entrada', // 'entrada' or 'salida'
    quantity: 1,
    reason: 'Compra Proveedor'
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('nutristock_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nutristock_movements', JSON.stringify(movements));
  }, [movements]);

  // Handler for adding/updating products
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!currentProduct.name.trim()) return;

    if (modalMode === 'add') {
      const newProduct = {
        ...currentProduct,
        id: Date.now().toString(),
        stock: parseFloat(currentProduct.stock) || 0,
        minStock: parseFloat(currentProduct.minStock) || 0,
        priceBuy: parseInt(currentProduct.priceBuy) || 0,
        priceSell: parseInt(currentProduct.priceSell) || 0
      };

      setProducts([...products, newProduct]);

      // Record automatic movement for initial stock if > 0
      if (newProduct.stock > 0) {
        const newMov = {
          id: 'm_init_' + Date.now(),
          productId: newProduct.id,
          productName: newProduct.name,
          type: 'entrada',
          quantity: newProduct.stock,
          reason: 'Inventario Inicial',
          date: new Date().toISOString()
        };
        setMovements([newMov, ...movements]);
      }
    } else {
      // Edit mode
      const updated = products.map(p => {
        if (p.id === currentProduct.id) {
          const oldStock = p.stock;
          const newStock = parseFloat(currentProduct.stock) || 0;
          
          // If stock was directly changed in edit form, log a correction movement
          if (oldStock !== newStock) {
            const diff = newStock - oldStock;
            const newMov = {
              id: 'm_edit_' + Date.now(),
              productId: p.id,
              productName: currentProduct.name,
              type: diff > 0 ? 'entrada' : 'salida',
              quantity: Math.abs(diff),
              reason: 'Ajuste de Inventario (Edición)',
              date: new Date().toISOString()
            };
            setMovements(prev => [newMov, ...prev]);
          }

          return {
            ...currentProduct,
            stock: newStock,
            minStock: parseFloat(currentProduct.minStock) || 0,
            priceBuy: parseInt(currentProduct.priceBuy) || 0,
            priceSell: parseInt(currentProduct.priceSell) || 0
          };
        }
        return p;
      });
      setProducts(updated);
    }

    setShowProductModal(false);
    resetProductForm();
  };

  const resetProductForm = () => {
    setCurrentProduct({
      id: '',
      name: '',
      category: 'Frutos Secos',
      stock: 0,
      minStock: 10,
      priceBuy: 1000,
      priceSell: 2000,
      description: '',
      unit: 'kg'
    });
  };

  const handleEditProductClick = (product) => {
    setModalMode('edit');
    setCurrentProduct({ ...product });
    setShowProductModal(true);
  };

  const handleDeleteProductClick = (id, name) => {
    if (window.confirm(`¿Está seguro de que desea eliminar el producto "${name}"? Se mantendrá el historial de movimientos pero el producto ya no figurará en inventario.`)) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Handler for adding movement
  const handleMovementSubmit = (e) => {
    e.preventDefault();
    const { productId, type, quantity, reason } = movementForm;
    if (!productId || quantity <= 0) return;

    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return;

    const qty = parseFloat(quantity);
    
    // Check if exit quantity exceeds available stock
    if (type === 'salida' && targetProduct.stock < qty) {
      alert(`Error: No hay suficiente stock. Stock actual de "${targetProduct.name}" es ${targetProduct.stock} ${targetProduct.unit}.`);
      return;
    }

    // Update product stock
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          stock: type === 'entrada' ? p.stock + qty : p.stock - qty
        };
      }
      return p;
    });
    setProducts(updatedProducts);

    // Add movement log
    const newMovement = {
      id: 'm_' + Date.now(),
      productId,
      productName: targetProduct.name,
      type,
      quantity: qty,
      reason: reason || (type === 'entrada' ? 'Abastecimiento' : 'Despacho'),
      date: new Date().toISOString()
    };
    setMovements([newMovement, ...movements]);

    // Close and reset
    setShowMovementModal(false);
    setQuickMovementProduct(null);
    setMovementForm({
      productId: '',
      type: 'entrada',
      quantity: 1,
      reason: 'Compra Proveedor'
    });
  };

  const openQuickMovement = (product, forcedType = 'entrada') => {
    setQuickMovementProduct(product);
    setMovementForm({
      productId: product.id,
      type: forcedType,
      quantity: 5,
      reason: forcedType === 'entrada' ? 'Compra Proveedor' : 'Venta Local'
    });
    setShowMovementModal(true);
  };

  const openGeneralMovement = () => {
    setQuickMovementProduct(null);
    setMovementForm({
      productId: products.length > 0 ? products[0].id : '',
      type: 'entrada',
      quantity: 5,
      reason: 'Compra Proveedor'
    });
    setShowMovementModal(true);
  };

  const handleAddProductClick = () => {
    setModalMode('add');
    resetProductForm();
    setShowProductModal(true);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
    setStockStatusFilter('Todos');
  };

  // Helper calculations
  const lowStockProducts = products.filter(p => p.stock <= p.minStock);
  const totalStockValueBuy = products.reduce((acc, p) => acc + (p.stock * p.priceBuy), 0);
  const totalStockValueSell = products.reduce((acc, p) => acc + (p.stock * p.priceSell), 0);

  // Filtered Products for Inventory Tab
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    const matchesStatus = stockStatusFilter === 'Todos' || 
                          (stockStatusFilter === 'Bajo Stock' && p.stock <= p.minStock) ||
                          (stockStatusFilter === 'Suficiente' && p.stock > p.minStock);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      {/* Componente Header - comunicación vía props */}
      <Header
        title="NutriStock"
        subtitle="Gestión de Inventario y Abastecimiento de Frutos Secos"
        badgeText="📅 Cosecha Activa 2026"
        userName="👤 Administrador Tienda"
      />

      {/* Componente Navigation - comunicación bidireccional vía props y callbacks */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="app-main">
        {/* TAB 1: DASHBOARD - Componente Dashboard compuesto por MetricCard y AlertItem */}
        {activeTab === 'dashboard' && (
          <Dashboard
            products={products}
            movements={movements}
            lowStockProducts={lowStockProducts}
            totalStockValueBuy={totalStockValueBuy}
            totalStockValueSell={totalStockValueSell}
            onRestock={(product) => openQuickMovement(product, 'entrada')}
            onNavigateMovements={() => setActiveTab('movements')}
          />
        )}

        {/* TAB 2: INVENTORY - Componente InventoryTab compuesto por ProductCard y ProductTable */}
        {activeTab === 'inventory' && (
          <InventoryTab
            filteredProducts={filteredProducts}
            products={products}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            stockStatusFilter={stockStatusFilter}
            onStockStatusChange={setStockStatusFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onAddProduct={handleAddProductClick}
            onOpenMovement={openGeneralMovement}
            onEntryProduct={(p) => openQuickMovement(p, 'entrada')}
            onExitProduct={(p) => openQuickMovement(p, 'salida')}
            onEditProduct={handleEditProductClick}
            onDeleteProduct={handleDeleteProductClick}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* TAB 3: MOVEMENTS - Componente MovementsTab */}
        {activeTab === 'movements' && (
          <MovementsTab
            movements={movements}
            products={products}
            onOpenMovement={openGeneralMovement}
          />
        )}
      </main>

      {/* Componente Footer - comunicación vía props */}
      <Footer
        appName="NutriStock App"
        studentName="Leica"
        evaluationName="Evaluación Sumativa 3"
        githubUrl="https://github.com/"
      />

      {/* Modal Producto - Componente ProductModal */}
      <ProductModal
        show={showProductModal}
        mode={modalMode}
        product={currentProduct}
        onChange={setCurrentProduct}
        onSubmit={handleProductSubmit}
        onClose={() => setShowProductModal(false)}
      />

      {/* Modal Movimiento - Componente MovementModal */}
      <MovementModal
        show={showMovementModal}
        products={products}
        quickProduct={quickMovementProduct}
        form={movementForm}
        onChange={setMovementForm}
        onSubmit={handleMovementSubmit}
        onClose={() => {
          setShowMovementModal(false);
          setQuickMovementProduct(null);
        }}
      />
    </>
  );
}

export default App;
