import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../api';
import {
  Button, Seccion, Meta, Dato, EsqueletoTarjeta, Aviso,
  precioCOP, legible, dosDigitos,
} from '../ui';

export default function Inicio() {
  const [destacados, setDestacados] = useState([]);
  const [todos, setTodos] = useState([]);
  const [viviendas, setViviendas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Tres peticiones en paralelo: los destacados para el listado y los
    // otros dos para alimentar los datos de la portada.
    Promise.all([
      fetchApi('/proyectos/destacados'),
      fetchApi('/proyectos'),
      fetchApi('/viviendas/disponibles'),
    ])
      .then(([dest, proys, vivs]) => { setDestacados(dest); setTodos(proys); setViviendas(vivs); })
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const ciudades = [...new Set(todos.map(p => p.ciudad))];
  const principal = destacados[0];
  const resto = destacados.slice(1);

  return (
    <div className="flex flex-col gap-28 lg:gap-40">

      {/* ── Portada: titular desbordado, sin foto de fondo ────────── */}
      <section>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="rotulo-acento">01</span>
          <span className="rotulo">— Constructora · Bogotá · Medellín · Cali</span>
        </div>

        <h1 className="text-display-xl mt-10 text-hueso-50 font-semibold">
          Espacios
          <br />
          <span className="text-terracota-400">para habitar</span>
        </h1>

        <div className="regla mt-14 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
          <p className="lg:col-span-5 text-base leading-relaxed text-hueso-200">
            Diseñamos y construimos vivienda donde la arquitectura, la luz y el
            detalle trabajan a favor de quien la habita.
          </p>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-wrap items-start gap-4">
            <Link to="/proyectos"><Button variant="primary">Ver proyectos</Button></Link>
            <Link to="/contacto"><Button variant="outline">Agendar visita</Button></Link>
          </div>
        </div>
      </section>

      {/* ── Datos: números grandes en monoespaciada ──────────────── */}
      <section className="regla pt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
        <Dato valor={dosDigitos(todos.length)}      etiqueta="Proyectos activos" />
        <Dato valor={dosDigitos(viviendas.length)}  etiqueta="Viviendas disponibles" />
        <Dato valor={dosDigitos(ciudades.length)}   etiqueta="Ciudades" />
        <Dato valor="18"                            etiqueta="Años construyendo" />
      </section>

      {/* ── Destacados: uno grande + los demás pequeños ──────────── */}
      <section className="flex flex-col gap-14">
        <Seccion
          numero="02"
          rotulo="Selección"
          titulo="Proyectos destacados"
          derecha={`${dosDigitos(destacados.length)} proyectos`}
        />

        {error && <Aviso tipo="error">No pudimos cargar los proyectos: {error}</Aviso>}

        {cargando ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7"><EsqueletoTarjeta alto="h-[32rem]" /></div>
            <div className="lg:col-span-5"><EsqueletoTarjeta alto="h-[15rem]" /></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16">

            {principal && (
              <Link to={`/detalle-proyecto/${principal.id}`} className="lg:col-span-7 group block">
                <div className="overflow-hidden">
                  <img src={principal.imageUrl} alt={principal.nombre}
                       className="w-full h-[26rem] lg:h-[34rem] object-cover
                                  transition-transform duration-[900ms] group-hover:scale-[1.03]" />
                </div>
                <div className="border-t border-hueso-100/[0.10] group-hover:border-terracota-400/60
                                transition-colors duration-500 mt-6 pt-6
                                flex flex-wrap items-start justify-between gap-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-5">
                      <Meta acento>{principal.ciudad}</Meta>
                      <Meta>{legible(principal.estado)}</Meta>
                    </div>
                    <h3 className="text-display-md text-hueso-50">{principal.nombre}</h3>
                    <p className="max-w-md text-sm leading-relaxed text-hueso-300">
                      {principal.descripcion}
                    </p>
                  </div>
                  <div className="flex flex-col items-start lg:items-end gap-2">
                    <span className="rotulo">Desde</span>
                    <span className="font-mono text-lg text-hueso-50 tabular-nums">
                      {precioCOP(principal.precioDesde)}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <div className="lg:col-span-5 flex flex-col gap-12">
              {resto.map(p => (
                <Link key={p.id} to={`/detalle-proyecto/${p.id}`} className="group block">
                  <div className="overflow-hidden">
                    <img src={p.imageUrl} alt={p.nombre}
                         className="w-full h-56 object-cover
                                    transition-transform duration-[900ms] group-hover:scale-[1.03]" />
                  </div>
                  <div className="border-t border-hueso-100/[0.10] group-hover:border-terracota-400/60
                                  transition-colors duration-500 mt-5 pt-5 flex flex-col gap-3">
                    <div className="flex flex-wrap gap-5">
                      <Meta acento>{p.ciudad}</Meta>
                      <Meta>{legible(p.estado)}</Meta>
                    </div>
                    <h3 className="text-2xl tracking-tight text-hueso-50">{p.nombre}</h3>
                    <span className="font-mono text-sm text-hueso-300 tabular-nums">
                      desde {precioCOP(p.precioDesde)}
                    </span>
                  </div>
                </Link>
              ))}

              <div className="regla pt-6">
                <Link to="/proyectos" className="enlace font-mono text-rotulo uppercase">
                  Ver el portafolio completo →
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
