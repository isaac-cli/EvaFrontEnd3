import React from 'react';

/**
 * ProductCard Component
 * Tarjeta visual para mostrar un producto individual en vista de cuadrícula.
 * Recibe el producto y funciones de callback para acciones CRUD y de stock.
 */
function ProductCard({ product, onEntry, onExit, onEdit, onDelete }) {
  const isLow = product.stock <= product.minStock;

  return (
    <article className={`product-card ${isLow ? 'low-stock-alert' : ''}`}>
      {isLow && <div className="card-alert-badge">⚠️ Reabastecer</div>}
      <div className="card-category">{product.category}</div>
      <h3 className="card-title">{product.name}</h3>
      <p className="card-description">{product.description || 'Sin descripción disponible.'}</p>

      <div className="card-stock-display">
        <div className="stock-stat">
          <span className="stat-label">Stock Actual</span>
          <span className={`stat-value ${isLow ? 'text-alert' : 'text-success'}`}>
            {product.stock} {product.unit}
          </span>
        </div>
        <div className="stock-stat">
          <span className="stat-label">Mín. Alerta</span>
          <span className="stat-value">{product.minStock} {product.unit}</span>
        </div>
      </div>

      <div className="card-prices">
        <div className="price-item">
          <span>Costo:</span>
          <strong>${product.priceBuy.toLocaleString('es-CL')}</strong>
        </div>
        <div className="price-item">
          <span>Venta:</span>
          <strong>${product.priceSell.toLocaleString('es-CL')}</strong>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="btn btn-xs btn-primary"
          onClick={() => onEntry(product)}
        >
          📥 Entrada
        </button>
        <button
          className="btn btn-xs btn-secondary"
          onClick={() => onExit(product)}
        >
          📤 Salida
        </button>
        <button
          className="btn btn-xs btn-outline"
          onClick={() => onEdit(product)}
          title="Editar Datos"
        >
          ✏️
        </button>
        <button
          className="btn btn-xs btn-danger"
          onClick={() => onDelete(product.id, product.name)}
          title="Eliminar Producto"
        >
          🗑️
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
