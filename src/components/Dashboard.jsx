import React from 'react';
import MetricCard from './MetricCard';
import AlertItem from './AlertItem';

/**
 * Dashboard Component
 * Pestaña del Panel General: muestra métricas, alertas de stock y últimos movimientos.
 * Recibe toda la data calculada y callbacks vía props desde App.
 */
function Dashboard({ products, movements, lowStockProducts, totalStockValueBuy, totalStockValueSell, onRestock, onNavigateMovements }) {
  return (
    <div className="tab-pane animate-fade-in">
      {/* Métricas principales */}
      <section className="dashboard-metrics">
        <MetricCard
          title="Total Productos"
          value={products.length}
          footer="Registrados en catálogo"
          icon="🥜"
        />
        <MetricCard
          title="Stock Crítico / Alertas"
          value={lowStockProducts.length}
          footer="Necesitan reabastecimiento"
          icon="⚠️"
          extraClass={`alert-metric ${lowStockProducts.length > 0 ? 'critical' : ''}`}
        />
        <MetricCard
          title="Valorización Costo"
          value={`$${totalStockValueBuy.toLocaleString('es-CL')}`}
          footer="Total invertido a precio compra"
          icon="💰"
        />
        <MetricCard
          title="Valorización Venta"
          value={`$${totalStockValueSell.toLocaleString('es-CL')}`}
          footer="Potencial de ingreso proyectado"
          icon="📈"
        />
      </section>

      {/* Alertas de Abastecimiento Crítico */}
      <section className="dashboard-alerts section-card">
        <div className="section-title-wrapper">
          <h2 className="section-title">🚨 Alertas de Abastecimiento Crítico</h2>
          <span className="badge badge-warning">
            {lowStockProducts.length} productos bajo el mínimo
          </span>
        </div>
        <p className="section-intro">
          Los siguientes productos se encuentran con un nivel de stock igual o inferior a su mínimo configurado.
          Debe realizar compras a proveedores para reabastecer a la brevedad.
        </p>

        {lowStockProducts.length === 0 ? (
          <div className="alert-box success-box">
            <p>✨ ¡Todo al día! Todos los productos cuentan con stock suficiente por sobre el límite de alerta.</p>
          </div>
        ) : (
          <div className="alerts-list">
            {lowStockProducts.map(p => (
              <AlertItem key={p.id} product={p} onRestock={onRestock} />
            ))}
          </div>
        )}
      </section>

      {/* Últimos Movimientos */}
      <section className="dashboard-recent section-card">
        <h2 className="section-title">🕒 Últimos Movimientos Registrados</h2>
        <div className="movements-summary-wrapper">
          {movements.length === 0 ? (
            <p className="no-data">No se han registrado movimientos todavía.</p>
          ) : (
            <div className="table-responsive">
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.slice(0, 5).map(m => (
                    <tr key={m.id}>
                      <td>{new Date(m.date).toLocaleString('es-CL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                      <td><strong>{m.productName}</strong></td>
                      <td>
                        <span className={`movement-badge ${m.type}`}>
                          {m.type === 'entrada' ? '📥 Entrada' : '📤 Salida'}
                        </span>
                      </td>
                      <td>{m.quantity} kg</td>
                      <td><span className="reason-label">{m.reason}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {movements.length > 5 && (
            <div className="more-actions-center">
              <button className="btn btn-outline" onClick={onNavigateMovements}>
                Ver todo el historial ➔
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
