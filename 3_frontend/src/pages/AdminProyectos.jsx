import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api';

export default function AdminProyectos() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    fetchApi('/proyectos')
      .then(data => setProyectos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Gestión de Proyectos</h1>
      <div className="bg-white rounded-xl border overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Ciudad</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Precio Desde</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map(p => (
              <tr key={p.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-semibold">{p.nombre}</td>
                <td className="p-3">{p.ciudad}</td>
                <td className="p-3">{p.estado}</td>
                <td className="p-3">${Number(p.precioDesde).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
