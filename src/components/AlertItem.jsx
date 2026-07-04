import React from 'react';

/**
 * AlertItem Component
 * Un solo item de alerta de abastecimiento crítico.
 * Recibe los datos del producto y una función de callback para reabastecer (props).
 */
function AlertItem({ product, onRestock }) {
  const categoryIcon = product.category === 'Frutos Secos' ? '🥜'
    : product.category === 'Fruta Deshidratada' ? '🍇'
    : product.category === 'Semillas' ? '🌻'
    : '📦';

  const progressPercent = Math.min(100, (product.stock / product.minStock) * 100);
  const progressColor = product.stock <= product.minStock * 0.3 ? '#DC2626' : '#D97706';

  return (
    <div className="alert-item">
      <div className="alert-item-info">
        <div className="alert-item-avatar">
          <span>{categoryIcon}</span>
        </div>
        <div>
          <h4>{product.name}</h4>
          <p className="category-tag">{product.category}</p>
        </div>
      </div>

      <div className="alert-item-status">
        <div className="stock-comparison">
          <span className="stock-current">Stock actual: <strong>{product.stock} {product.unit}</strong></span>
          <span className="stock-divider">/</span>
          <span className="stock-min">Mínimo sugerido: {product.minStock} {product.unit}</span>
        </div>
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: progressColor
            }}
          ></div>
        </div>
      </div>

      <div className="alert-item-actions">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onRestock(product)}
        >
          ➕ Reabastecer
        </button>
      </div>
    </div>
  );
}

export default AlertItem;
