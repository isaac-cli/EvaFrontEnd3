import React from 'react';

/**
 * ProductModal Component
 * Modal para crear o editar productos.
 * Recibe el modo (add/edit), el producto actual y callbacks para submit y cierre.
 */

const CATEGORIES = ['Frutos Secos', 'Fruta Deshidratada', 'Semillas', 'Harinas y Otros'];

function ProductModal({ show, mode, product, onChange, onSubmit, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-zoom-in">
        <div className="modal-header">
          <h2>{mode === 'add' ? '✨ Registrar Nuevo Producto' : '✏️ Editar Datos de Producto'}</h2>
          <button className="close-modal-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={onSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="prod-name">Nombre del Producto *</label>
            <input
              type="text"
              id="prod-name"
              required
              placeholder="Ej: Almendras laminadas, Nuez pecana, etc."
              value={product.name}
              onChange={(e) => onChange({ ...product, name: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prod-cat">Categoría</label>
              <select
                id="prod-cat"
                value={product.category}
                onChange={(e) => onChange({ ...product, category: e.target.value })}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="prod-unit">Unidad de Medida</label>
              <select
                id="prod-unit"
                value={product.unit}
                onChange={(e) => onChange({ ...product, unit: e.target.value })}
              >
                <option value="kg">Kilogramos (kg)</option>
                <option value="unidades">Unidades (un)</option>
                <option value="g">Gramos (g)</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prod-stock">Stock Inicial ({product.unit})</label>
              <input
                type="number"
                id="prod-stock"
                min="0"
                step="0.1"
                required
                value={product.stock}
                onChange={(e) => onChange({ ...product, stock: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="prod-min">Stock Mínimo Alerta *</label>
              <input
                type="number"
                id="prod-min"
                min="0"
                step="0.1"
                required
                placeholder="Stock en el cual saltará la alerta"
                value={product.minStock}
                onChange={(e) => onChange({ ...product, minStock: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prod-price-buy">Precio Compra ($ costo por {product.unit})</label>
              <input
                type="number"
                id="prod-price-buy"
                min="0"
                required
                value={product.priceBuy}
                onChange={(e) => onChange({ ...product, priceBuy: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="prod-price-sell">Precio Venta ($ por {product.unit})</label>
              <input
                type="number"
                id="prod-price-sell"
                min="0"
                required
                value={product.priceSell}
                onChange={(e) => onChange({ ...product, priceSell: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="prod-desc">Descripción del Producto</label>
            <textarea
              id="prod-desc"
              rows="3"
              placeholder="Detalles sobre variedad, origen o calidad..."
              value={product.description}
              onChange={(e) => onChange({ ...product, description: e.target.value })}
            ></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === 'add' ? 'Crear Producto' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
