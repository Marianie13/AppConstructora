import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../api';
import {
  Card, Button, TituloSeccion, Etiqueta, Estadistica,
  EsqueletoTarjeta, Aviso, precioCOP, legible,
} from '../ui';

export default function Inicio() {
  const [destacados, setDestacados] = useState([]);
  const [todos, setTodos] = useState([]);
  const [viviendas, setViviendas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Tres peticiones en paralelo: destacados para el carrusel y los otros
    // dos listados solo para alimentar la banda de estadisticas.
    Promise.all([
      fetchApi('/proyectos/destacados'),
      fetchApi('/proyectos'),
      fetchApi('/viviendas/disponibles'),
    ])
      .then(([dest, proys, vivs]) => {
        setDestacados(dest);
        setTodos(proys);
        setViviendas(vivs);
      })
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const ciudades = new Set(todos.map(p => p.ciudad));

  return (
    <div className="flex flex-col gap-20">
      {/* --- Portada --- */}
      <section className="relative overflow-hidden border border-white/[0.07]">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt="Proyecto residencial"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-950 via-carbon-950/85 to-transparent" />
        <div className="relative px-8 md:px-16 py-20 md:py-28 flex flex-col gap-7 max-w-3xl">
          <span className="eyebrow">Proyectos de autor · 2026</span>
          <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-[1.05]">
            El hogar que<br />
            <span className="text-oro-300 italic">merece tu historia</span>
          </h1>
          <div className="regla-oro max-w-[8rem]" />
          <p className="text-white/60 text-base leading-relaxed max-w-xl">
            Diseñamos y construimos espacios residenciales donde la arquitectura, la luz
            y el detalle trabajan a favor de quien los habita.
          </p>
          <div className="flex flex-wrap gap-4 mt-3">
            <Link to="/proyectos"><Button variant="primary">Ver proyectos</Button></Link>
            <Link to="/contacto"><Button variant="outline">Agendar asesoría</Button></Link>
          </div>
        </div>
      </section>

      {/* --- Banda de estadisticas (elemento nuevo) --- */}
      <section className="border-y border-white/[0.07] divide-y md:divide-y-0 md:divide-x divide-white/[0.07]
                          grid grid-cols-1 md:grid-cols-4">
        <Estadistica valor={todos.length || '—'} etiqueta="Proyectos activos" />
        <Estadistica valor={viviendas.length || '—'} etiqueta="Viviendas disponibles" />
        <Estadistica valor={ciudades.size || '—'} etiqueta="Ciudades" />
        <Estadistica valor="18" etiqueta="Años de experiencia" />
      </section>

      {/* --- Proyectos destacados --- */}
      <section className="flex flex-col gap-10">
        <TituloSeccion
          eyebrow="Selección"
          titulo="Proyectos destacados"
          descripcion="Los desarrollos con mayor acogida de nuestro portafolio actual."
        />

        {error && <Aviso tipo="error">No pudimos cargar los proyectos: {error}</Aviso>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {cargando && [1, 2, 3].map(i => <EsqueletoTarjeta key={i} />)}

          {!cargando && destacados.map(p => (
            <Card key={p.id}>
              <div className="relative overflow-hidden h-56">
                <img
                  src={p.imageUrl}
                  alt={p.nombre}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/80 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <Etiqueta>{p.ciudad}</Etiqueta>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <Etiqueta tono="neutro">{legible(p.estado)}</Etiqueta>
                <h3 className="font-display text-2xl text-white font-light">{p.nombre}</h3>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{p.descripcion}</p>
                <div className="regla-oro my-2" />
                <div className="flex items-end justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-[0.6rem] uppercase tracking-[0.18em] text-white/35">Desde</span>
                    <span className="text-base text-oro-300">{precioCOP(p.precioDesde)}</span>
                  </div>
                  <Link to={`/detalle-proyecto/${p.id}`}>
                    <Button variant="ghost" className="px-0">Ver detalle →</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {!cargando && !error && destacados.length === 0 && (
          <Aviso>Por ahora no hay proyectos marcados como destacados.</Aviso>
        )}
      </section>
    </div>
  );
}
