import React from 'react';

const Card = ({ as: Tag = 'div', hover = false, padding = 'p-6', className = '', children, ...props }) => (
  <Tag
    className={`bg-surface border border-line rounded-2xl shadow-card
      ${hover ? 'transition-all duration-300 hover:shadow-lift hover:-translate-y-1 hover:border-accent/30 cursor-pointer' : ''}
      ${padding} ${className}`}
    {...props}
  >
    {children}
  </Tag>
);

export default Card;
