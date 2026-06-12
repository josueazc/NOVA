import React from 'react';

const EmptyState = ({ icon = null, title, description, action = null, className = '' }) => (
  <div className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}>
    {icon && (
      <div className="w-12 h-12 rounded-xl bg-surface-2 text-faint flex items-center justify-center mb-4">
        {icon}
      </div>
    )}
    <h3 className="text-lg font-semibold text-ink mb-1">{title}</h3>
    {description && <p className="text-sm text-muted max-w-sm leading-relaxed">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
