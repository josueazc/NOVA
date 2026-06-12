import React from 'react';
import Spinner from './Spinner';

const VARIANTS = {
  // Azul CR: acción principal
  primary: 'bg-accent text-white hover:brightness-110 shadow-lift dark:text-canvas',
  // Rojo CR: CTA de alta energía
  accent: 'bg-danger text-white hover:brightness-110 shadow-[0_8px_24px_-8px_rgba(213,16,32,0.4)]',
  outline: 'border-2 border-line bg-surface text-ink hover:border-accent hover:text-accent',
  ghost: 'text-muted hover:text-ink hover:bg-surface-2',
  danger: 'bg-danger-soft text-danger hover:bg-danger-soft/70 border border-danger/15',
};

const SIZES = {
  sm: 'text-xs px-3.5 py-2 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-sm px-7 py-3.5 gap-2',
};

const Button = React.forwardRef(function Button(
  { variant = 'primary', size = 'md', loading = false, disabled, className = '', children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-bold rounded-xl
        transition-all duration-200 active:scale-[0.97] hover:-translate-y-px select-none
        disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading && <Spinner size={size === 'sm' ? 12 : 14} />}
      {children}
    </button>
  );
});

export default Button;
