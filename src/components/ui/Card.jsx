import React from 'react';

const Card = ({ as: Tag = 'div', hover = false, padding = 'p-6', className = '', children, ...props }) => (
  <Tag
    className={`bg-surface border border-line rounded-xl shadow-card
      ${hover ? 'transition-all duration-200 hover:shadow-lift hover:-translate-y-px cursor-pointer' : ''}
      ${padding} ${className}`}
    {...props}
  >
    {children}
  </Tag>
);

export default Card;
