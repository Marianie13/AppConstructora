import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApi } from '../api';
import { FormularioInteres } from '../FormularioInteres';

export default function DetalleProyecto() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);

  useEffect(() => {
    fetchApi(`/proyectos/${id}`)
      .then(data => setProyecto(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!proyecto) return <div>Cargando detalle del proyecto...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <img src={proyecto.imageUrl} alt={proyecto.nombre} className="w-full h-80 object-cover rounded-2xl" />
        <h1 className="text-3xl font-extrabold">{proyecto.nombre}</h1>
        <p className="text-slate-600 leading-relaxed">{proyecto.descripcion}</p>
        <div className="p-4 bg-white rounded-xl border flex justify-around">
          <div><span className="block text-xs text-slate-500">Ciudad</span><b>{proyecto.ciudad}</b></div>
          <div><span className="block text-xs text-slate-500">Estado</span><b>{proyecto.estado}</b></div>
          <div><span className="block text-xs text-slate-500">Precio Desde</span><b className="text-indigo-600">${Number(proyecto.precioDesde).toLocaleString()}</b></div>
        </div>
      </div>
      <div>
        <FormularioInteres proyectoId={proyecto.id} />
      </div>
    </div>
  );
}
