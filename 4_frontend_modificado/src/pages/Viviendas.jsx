import React, { useEffect, useMemo, useState } from 'react';
import { fetchApi } from '../api';
import {
  Card, TituloSeccion, Etiqueta, EsqueletoTarjeta,
  Aviso, Button, precioCOP, legible,
} from '../ui';

export default function Viviendas() {
  const [viviendas, setViviendas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Pestanas por tipo de vivienda: elemento nuevo.
  const [tipo, setTipo] = useState('TODOS');

  useEffect(() => {
    fetchApi('/viviendas/disponibles')
      .then(data => setViviendas(data))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const tipos = useMemo(
    () => ['TODOS', ...new Set(viviendas.map(v => v.tipo))],
    [viviendas]
  );

  const visibles = tipo === 'TODOS'
    ? viviendas
    : viviendas.filter(v => v.tipo === tipo);

  return (
    <div className="flex flex-col gap-10">
      <TituloSeccion
        eyebrow="Inmuebles"
        titulo="Viviendas disponibles"
        descripcion="Casas, apartamentos y lotes listos para reservar en nuestros proyectos activos."
      />

      {/* --- Pestanas por tipo (elemento nuevo) --- */}
      <div className="flex flex-wrap gap-2 border-b border-white/[0.07] pb-px">
        {tipos.map(t => (
          <button
            key={t}
            onClick={() => setTipo(t)}
            className={
              'px-5 py-3 text-[0.72rem] uppercase tracking-[0.16em] transition-all duration-300 ' +
              (tipo === t
                ? 'text-oro-300 border-b-2 border-oro-400'
                : 'text-white/40 border-b-2 border-transparent hover:text-white/70')
            }
          >
            {t === 'TODOS' ? 'Todas' : legible(t)}
            {t !== 'TODOS' && (
              <span className="ml-2 text-white/25">
                {viviendas.filter(v => v.tipo === t).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {error && <Aviso tipo="error">No pudimos cargar las viviendas: {error}</Aviso>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {cargando && [1, 2, 3].map(i => <EsqueletoTarjeta key={i} />)}

        {!cargando && visibles.map(v => (
          <Card key={v.id}>
            <div className="relative overflow-hidden h-56">
              <img
                src={v.imageUrl}
                alt={v.titulo}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/80 to-transparent" />
              <div className="absolute top-4 left-5">
                <Etiqueta>{legible(v.tipo)}</Etiqueta>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h3 className="font-display text-2xl text-white font-light">{v.titulo}</h3>

              {/* Ficha tecnica en rejilla, antes era una linea de emojis */}
              <div className="grid grid-cols-3 border-y border-white/[0.07] divide-x divide-white/[0.07]">
                <div className="py-3 text-center">
                  <div className="text-lg text-white font-display">{v.habitaciones}</div>
                  <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/35">Habit.</div>
                </div>
                <div className="py-3 text-center">
                  <div className="text-lg text-white font-display">{v.banos}</div>
                  <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/35">Baños</div>
                </div>
                <div className="py-3 text-center">
                  <div className="text-lg text-white font-display">{v.area}</div>
                  <div className="text-[0.58rem] uppercase tracking-[0.16em] text-white/35">m²</div>
                </div>
              </div>

              <span className="text-[0.68rem] uppercase tracking-[0.14em] text-white/30">
                {v.proyectoNombre}
              </span>
              <span className="text-xl text-oro-300">{precioCOP(v.precio)}</span>
            </div>
          </Card>
        ))}
      </div>

      {!cargando && !error && visibles.length === 0 && (
        <Aviso>No hay viviendas disponibles de este tipo en este momento.</Aviso>
      )}
    </div>
  );
}
