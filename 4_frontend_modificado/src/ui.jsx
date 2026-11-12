import React from 'react';

/* ============================================================
   Sistema de componentes — Habita
   Lenguaje visual: editorial arquitectónico.
   Reglas que sigue todo el sistema:
     · Un solo acento (terracota), usado con cuenta.
     · Contraste de escala: o muy grande, o muy pequeño.
     · La línea fina estructura; la sombra no existe.
     · La monoespaciada se reserva para números y metadatos.
   ============================================================ */

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'font-mono text-rotulo uppercase px-6 py-3.5 transition-all duration-300 ' +
    'inline-flex items-center justify-center gap-3 cursor-pointer ' +
    'disabled:opacity-35 disabled:cursor-not-allowed';
  const variants = {
    primary:   'bg-terracota-400 text-tinta-950 hover:bg-terracota-300',
    secondary: 'bg-tinta-800 text-hueso-100 hover:bg-tinta-700',
    outline:   'border border-hueso-100/20 text-hueso-100 hover:border-terracota-400 hover:text-terracota-300',
    danger:    'border border-terracota-500/40 text-terracota-300 hover:bg-terracota-500/10',
    ghost:     'text-hueso-300 hover:text-terracota-300 px-0',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

/** Tarjeta sin sombra: solo una línea que se tiñe al pasar el cursor. */
export function Card({ children, className = '' }) {
  return (
    <article className={`group border-t border-hueso-100/[0.10] hover:border-terracota-400/60
                         transition-colors duration-500 pt-5 ${className}`}>
      {children}
    </article>
  );
}

/** Encabezado de sección numerado: 01 — PORTAFOLIO + titular enorme. */
export function Seccion({ numero, rotulo, titulo, descripcion, derecha, className = '' }) {
  return (
    <header className={`regla pt-6 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
        <div className="flex items-baseline gap-5">
          {numero && <span className="rotulo-acento">{numero}</span>}
          {rotulo && <span className="rotulo">— {rotulo}</span>}
        </div>
        {derecha && <span className="rotulo">{derecha}</span>}
      </div>
      {titulo && (
        <h2 className="text-display-md mt-7 max-w-3xl text-hueso-50">{titulo}</h2>
      )}
      {descripcion && (
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-hueso-300">{descripcion}</p>
      )}
    </header>
  );
}

/** Metadato breve. Sin fondo: solo texto y, si acaso, un punto de color. */
export function Meta({ children, acento = false }) {
  return (
    <span className={`font-mono text-rotulo uppercase inline-flex items-center gap-2
                      ${acento ? 'text-terracota-300' : 'text-hueso-400'}`}>
      {acento && <span className="h-1 w-1 bg-terracota-400" />}
      {children}
    </span>
  );
}

/** Dato numérico grande, en monoespaciada. */
export function Dato({ valor, etiqueta, className = '' }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <span className="font-mono text-4xl md:text-5xl font-medium text-hueso-50 tabular-nums tracking-tight">
        {valor}
      </span>
      <span className="rotulo">{etiqueta}</span>
    </div>
  );
}

export function Input({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {label && <label className="rotulo">{label}</label>}
      <input
        className="w-full bg-transparent border-0 border-b border-hueso-100/15 py-2.5 text-sm
                   text-hueso-50 placeholder:text-hueso-500
                   focus:outline-none focus:border-terracota-400 transition-colors duration-300"
        {...props}
      />
      {error && <span className="font-mono text-rotulo text-terracota-300">{error}</span>}
    </div>
  );
}

export function Textarea({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {label && <label className="rotulo">{label}</label>}
      <textarea
        className="w-full bg-transparent border-0 border-b border-hueso-100/15 py-2.5 text-sm resize-none
                   text-hueso-50 placeholder:text-hueso-500
                   focus:outline-none focus:border-terracota-400 transition-colors duration-300"
        {...props}
      />
      {error && <span className="font-mono text-rotulo text-terracota-300">{error}</span>}
    </div>
  );
}

export function Select({ label, children, error, ...props }) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {label && <label className="rotulo">{label}</label>}
      <select
        className="w-full bg-transparent border-0 border-b border-hueso-100/15 py-2.5 text-sm
                   text-hueso-50 focus:outline-none focus:border-terracota-400
                   transition-colors duration-300 [&>option]:bg-tinta-900 [&>option]:text-hueso-100"
        {...props}
      >
        {children}
      </select>
      {error && <span className="font-mono text-rotulo text-terracota-300">{error}</span>}
    </div>
  );
}

/* --- Estados --- */

export function Esqueleto({ className = '' }) {
  return <div className={`animate-pulse bg-hueso-100/[0.05] ${className}`} />;
}

export function EsqueletoTarjeta({ alto = 'h-[22rem]' }) {
  return (
    <div className="border-t border-hueso-100/[0.10] pt-5">
      <Esqueleto className={`${alto} w-full`} />
      <div className="flex flex-col gap-3 pt-5">
        <Esqueleto className="h-2.5 w-24" />
        <Esqueleto className="h-6 w-2/3" />
        <Esqueleto className="h-2.5 w-1/3" />
      </div>
    </div>
  );
}

export function Aviso({ tipo = 'info', children }) {
  const tipos = {
    info:  'border-hueso-100/15 text-hueso-300',
    error: 'border-terracota-500/50 text-terracota-300',
    exito: 'border-hueso-100/25 text-hueso-100',
  };
  return (
    <div className={`border-l-2 pl-5 py-3 text-sm ${tipos[tipo]}`}>{children}</div>
  );
}

/* --- Utilidades de formato --- */

/** Pesos colombianos, sin decimales. */
export function precioCOP(valor) {
  if (valor === null || valor === undefined || valor === '') return '—';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0,
  }).format(Number(valor));
}

/**
 * Traduce los enums del backend a texto legible. Si llega un valor que no
 * está en el diccionario, se formatea igual quitando los guiones bajos.
 */
const ETIQUETAS = {
  EN_PLANOS: 'En planos',
  EN_CONSTRUCCION: 'En construcción',
  ENTREGA_INMEDIATA: 'Entrega inmediata',
  FINALIZADO: 'Finalizado',
  CASA: 'Casa',
  APARTAMENTO: 'Apartamento',
  LOTE: 'Lote',
};

export function legible(texto) {
  if (!texto) return '—';
  const clave = String(texto);
  if (ETIQUETAS[clave]) return ETIQUETAS[clave];
  const s = clave.replace(/_/g, ' ').toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Numera secciones y listados: 1 -> "01". */
export function dosDigitos(n) {
  return String(n).padStart(2, '0');
}
