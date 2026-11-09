import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../api';
import { TituloSeccion, Etiqueta, Esqueleto, Aviso, Button, precioCOP, legible } from '../ui';

export default function AdminProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApi('/proyectos')
      .then(data => setProyectos(data))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <TituloSeccion eyebrow="Administración" titulo="Gestión de proyectos" />
        <span className="text-[0.64rem] uppercase tracking-[0.18em] text-white/35">
          {proyectos.length} registro(s)
        </span>
      </div>

      {error && <Aviso tipo="error">No pudimos cargar los proyectos: {error}</Aviso>}
      {cargando && <div className="flex flex-col gap-2">{[1,2,3,4].map(i => <Esqueleto key={i} className="h-14 w-full" />)}</div>}

      {!cargando && !error && (
        <div className="border border-white/[0.07] overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[46rem]">
            <thead>
              <tr className="bg-carbon-900/70 border-b border-white/[0.07]">
                <th className="px-5 py-4 eyebrow">Proyecto</th>
                <th className="px-5 py-4 eyebrow">Ciudad</th>
                <th className="px-5 py-4 eyebrow">Estado</th>
                <th className="px-5 py-4 eyebrow">Destacado</th>
                <th className="px-5 py-4 eyebrow text-right">Precio desde</th>
                <th className="px-5 py-4 eyebrow"></th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map(p => (
                <tr key={p.id} className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-white">{p.nombre}</span>
                    <br />
                    <span className="text-[0.68rem] text-white/30">{p.direccion}</span>
                  </td>
                  <td className="px-5 py-4 text-white/60">{p.ciudad}</td>
                  <td className="px-5 py-4"><Etiqueta tono="exito">{legible(p.estado)}</Etiqueta></td>
                  <td className="px-5 py-4">
                    {p.destacado
                      ? <Etiqueta>★ Sí</Etiqueta>
                      : <span className="text-white/25 text-xs">No</span>}
                  </td>
                  <td className="px-5 py-4 text-right text-oro-300 whitespace-nowrap">{precioCOP(p.precioDesde)}</td>
                  <td className="px-5 py-4 text-right">
                    <Link to={`/detalle-proyecto/${p.id}`}>
                      <Button variant="ghost" className="px-0 text-[0.68rem]">Ver →</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!cargando && !error && proyectos.length === 0 && (
        <Aviso>Todavía no hay proyectos registrados.</Aviso>
      )}
    </div>
  );
}
