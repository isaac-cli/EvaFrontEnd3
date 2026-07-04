import React from 'react';

/**
 * MovementModal Component
 * Modal para registrar entrada/salida de stock de un producto.
 * Recibe datos del formulario, lista de productos y callbacks.
 */
function MovementModal({ show, products, quickProduct, form, onChange, onSubmit, onClose }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-zoom-in">
        <div className="modal-header">
          <h2>🔄 Registrar Movimiento de Stock</h2>
          <button className="close-modal-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={onSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="mov-product">Seleccionar Producto</label>
            {quickProduct ? (
              <input
                type="text"
                id="mov-product"
                readOnly
                className="readonly-input"
                value={quickProduct.name}
              />
            ) : (
              <select
                id="mov-product"
                required
                value={form.productId}
                onChange={(e) => onChange({ ...form, productId: e.target.value })}
              >
                <option value="" disabled>Seleccione un producto...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Stock: {p.stock} {p.unit})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mov-type">Tipo de Operación</label>
              <select
                id="mov-type"
                value={form.type}
                onChange={(e) => {
                  const newType = e.target.value;
                  const defaultReason = newType === 'entrada' ? 'Compra Proveedor' : 'Venta Local';
                  onChange({ ...form, type: newType, reason: defaultReason });
                }}
              >
                <option value="entrada">📥 Entrada (Aumenta stock)</option>
                <option value="salida">📤 Salida (Disminuye stock)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mov-qty">Cantidad a registrar</label>
              <input
                type="number"
                id="mov-qty"
                min="0.1"
                step="0.1"
                required
                value={form.quantity}
                onChange={(e) => onChange({ ...form, quantity: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mov-reason">Motivo / Detalle del Movimiento</label>
            <select
              id="mov-reason"
              value={form.reason}
              onChange={(e) => onChange({ ...form, reason: e.target.value })}
            >
              {form.type === 'entrada' ? (
                <>
                  <option value="Compra Proveedor">Compra Proveedor / Abastecimiento</option>
                  <option value="Devolución de Cliente">Devolución de Cliente</option>
                  <option value="Ajuste de Inventario">Ajuste de Inventario (Falta anterior)</option>
                </>
              ) : (
                <>
                  <option value="Venta Local">Venta en Sala / Local</option>
                  <option value="Despacho Pedido Web">Despacho Pedido Web</option>
                  <option value="Merma por Vencimiento">Merma por Vencimiento / Daño</option>
                  <option value="Ajuste de Inventario">Ajuste de Inventario (Sobró anterior)</option>
                </>
              )}
            </select>
          </div>

          {quickProduct && form.type === 'salida' && (
            <div className="stock-warning-info">
              Stock actual disponible: <strong>{quickProduct.stock} {quickProduct.unit}</strong>.
              {quickProduct.stock < form.quantity && (
                <span className="danger-text"> ❌ ¡Atención! La cantidad supera el stock actual.</span>
              )}
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={quickProduct && form.type === 'salida' && quickProduct.stock < form.quantity}
            >
              Registrar Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovementModal;
