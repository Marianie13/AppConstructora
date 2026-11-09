import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api';
import { Card, Button } from '../ui';
import { Link } from 'react-router-dom';

export default function Inicio() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    fetchApi('/proyectos/destacados')
      .then(data => setDestacados(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <section className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-12 rounded-2xl flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold">Encuentra el hogar de tus sueños</h1>
        <p className="text-slate-300 text-lg max-w-2xl">
          Explora proyectos inmobiliarios exclusivos, casas y apartamentos con los más altos estándares de construcción.
        </p>
        <div className="flex gap-4 mt-2">
          <Link to="/proyectos"><Button variant="primary">Ver Proyectos</Button></Link>
          <Link to="/viviendas"><Button variant="secondary">Ver Inmuebles</Button></Link>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-slate-800">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destacados.map((p) => (
            <Card key={p.id}>
              <img src={p.imageUrl || 'https://via.placeholder.com/400x250'} alt={p.nombre} className="h-48 w-full object-cover" />
              <div className="p-5 flex flex-col gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 w-max">{p.ciudad}</span>
                <h3 className="text-xl font-bold">{p.nombre}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{p.descripcion}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-600">Desde ${Number(p.precioDesde).toLocaleString()}</span>
                  <Link to={`/detalle-proyecto/${p.id}`}><Button variant="outline">Ver Detalle</Button></Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
