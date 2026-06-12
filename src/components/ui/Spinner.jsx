import React from 'react';

const Spinner = ({ size = 16, className = '' }) => (
  <span
    role="status"
    aria-label="Cargando"
    className={`inline-block rounded-full border-2 border-current border-t-transparent animate-spin ${className}`}
    style={{ width: size, height: size }}
  />
);

export default Spinner;
