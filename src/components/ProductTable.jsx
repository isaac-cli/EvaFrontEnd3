import React from 'react';

/**
 * ProductTable Component
 * Vista de tabla del inventario de productos.
 * Recibe la lista filtrada de productos y funciones de callback para acciones.
 */
function ProductTable({ products, onEntry, onExit, onEdit, onDelete }) {
  return (
    <div className="section-card table-responsive">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Stock Actual</th>
            <th>Mínimo Alerta</th>
            <th>Precio Costo</th>
            <th>Precio Venta</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => {
            const isLow = p.stock <= p.minStock;
            return (
              <tr key={p.id} className={isLow ? 'table-row-warning' : ''}>
                <td>
                  <div className="table-product-name">
                    <strong>{p.name}</strong>
                    <span className="table-desc">{p.description}</span>
                  </div>
                </td>
                <td>{p.category}</td>
                <td className="text-right">
                  <strong className={isLow ? 'text-alert' : 'text-success'}>
                    {p.stock} {p.unit}
                  </strong>
                </td>
                <td className="text-right">{p.minStock} {p.unit}</td>
                <td className="text-right">${p.priceBuy.toLocaleString('es-CL')}</td>
                <td className="text-right">${p.priceSell.toLocaleString('es-CL')}</td>
                <td>
                  <span className={`status-pill ${isLow ? 'danger' : 'success'}`}>
                    {isLow ? 'Bajo Stock' : 'Suficiente'}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="btn btn-xs btn-primary" onClick={() => onEntry(p)}>
                      📥
                    </button>
                    <button className="btn btn-xs btn-secondary" onClick={() => onExit(p)}>
                      📤
                    </button>
                    <button className="btn btn-xs btn-outline" onClick={() => onEdit(p)}>
                      Editar
                    </button>
                    <button className="btn btn-xs btn-danger" onClick={() => onDelete(p.id, p.name)}>
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
