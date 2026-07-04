import React from 'react';

/**
 * Navigation Component
 * Barra de navegación con pestañas dinámicas.
 * Recibe la pestaña activa y una función para cambiarla (comunicación por props).
 */

const TABS = [
  { id: 'dashboard', label: '📊 Panel General' },
  { id: 'inventory', label: '📦 Inventario de Stock' },
  { id: 'movements', label: '🔄 Historial de Movimientos' }
];

function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="app-nav">
      <ul>
        {TABS.map(tab => (
          <li key={tab.id}>
            <button
              className={activeTab === tab.id ? 'active' : ''}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
