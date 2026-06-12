import React from 'react';

const Card = ({ as: Tag = 'div', hover = false, padding = 'p-6', className = '', children, ...props }) => {
  // Si el llamador pasa su propio fondo (ej. bg-accent), no aplicar bg-surface:
  // dos utilidades bg- compiten por orden del stylesheet, no del atributo.
  const hasCustomBg = /(^|\s)bg-/.test(className);
  return (
    <Tag
      className={`${hasCustomBg ? '' : 'bg-surface'} border border-line rounded-2xl shadow-card
        ${hover ? 'transition-all duration-300 hover:shadow-lift hover:-translate-y-1 hover:border-accent/30 cursor-pointer' : ''}
        ${padding} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Card;
