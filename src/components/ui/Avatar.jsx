import React, { useState } from 'react';

const SIZES = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-[11px]',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

// Paleta determinística por nombre para fondos de iniciales
const BG = [
  'bg-accent-soft text-accent-ink',
  'bg-danger-soft text-danger',
  'bg-success-soft text-success',
  'bg-warn-soft text-warn',
];

const initials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('') || '?';

const hash = (str = '') => [...str].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

const Avatar = ({ src, name = '', size = 'md', className = '' }) => {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden
        font-semibold shrink-0 select-none border border-line
        ${SIZES[size]} ${showImage ? 'bg-surface-2' : BG[hash(name) % BG.length]} ${className}`}
      title={name}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setErrored(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        initials(name)
      )}
    </span>
  );
};

export default Avatar;
