import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api';
import { Card, Button } from '../ui';
import { Link } from 'react-router-dom';

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    fetchApi('/proyectos')
      .then(data => setProyectos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-extrabold text-slate-800">Todos los Proyectos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {proyectos.map((p) => (
          <Card key={p.id}>
            <img src={p.imageUrl} alt={p.nombre} className="h-48 w-full object-cover" />
            <div className="p-5 flex flex-col gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 w-max">{p.estado}</span>
              <h3 className="text-xl font-bold">{p.nombre}</h3>
              <p className="text-sm text-slate-600">{p.descripcion}</p>
              <span className="text-xs text-slate-500">{p.direccion}, {p.ciudad}</span>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-indigo-600">${Number(p.precioDesde).toLocaleString()}</span>
                <Link to={`/detalle-proyecto/${p.id}`}><Button variant="primary">Ver Detalle</Button></Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
