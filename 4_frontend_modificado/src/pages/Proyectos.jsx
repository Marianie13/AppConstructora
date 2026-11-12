import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../api';
import {
  Seccion, Meta, Select, Esqueleto, Aviso,
  precioCOP, legible, dosDigitos,
} from '../ui';

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Filtrado y ordenamiento en el cliente.
  const [ciudad, setCiudad] = useState('TODAS');
  const [estado, setEstado] = useState('TODOS');
  const [orden, setOrden] = useState('nombre');

  useEffect(() => {
    fetchApi('/proyectos')
      .then(setProyectos)
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const ciudades = useMemo(() => [...new Set(proyectos.map(p => p.ciudad))].sort(), [proyectos]);
  const estados  = useMemo(() => [...new Set(proyectos.map(p => p.estado))].sort(), [proyectos]);

  const visibles = useMemo(() => {
    const lista = proyectos.filter(p =>
      (ciudad === 'TODAS' || p.ciudad === ciudad) &&
      (estado === 'TODOS' || p.estado === estado)
    );
    const copia = [...lista];
    if (orden === 'precio_asc')  copia.sort((a, b) => a.precioDesde - b.precioDesde);
    else if (orden === 'precio_desc') copia.sort((a, b) => b.precioDesde - a.precioDesde);
    else copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return copia;
  }, [proyectos, ciudad, estado, orden]);

  return (
    <div className="flex flex-col gap-16">
      <Seccion
        numero="01"
        rotulo="Portafolio"
        titulo="Todos los proyectos"
        descripcion="Filtra por ciudad, estado de obra o rango de precio."
        derecha={`${dosDigitos(visibles.length)} / ${dosDigitos(proyectos.length)}`}
      />

      {/* Filtros: sin caja, solo campos subrayados sobre una línea. */}
      <div className="regla pt-8 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
        <Select label="Ciudad" value={ciudad} onChange={e => setCiudad(e.target.value)}>
          <option value="TODAS">Todas</option>
          {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select label="Estado de obra" value={estado} onChange={e => setEstado(e.target.value)}>
          <option value="TODOS">Todos</option>
          {estados.map(e => <option key={e} value={e}>{legible(e)}</option>)}
        </Select>
        <Select label="Ordenar por" value={orden} onChange={e => setOrden(e.target.value)}>
          <option value="nombre">Nombre (A–Z)</option>
          <option value="precio_asc">Precio ascendente</option>
          <option value="precio_desc">Precio descendente</option>
        </Select>
      </div>

      {error && <Aviso tipo="error">No pudimos cargar los proyectos: {error}</Aviso>}

      {cargando && (
        <div className="flex flex-col gap-10">
          {[1, 2, 3].map(i => <Esqueleto key={i} className="h-56 w-full" />)}
        </div>
      )}

      {/* Listado en filas numeradas, no en tarjetas: se lee como un índice. */}
      {!cargando && !error && (
        <div className="flex flex-col">
          {visibles.map((p, i) => (
            <Link key={p.id} to={`/detalle-proyecto/${p.id}`}
                  className="group border-t border-hueso-100/[0.10] hover:border-terracota-400/60
                             transition-colors duration-500 py-10
                             grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-6 items-start">

              <span className="lg:col-span-1 font-mono text-rotulo text-hueso-500 pt-2">
                {dosDigitos(i + 1)}
              </span>

              <div className="lg:col-span-4 overflow-hidden">
                <img src={p.imageUrl} alt={p.nombre}
                     className="w-full h-52 object-cover
                                transition-transform duration-[900ms] group-hover:scale-[1.04]" />
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="flex flex-wrap gap-5">
                  <Meta acento>{p.ciudad}</Meta>
                  <Meta>{legible(p.estado)}</Meta>
                  {p.destacado && <Meta>Destacado</Meta>}
                </div>
                <h3 className="text-3xl tracking-tight text-hueso-50
                               group-hover:text-terracota-300 transition-colors duration-300">
                  {p.nombre}
                </h3>
                <p className="text-sm leading-relaxed text-hueso-300 max-w-md">{p.descripcion}</p>
                <span className="rotulo">{p.direccion}</span>
              </div>

              <div className="lg:col-span-3 flex flex-col lg:items-end gap-2 pt-2">
                <span className="rotulo">Desde</span>
                <span className="font-mono text-lg text-hueso-50 tabular-nums">
                  {precioCOP(p.precioDesde)}
                </span>
                <span className="mt-4 font-mono text-rotulo uppercase text-hueso-400
                                 group-hover:text-terracota-300 transition-colors duration-300">
                  Ver proyecto →
                </span>
              </div>
            </Link>
          ))}
          <div className="regla" />
        </div>
      )}

      {!cargando && !error && visibles.length === 0 && (
        <Aviso>Ningún proyecto coincide con los filtros seleccionados.</Aviso>
      )}
    </div>
  );
}
