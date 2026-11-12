import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchApi } from '../api';
import { FormularioInteres } from '../FormularioInteres';
import { Meta, Esqueleto, Aviso, precioCOP, legible, dosDigitos } from '../ui';

export default function DetalleProyecto() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [viviendas, setViviendas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Ademas del proyecto se traen sus viviendas para listarlas aqui mismo.
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
      <div className="flex flex-col gap-8">
        <Esqueleto className="h-4 w-64" />
        <Esqueleto className="h-24 w-2/3" />
        <Esqueleto className="h-[30rem] w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-20">

      {/* Migas de pan */}
      <nav className="flex items-center gap-3 font-mono text-rotulo uppercase text-hueso-500">
        <Link to="/" className="hover:text-terracota-300 transition-colors">Inicio</Link>
        <span>/</span>
        <Link to="/proyectos" className="hover:text-terracota-300 transition-colors">Proyectos</Link>
        <span>/</span>
        <span className="text-hueso-200">{proyecto.nombre}</span>
      </nav>

      {/* Titular antes de la imagen: la jerarquia manda sobre la foto. */}
      <header>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Meta acento>{proyecto.ciudad}</Meta>
          <Meta>{legible(proyecto.estado)}</Meta>
          <Meta>{proyecto.direccion}</Meta>
        </div>
        <h1 className="text-display-lg mt-8 text-hueso-50 font-semibold max-w-4xl">
          {proyecto.nombre}
        </h1>
      </header>

      <div className="overflow-hidden">
        <img src={proyecto.imageUrl} alt={proyecto.nombre}
             className="w-full h-[26rem] lg:h-[38rem] object-cover" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-20">

        <div className="lg:col-span-7 flex flex-col gap-16">
          <div className="regla pt-8 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6">
            <span className="md:col-span-3 rotulo pt-1">El proyecto</span>
            <p className="md:col-span-9 text-base leading-relaxed text-hueso-200">
              {proyecto.descripcion}
            </p>
          </div>

          <div className="regla pt-8 grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-10">
            <div className="flex flex-col gap-2">
              <span className="rotulo">Ubicación</span>
              <span className="text-sm text-hueso-100">{proyecto.direccion}</span>
              <span className="text-sm text-hueso-400">{proyecto.ciudad}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="rotulo">Estado de obra</span>
              <span className="text-sm text-hueso-100">{legible(proyecto.estado)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="rotulo">Precio desde</span>
              <span className="font-mono text-base text-terracota-300 tabular-nums">
                {precioCOP(proyecto.precioDesde)}
              </span>
            </div>
          </div>

          {viviendas.length > 0 && (
            <section className="flex flex-col gap-8">
              <div className="regla pt-6 flex items-baseline justify-between gap-6">
                <div className="flex items-baseline gap-5">
                  <span className="rotulo-acento">02</span>
                  <span className="rotulo">— Inmuebles del proyecto</span>
                </div>
                <span className="rotulo">{dosDigitos(viviendas.length)}</span>
              </div>

              <div className="flex flex-col">
                {viviendas.map((v, i) => (
                  <div key={v.id}
                       className="border-t border-hueso-100/[0.10] py-6 flex items-center gap-6">
                    <span className="font-mono text-rotulo text-hueso-500 w-6 shrink-0">
                      {dosDigitos(i + 1)}
                    </span>
                    <img src={v.imageUrl} alt={v.titulo}
                         className="w-24 h-20 object-cover shrink-0" />
                    <div className="flex flex-col gap-1.5 min-w-0 flex-grow">
                      <span className="text-base text-hueso-50 truncate">{v.titulo}</span>
                      <span className="font-mono text-rotulo uppercase text-hueso-400">
                        {v.habitaciones} hab · {v.banos} baños · {v.area} m²
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <Meta acento={v.disponible}>
                        {v.disponible ? 'Disponible' : 'Reservada'}
                      </Meta>
                      <span className="font-mono text-sm text-hueso-100 tabular-nums">
                        {precioCOP(v.precio)}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="regla" />
              </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9 lg:sticky lg:top-28 h-max">
          <FormularioInteres proyectoId={proyecto.id} />
        </aside>
      </div>
    </div>
  );
}
