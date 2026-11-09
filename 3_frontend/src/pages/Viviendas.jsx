import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api';
import { Card } from '../ui';

export default function Viviendas() {
  const [viviendas, setViviendas] = useState([]);

  useEffect(() => {
    fetchApi('/viviendas/disponibles')
      .then(data => setViviendas(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-extrabold text-slate-800">Viviendas Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {viviendas.map((v) => (
          <Card key={v.id}>
            <img src={v.imageUrl} alt={v.titulo} className="h-48 w-full object-cover" />
            <div className="p-5 flex flex-col gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 w-max">{v.tipo}</span>
              <h3 className="text-xl font-bold">{v.titulo}</h3>
              <div className="flex gap-4 text-sm text-slate-600">
                <span>🛏 {v.habitaciones} Hab.</span>
                <span>🚿 {v.banos} Baños</span>
                <span>📐 {v.area} m²</span>
              </div>
              <span className="text-xs text-slate-500">Proyecto: {v.proyectoNombre}</span>
              <span className="text-lg font-bold text-indigo-600 mt-2">${Number(v.precio).toLocaleString()}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
