import React from 'react';

/**
 * Header Component
 * Muestra el logo, nombre de la aplicación y metadatos del usuario.
 * Componente reutilizable que recibe props para personalizar el contenido.
 */
function Header({ title, subtitle, badgeText, userName }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 3a9 9 0 0 0-9 9v1a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-1a9 9 0 0 0-9-9z" fill="#D97706" fillOpacity="0.2"/>
            <circle cx="9" cy="10" r="1.5" fill="currentColor" />
            <circle cx="15" cy="10" r="1.5" fill="currentColor" />
            <path d="M12 17v3m-3-1.5h6" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="header-meta">
        <span className="badge badge-date">{badgeText}</span>
        <span className="user-profile">{userName}</span>
      </div>
    </header>
  );
}

export default Header;
