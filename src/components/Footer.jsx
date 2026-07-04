import React from 'react';

/**
 * Footer Component
 * Pie de página con información del proyecto, evaluación y enlaces.
 * Recibe datos dinámicos vía props para mantener la flexibilidad.
 */
function Footer({ appName, studentName, evaluationName, githubUrl }) {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>{appName}</h4>
          <p>Sistema diseñado para el control de inventario de tiendas de frutos secos y semillas a granel. Alertas en tiempo real para evitar quiebres de stock.</p>
        </div>
        <div className="footer-section">
          <h4>{evaluationName}</h4>
          <p>Desarrollo de Sitio Web con HTML5, CSS3, React, Vite y Git.</p>
          <p>Estudiante: <strong>{studentName}</strong></p>
        </div>
        <div className="footer-section">
          <h4>Enlaces & Repositorio</h4>
          <p>
            <a href={githubUrl} target="_blank" rel="noreferrer" className="footer-link">
              🐙 Código Fuente en GitHub
            </a>
          </p>
          <p>Estado del repositorio: <strong>Evidencia de Ramas Git</strong></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 {appName}. Todos los derechos reservados. Diseñado con fines educativos.</p>
      </div>
    </footer>
  );
}

export default Footer;
