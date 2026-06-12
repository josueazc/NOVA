import React from 'react';

const TONES = {
  neutral: 'bg-surface-2 text-muted',
  blue: 'bg-accent-soft text-accent-ink',
  red: 'bg-danger-soft text-danger',
  green: 'bg-success-soft text-success',
  yellow: 'bg-warn-soft text-warn',
};

const Badge = ({ tone = 'neutral', icon = null, className = '', children }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5
      text-[10px] font-semibold uppercase tracking-[0.05em] ${TONES[tone]} ${className}`}
  >
    {icon}
    {children}
  </span>
);

export default Badge;
