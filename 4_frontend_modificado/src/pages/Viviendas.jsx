import React, { useEffect, useMemo, useState } from 'react';
import { fetchApi } from '../api';
import { Seccion, Meta, Esqueleto, Aviso, precioCOP, legible, dosDigitos } from '../ui';

export default function Viviendas() {
  const [viviendas, setViviendas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [tipo, setTipo] = useState('TODOS');

  useEffect(() => {
    fetchApi('/viviendas/disponibles')
      .then(setViviendas)
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const tipos = useMemo(() => ['TODOS', ...new Set(viviendas.map(v => v.tipo))], [viviendas]);
  const visibles = tipo === 'TODOS' ? viviendas : viviendas.filter(v => v.tipo === tipo);

  return (
    <div className="flex flex-col gap-16">
      <Seccion
        numero="01"
        rotulo="Inmuebles"
        titulo="Viviendas disponibles"
        descripcion="Casas, apartamentos y lotes listos para reservar."
        derecha={`${dosDigitos(visibles.length)} disponibles`}
      />

      {/* Filtro por tipo: texto, no botones con fondo. */}
      <div className="regla pt-6 flex flex-wrap gap-x-10 gap-y-4">
        {tipos.map(t => (
          <button key={t} onClick={() => setTipo(t)}
                  className={'font-mono text-rotulo uppercase transition-colors duration-300 flex items-baseline gap-2 ' +
                             (tipo === t ? 'text-terracota-400' : 'text-hueso-400 hover:text-hueso-100')}>
            {tipo === t && <span className="h-1 w-1 bg-terracota-400" />}
            {t === 'TODOS' ? 'Todas' : legible(t)}
            <span className="text-hueso-500">
              {t === 'TODOS' ? dosDigitos(viviendas.length)
                             : dosDigitos(viviendas.filter(v => v.tipo === t).length)}
            </span>
          </button>
        ))}
      </div>

      {error && <Aviso tipo="error">No pudimos cargar las viviendas: {error}</Aviso>}

      {cargando && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map(i => <Esqueleto key={i} className="h-80 w-full" />)}
        </div>
      )}

      {!cargando && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {visibles.map(v => (
            <article key={v.id} className="group flex flex-col">
              <div className="overflow-hidden">
                <img src={v.imageUrl} alt={v.titulo}
                     className="w-full h-64 object-cover
                                transition-transform duration-[900ms] group-hover:scale-[1.04]" />
              </div>

              <div className="border-t border-hueso-100/[0.10] group-hover:border-terracota-400/60
                              transition-colors duration-500 mt-5 pt-5 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <Meta acento>{legible(v.tipo)}</Meta>
                  <Meta>{v.proyectoNombre}</Meta>
                </div>

                <h3 className="text-2xl tracking-tight text-hueso-50">{v.titulo}</h3>

                {/* Ficha técnica: tres datos separados por líneas verticales. */}
                <dl className="flex items-stretch divide-x divide-hueso-100/[0.10] -mx-1">
                  {[
                    { n: v.habitaciones, l: 'Habitaciones' },
                    { n: v.banos,        l: 'Baños' },
                    { n: v.area,         l: 'm²' },
                  ].map(d => (
                    <div key={d.l} className="flex-1 px-1 flex flex-col gap-1.5">
                      <dd className="font-mono text-xl text-hueso-50 tabular-nums">{d.n}</dd>
                      <dt className="rotulo">{d.l}</dt>
                    </div>
                  ))}
                </dl>

                <span className="font-mono text-base text-hueso-50 tabular-nums pt-1">
                  {precioCOP(v.precio)}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {!cargando && !error && visibles.length === 0 && (
        <Aviso>No hay viviendas disponibles de este tipo en este momento.</Aviso>
      )}
    </div>
  );
}
