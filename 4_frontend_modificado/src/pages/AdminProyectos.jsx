import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../api';
import { Seccion, Meta, Esqueleto, Aviso, precioCOP, legible, dosDigitos } from '../ui';

export default function AdminProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApi('/proyectos')
      .then(setProyectos)
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="flex flex-col gap-14">
      <Seccion numero="01" rotulo="Gestión" titulo="Proyectos"
               derecha={`${dosDigitos(proyectos.length)} registros`} />

      {error && <Aviso tipo="error">No pudimos cargar los proyectos: {error}</Aviso>}
      {cargando && <div className="flex flex-col gap-3">{[1,2,3].map(i => <Esqueleto key={i} className="h-16 w-full" />)}</div>}

      {!cargando && !error && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[48rem] text-left">
            <thead>
              <tr className="border-b border-hueso-100/20">
                <th className="rotulo pb-4 pr-6 w-10">#</th>
                <th className="rotulo pb-4 pr-6">Proyecto</th>
                <th className="rotulo pb-4 pr-6">Ciudad</th>
                <th className="rotulo pb-4 pr-6">Estado</th>
                <th className="rotulo pb-4 pr-6">Destacado</th>
                <th className="rotulo pb-4 text-right">Precio desde</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((p, i) => (
                <tr key={p.id} className="border-b border-hueso-100/[0.08] group hover:bg-hueso-100/[0.02] transition-colors">
                  <td className="py-6 pr-6 font-mono text-rotulo text-hueso-500 align-top">{dosDigitos(i + 1)}</td>
                  <td className="py-6 pr-6 align-top">
                    <Link to={`/detalle-proyecto/${p.id}`}
                          className="text-lg text-hueso-50 group-hover:text-terracota-300 transition-colors">
                      {p.nombre}
                    </Link>
                    <div className="mt-1.5"><span className="rotulo">{p.direccion}</span></div>
                  </td>
                  <td className="py-6 pr-6 align-top text-sm text-hueso-200">{p.ciudad}</td>
                  <td className="py-6 pr-6 align-top"><Meta>{legible(p.estado)}</Meta></td>
                  <td className="py-6 pr-6 align-top">
                    {p.destacado ? <Meta acento>Sí</Meta> : <span className="rotulo">No</span>}
                  </td>
                  <td className="py-6 align-top text-right font-mono text-sm text-hueso-50 tabular-nums whitespace-nowrap">
                    {precioCOP(p.precioDesde)}
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
