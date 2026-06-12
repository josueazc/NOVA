import React from 'react';

const Tabs = ({ tabs, active, onChange, className = '' }) => (
  <div role="tablist" className={`flex items-center gap-1 border-b border-line overflow-x-auto ${className}`}>
    {tabs.map((tab) => {
      const value = typeof tab === 'string' ? tab : tab.value;
      const label = typeof tab === 'string' ? tab : tab.label;
      const isActive = value === active;
      return (
        <button
          key={value}
          role="tab"
          aria-selected={isActive}
          onClick={() => onChange(value)}
          className={`relative px-3.5 py-2.5 text-sm whitespace-nowrap transition-colors rounded-t-md
            ${isActive ? 'text-ink font-semibold' : 'text-muted hover:text-ink'}`}
        >
          {label}
          {isActive && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-ink rounded-full" />}
        </button>
      );
    })}
  </div>
);

export default Tabs;
