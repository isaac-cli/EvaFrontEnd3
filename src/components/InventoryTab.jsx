import React from 'react';
import ProductCard from './ProductCard';
import ProductTable from './ProductTable';

/**
 * InventoryTab Component
 * Pestaña completa de Inventario de Stock con controles de filtrado,
 * cambio de vista (grid/tabla) y acciones de agregar/movimiento.
 * Recibe todo el estado de filtros y callbacks desde App (comunicación props).
 */

const CATEGORIES = ['Frutos Secos', 'Fruta Deshidratada', 'Semillas', 'Harinas y Otros'];

function InventoryTab({
  filteredProducts,
  products,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  stockStatusFilter,
  onStockStatusChange,
  viewMode,
  onViewModeChange,
  onAddProduct,
  onOpenMovement,
  onEntryProduct,
  onExitProduct,
  onEditProduct,
  onDeleteProduct,
  onClearFilters
}) {
  return (
    <div className="tab-pane animate-fade-in">
      <section className="inventory-controls section-card">
        <div className="controls-row">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por nombre, categoría, descripción..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => onSearchChange('')}>✕</button>
            )}
          </div>

          <div className="filters-group">
            <div className="filter-select-wrapper">
              <label>Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
              >
                <option value="Todas">Todas las categorías</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-select-wrapper">
              <label>Nivel de Stock</label>
              <select
                value={stockStatusFilter}
                onChange={(e) => onStockStatusChange(e.target.value)}
              >
                <option value="Todos">Todos los niveles</option>
                <option value="Bajo Stock">⚠️ Bajo Stock Mínimo</option>
                <option value="Suficiente">✅ Stock Suficiente</option>
              </select>
            </div>
          </div>

          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              title="Vista de Tarjetas"
            >
              🎴 Tarjetas
            </button>
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => onViewModeChange('table')}
              title="Vista de Tabla"
            >
              📋 Tabla
            </button>
          </div>
        </div>

        <div className="actions-row">
          <button className="btn btn-primary" onClick={onAddProduct}>
            ✨ Registrar Nuevo Producto
          </button>
          <button
            className="btn btn-outline"
            onClick={onOpenMovement}
            disabled={products.length === 0}
          >
            🔄 Registrar Entrada / Salida
          </button>
        </div>
      </section>

      {/* Lista de Productos */}
      <section className="inventory-results">
        {filteredProducts.length === 0 ? (
          <div className="no-results section-card">
            <p className="no-data">🔍 No se encontraron productos que coincidan con los filtros seleccionados.</p>
            <button className="btn btn-outline btn-sm" onClick={onClearFilters}>
              Limpiar Filtros
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="products-grid">
            {filteredProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onEntry={onEntryProduct}
                onExit={onExitProduct}
                onEdit={onEditProduct}
                onDelete={onDeleteProduct}
              />
            ))}
          </div>
        ) : (
          <ProductTable
            products={filteredProducts}
            onEntry={onEntryProduct}
            onExit={onExitProduct}
            onEdit={onEditProduct}
            onDelete={onDeleteProduct}
          />
        )}
      </section>
    </div>
  );
}

export default InventoryTab;
