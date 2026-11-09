import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../api';
import {
  Card, Button, TituloSeccion, Etiqueta, EsqueletoTarjeta,
  Aviso, Select, precioCOP, legible,
} from '../ui';

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Filtros en el cliente: elementos nuevos respecto a la version base.
  const [ciudad, setCiudad] = useState('TODAS');
  const [estado, setEstado] = useState('TODOS');
  const [orden, setOrden] = useState('nombre');

  useEffect(() => {
    fetchApi('/proyectos')
      .then(data => setProyectos(data))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const ciudades = useMemo(
    () => [...new Set(proyectos.map(p => p.ciudad))].sort(),
    [proyectos]
  );
  const estados = useMemo(
    () => [...new Set(proyectos.map(p => p.estado))].sort(),
    [proyectos]
  );

  const visibles = useMemo(() => {
    const lista = proyectos.filter(p =>
      (ciudad === 'TODAS' || p.ciudad === ciudad) &&
      (estado === 'TODOS' || p.estado === estado)
    );
    const copia = [...lista];
    if (orden === 'precio_asc') copia.sort((a, b) => a.precioDesde - b.precioDesde);
    else if (orden === 'precio_desc') copia.sort((a, b) => b.precioDesde - a.precioDesde);
    else copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return copia;
  }, [proyectos, ciudad, estado, orden]);

  return (
    <div className="flex flex-col gap-10">
      <TituloSeccion
        eyebrow="Portafolio"
        titulo="Todos los proyectos"
        descripcion="Filtra por ciudad, estado de obra o rango de precio para encontrar lo que buscas."
      />

      {/* --- Barra de filtros (elemento nuevo) --- */}
      <div className="border border-white/[0.07] bg-carbon-900/40 px-6 py-5
                      grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <Select label="Ciudad" value={ciudad} onChange={e => setCiudad(e.target.value)}>
          <option value="TODAS">Todas las ciudades</option>
          {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        <Select label="Estado de obra" value={estado} onChange={e => setEstado(e.target.value)}>
          <option value="TODOS">Todos los estados</option>
          {estados.map(e => <option key={e} value={e}>{legible(e)}</option>)}
        </Select>
        <Select label="Ordenar por" value={orden} onChange={e => setOrden(e.target.value)}>
          <option value="nombre">Nombre (A-Z)</option>
          <option value="precio_asc">Precio: menor a mayor</option>
          <option value="precio_desc">Precio: mayor a menor</option>
        </Select>
        <div className="text-right">
          <span className="text-[0.64rem] uppercase tracking-[0.18em] text-white/35">
            {visibles.length} de {proyectos.length} proyectos
          </span>
        </div>
      </div>

      {error && <Aviso tipo="error">No pudimos cargar los proyectos: {error}</Aviso>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {cargando && [1, 2, 3].map(i => <EsqueletoTarjeta key={i} />)}

        {!cargando && visibles.map(p => (
          <Card key={p.id}>
            <div className="relative overflow-hidden h-56">
              <img
                src={p.imageUrl}
                alt={p.nombre}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/80 to-transparent" />
              {p.destacado && (
                <div className="absolute top-4 right-4">
                  <Etiqueta>★ Destacado</Etiqueta>
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <Etiqueta tono="neutro">{p.ciudad}</Etiqueta>
                <Etiqueta tono="exito">{legible(p.estado)}</Etiqueta>
              </div>
              <h3 className="font-display text-2xl text-white font-light">{p.nombre}</h3>
              <p className="text-sm text-white/50 leading-relaxed line-clamp-3">{p.descripcion}</p>
              <span className="text-[0.68rem] text-white/30">{p.direccion}</span>
              <div className="regla-oro my-2" />
              <div className="flex items-end justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[0.6rem] uppercase tracking-[0.18em] text-white/35">Desde</span>
                  <span className="text-base text-oro-300">{precioCOP(p.precioDesde)}</span>
                </div>
                <Link to={`/detalle-proyecto/${p.id}`}>
                  <Button variant="outline" className="text-[0.7rem] px-4 py-2">Ver detalle</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!cargando && !error && visibles.length === 0 && (
        <Aviso>Ningún proyecto coincide con los filtros seleccionados.</Aviso>
      )}
    </div>
  );
}
