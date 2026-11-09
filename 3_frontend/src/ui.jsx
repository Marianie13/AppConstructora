import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = 'px-4 py-2 rounded-lg font-medium transition duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer';
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-100',
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <input
        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full text-sm"
        {...props}
      />
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </div>
  );
}

export function Select({ label, children, error, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <select
        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full text-sm bg-white"
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </div>
  );
}
