import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api';

export default function AdminViviendas() {
  const [viviendas, setViviendas] = useState([]);

  useEffect(() => {
    fetchApi('/viviendas')
      .then(data => setViviendas(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Gestión de Viviendas</h1>
      <div className="bg-white rounded-xl border overflow-x-auto shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3">Título</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Disponible</th>
            </tr>
          </thead>
          <tbody>
            {viviendas.map(v => (
              <tr key={v.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-semibold">{v.titulo}</td>
                <td className="p-3">{v.tipo}</td>
                <td className="p-3">${Number(v.precio).toLocaleString()}</td>
                <td className="p-3">{v.disponible ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
