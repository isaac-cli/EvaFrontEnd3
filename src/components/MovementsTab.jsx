import React from 'react';

/**
 * MovementsTab Component
 * Pestaña completa del historial de movimientos de stock.
 * Recibe la lista de movimientos y callbacks para abrir el modal de nuevo movimiento.
 */
function MovementsTab({ movements, products, onOpenMovement }) {
  return (
    <div className="tab-pane animate-fade-in">
      <section className="movements-header-section section-card">
        <div className="section-title-wrapper flex-space-between">
          <h2 className="section-title">🔄 Registro Completo de Movimientos</h2>
          <button
            className="btn btn-primary"
            onClick={onOpenMovement}
            disabled={products.length === 0}
          >
            Registrar Entrada / Salida
          </button>
        </div>
        <p className="section-intro">
          Historial completo de variaciones de stock. Cada transacción de venta, abastecimiento,
          merma o ajuste manual queda consignada aquí con fecha, responsable virtual y cantidad.
        </p>
      </section>

      <section className="movements-table-section section-card">
        {movements.length === 0 ? (
          <p className="no-data">No se han registrado movimientos de inventario todavía.</p>
        ) : (
          <div className="table-responsive">
            <table className="movements-full-table">
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Producto</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Motivo / Razón</th>
                  <th>ID de Transacción</th>
                </tr>
              </thead>
              <tbody>
                {movements.map(m => (
                  <tr key={m.id} className={`movement-row-${m.type}`}>
                    <td>{new Date(m.date).toLocaleString('es-CL')}</td>
                    <td><strong>{m.productName}</strong></td>
                    <td>
                      <span className={`movement-badge ${m.type}`}>
                        {m.type === 'entrada' ? '📥 Entrada' : '📤 Salida'}
                      </span>
                    </td>
                    <td className="text-right">
                      <strong className={m.type === 'entrada' ? 'text-success' : 'text-alert'}>
                        {m.type === 'entrada' ? '+' : '-'}{m.quantity} kg
                      </strong>
                    </td>
                    <td>{m.reason}</td>
                    <td><code className="tx-code">{m.id}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default MovementsTab;
