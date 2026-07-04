import React from 'react';

/**
 * MetricCard Component
 * Tarjeta individual de métricas reutilizable.
 * Recibe título, valor, descripción, icono y clase extra vía props.
 */
function MetricCard({ title, value, footer, icon, extraClass }) {
  return (
    <div className={`metric-card ${extraClass || ''}`}>
      <div className="metric-header">
        <h3>{title}</h3>
        <span className="metric-icon">{icon}</span>
      </div>
      <p className="metric-value">{value}</p>
      <p className="metric-footer">{footer}</p>
    </div>
  );
}

export default MetricCard;
