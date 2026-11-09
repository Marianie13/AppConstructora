import React from 'react';

/* ============================================================
   Biblioteca de componentes - tema "Habita" (elegante oscuro)
   ============================================================ */

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'px-5 py-2.5 rounded-none text-[0.78rem] uppercase tracking-[0.16em] font-medium ' +
    'transition-all duration-300 inline-flex items-center justify-center gap-2 ' +
    'cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-oro-400 text-carbon-950 hover:bg-oro-300 hover:shadow-oro',
    secondary: 'bg-carbon-700 text-carbon-100 hover:bg-carbon-600',
    danger: 'bg-transparent text-rose-300 border border-rose-400/40 hover:bg-rose-400/10',
    outline: 'border border-oro-400/45 text-oro-200 hover:bg-oro-400/10 hover:border-oro-400',
    ghost: 'text-carbon-100/70 hover:text-oro-300',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div
      className={
        'group bg-carbon-900/80 border border-white/5 overflow-hidden ' +
        'transition-all duration-500 hover:border-oro-400/35 ' +
        'hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(0,0,0,0.9)] ' +
        className
      }
    >
      {children}
    </div>
  );
}

export function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="eyebrow">{label}</label>}
      <input
        className="px-0 py-2 bg-transparent border-0 border-b border-white/15 text-sm
                   text-carbon-100 placeholder:text-white/25
                   focus:outline-none focus:border-oro-400 transition-colors duration-300 w-full"
        {...props}
      />
      {error && <span className="text-xs text-rose-300">{error}</span>}
    </div>
  );
}

export function Textarea({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="eyebrow">{label}</label>}
      <textarea
        className="px-0 py-2 bg-transparent border-0 border-b border-white/15 text-sm
                   text-carbon-100 placeholder:text-white/25 resize-none
                   focus:outline-none focus:border-oro-400 transition-colors duration-300 w-full"
        {...props}
      />
      {error && <span className="text-xs text-rose-300">{error}</span>}
    </div>
  );
}

export function Select({ label, children, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="eyebrow">{label}</label>}
      <select
        className="px-0 py-2 bg-transparent border-0 border-b border-white/15 text-sm
                   text-carbon-100 focus:outline-none focus:border-oro-400
                   transition-colors duration-300 w-full [&>option]:bg-carbon-900"
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-rose-300">{error}</span>}
    </div>
  );
}

/* --- Elementos nuevos que no existian en la version base --- */

/** Encabezado de seccion con antetitulo, titulo y linea dorada. */
export function TituloSeccion({ eyebrow, titulo, descripcion, className = '' }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-3xl md:text-4xl font-light text-white leading-tight">{titulo}</h2>
      {descripcion && <p className="text-sm text-white/55 max-w-xl leading-relaxed">{descripcion}</p>}
      <div className="regla-oro mt-1 max-w-[7rem]" />
    </div>
  );
}

/** Etiqueta de estado/categoria. */
export function Etiqueta({ children, tono = 'oro' }) {
  const tonos = {
    oro: 'border-oro-400/40 text-oro-200 bg-oro-400/5',
    neutro: 'border-white/15 text-white/60 bg-white/5',
    exito: 'border-emerald-400/35 text-emerald-200 bg-emerald-400/5',
    alerta: 'border-rose-400/35 text-rose-200 bg-rose-400/5',
  };
  return (
    <span className={`text-[0.62rem] uppercase tracking-[0.18em] px-2.5 py-1 border w-max ${tonos[tono]}`}>
      {children}
    </span>
  );
}

/** Dato numerico destacado, para la banda de estadisticas. */
export function Estadistica({ valor, etiqueta }) {
  return (
    <div className="flex flex-col gap-1 text-center px-6 py-5">
      <span className="font-display text-3xl md:text-4xl text-oro-300 font-light">{valor}</span>
      <span className="text-[0.64rem] uppercase tracking-[0.2em] text-white/45">{etiqueta}</span>
    </div>
  );
}

/** Placeholder animado mientras llegan los datos del backend. */
export function Esqueleto({ className = '' }) {
  return <div className={`animate-pulse bg-white/[0.045] ${className}`} />;
}

export function EsqueletoTarjeta() {
  return (
    <div className="border border-white/5 bg-carbon-900/60">
      <Esqueleto className="h-56 w-full" />
      <div className="p-6 flex flex-col gap-3">
        <Esqueleto className="h-3 w-20" />
        <Esqueleto className="h-5 w-3/4" />
        <Esqueleto className="h-3 w-full" />
        <Esqueleto className="h-3 w-2/3" />
      </div>
    </div>
  );
}

/** Mensaje para listas vacias o errores. */
export function Aviso({ tipo = 'info', children }) {
  const tipos = {
    info: 'border-white/10 text-white/55',
    error: 'border-rose-400/30 text-rose-200 bg-rose-400/5',
    exito: 'border-emerald-400/30 text-emerald-200 bg-emerald-400/5',
  };
  return (
    <div className={`border px-5 py-4 text-sm ${tipos[tipo]}`}>{children}</div>
  );
}

/** Formatea pesos colombianos sin decimales. */
export function precioCOP(valor) {
  if (valor === null || valor === undefined || valor === '') return '-';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(valor));
}

/**
 * Traduce los valores de los enums del backend a texto legible en espanol.
 * Si llega un valor que no esta en el diccionario, se formatea igual
 * quitando los guiones bajos, para que nunca se vea el valor crudo.
 */
const ETIQUETAS = {
  EN_PLANOS: 'En planos',
  EN_CONSTRUCCION: 'En construcción',
  ENTREGA_INMEDIATA: 'Entrega inmediata',
  CASA: 'Casa',
  APARTAMENTO: 'Apartamento',
  LOTE: 'Lote',
};

export function legible(texto) {
  if (!texto) return '-';
  const clave = String(texto);
  if (ETIQUETAS[clave]) return ETIQUETAS[clave];
  const s = clave.replace(/_/g, ' ').toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}
