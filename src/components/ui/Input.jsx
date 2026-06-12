import React, { useId } from 'react';

const fieldClasses = (error) => `w-full bg-surface border rounded-md px-3.5 py-2.5 text-sm text-ink
  placeholder:text-faint outline-none transition-colors
  focus:border-accent focus:ring-2 focus:ring-accent/15
  ${error ? 'border-danger/40' : 'border-line'}`;

const FieldWrapper = ({ id, label, hint, error, children }) => (
  <div className="space-y-1.5">
    {label && (
      <label htmlFor={id} className="block text-xs font-semibold text-muted uppercase tracking-[0.05em]">
        {label}
      </label>
    )}
    {children}
    {error ? (
      <p className="text-xs text-danger">{error}</p>
    ) : hint ? (
      <p className="text-xs text-faint">{hint}</p>
    ) : null}
  </div>
);

export const Input = React.forwardRef(function Input({ label, hint, error, className = '', ...props }, ref) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error}>
      <input ref={ref} id={id} className={`${fieldClasses(error)} ${className}`} {...props} />
    </FieldWrapper>
  );
});

export const Textarea = React.forwardRef(function Textarea(
  { label, hint, error, rows = 3, className = '', ...props },
  ref
) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error}>
      <textarea ref={ref} id={id} rows={rows} className={`${fieldClasses(error)} resize-y ${className}`} {...props} />
    </FieldWrapper>
  );
});

export const Select = React.forwardRef(function Select(
  { label, hint, error, children, className = '', ...props },
  ref
) {
  const id = useId();
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error}>
      <select ref={ref} id={id} className={`${fieldClasses(error)} appearance-none ${className}`} {...props}>
        {children}
      </select>
    </FieldWrapper>
  );
});

export default Input;
