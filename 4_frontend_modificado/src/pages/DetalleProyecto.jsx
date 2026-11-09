import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApi } from '../api';
import { FormularioInteres } from '../FormularioInteres';
import { Etiqueta, Esqueleto, Aviso, Card, precioCOP, legible } from '../ui';

export default function DetalleProyecto() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [viviendas, setViviendas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Ademas del proyecto traemos sus viviendas, para mostrarlas en la
    // misma pagina. La version base no hacia esta segunda peticion.
    Promise.all([
      fetchApi(`/proyectos/${id}`),
      fetchApi(`/viviendas/proyecto/${id}`).catch(() => []),
    ])
      .then(([p, vs]) => { setProyecto(p); setViviendas(vs); })
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <Aviso tipo="error">No pudimos cargar el proyecto: {error}</Aviso>;

  if (!proyecto) {
    return (
      <div className="flex flex-col gap-6">
        <Esqueleto className="h-96 w-full" />
        <Esqueleto className="h-10 w-1/2" />
        <Esqueleto className="h-4 w-full" />
        <Esqueleto className="h-4 w-4/5" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-14">
      {/* --- Migas de pan (elemento nuevo) --- */}
      <nav className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-white/30">
        <Link to="/" className="hover:text-oro-300 transition-colors">Inicio</Link>
        <span>/</span>
        <Link to="/proyectos" className="hover:text-oro-300 transition-colors">Proyectos</Link>
        <span>/</span>
        <span className="text-white/60">{proyecto.nombre}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="relative overflow-hidden border border-white/[0.07]">
            <img src={proyecto.imageUrl} alt={proyecto.nombre} className="w-full h-[26rem] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/70 to-transparent" />
            <div className="absolute bottom-6 left-7 flex flex-col gap-3">
              <div className="flex gap-2">
                <Etiqueta>{proyecto.ciudad}</Etiqueta>
                <Etiqueta tono="exito">{legible(proyecto.estado)}</Etiqueta>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-light text-white">{proyecto.nombre}</h1>
            </div>
          </div>

          <p className="text-white/55 leading-relaxed text-[0.95rem] max-w-2xl">{proyecto.descripcion}</p>

          {/* --- Ficha de datos --- */}
          <div className="border border-white/[0.07] bg-carbon-900/40 grid grid-cols-1 sm:grid-cols-3
                          divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
            <div className="px-6 py-5 flex flex-col gap-1">
              <span className="eyebrow">Ubicación</span>
              <span className="text-sm text-white/80">{proyecto.direccion}</span>
              <span className="text-xs text-white/40">{proyecto.ciudad}</span>
            </div>
            <div className="px-6 py-5 flex flex-col gap-1">
              <span className="eyebrow">Estado de obra</span>
              <span className="text-sm text-white/80">{legible(proyecto.estado)}</span>
            </div>
            <div className="px-6 py-5 flex flex-col gap-1">
              <span className="eyebrow">Precio desde</span>
              <span className="text-base text-oro-300">{precioCOP(proyecto.precioDesde)}</span>
            </div>
          </div>

          {/* --- Viviendas del proyecto (elemento nuevo) --- */}
          {viviendas.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="eyebrow">Inmuebles</span>
                <h2 className="text-2xl font-light text-white">Viviendas de este proyecto</h2>
                <div className="regla-oro max-w-[6rem]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {viviendas.map(v => (
                  <Card key={v.id} className="flex">
                    <img src={v.imageUrl} alt={v.titulo} className="w-28 h-auto object-cover shrink-0" />
                    <div className="p-4 flex flex-col gap-1.5 min-w-0">
                      <Etiqueta tono={v.disponible ? 'exito' : 'alerta'}>
                        {v.disponible ? 'Disponible' : 'Reservada'}
                      </Etiqueta>
                      <span className="text-base text-white truncate">{v.titulo}</span>
                      <span className="text-[0.68rem] text-white/40">
                        {v.habitaciones} hab · {v.banos} baños · {v.area} m²
                      </span>
                      <span className="text-sm text-oro-300">{precioCOP(v.precio)}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-28 h-max">
          <FormularioInteres proyectoId={proyecto.id} />
        </div>
      </div>
    </div>
  );
}
