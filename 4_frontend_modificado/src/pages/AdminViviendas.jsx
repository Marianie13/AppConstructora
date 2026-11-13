import React, { useEffect, useMemo, useState } from 'react';
import { fetchApi } from '../api';
import { Seccion, Meta, Dato, Esqueleto, Aviso, precioCOP, legible, dosDigitos } from '../ui';

export default function AdminViviendas() {
  const [viviendas, setViviendas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApi('/viviendas')
      .then(setViviendas)
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  // Resumen del inventario, calculado en el cliente.
  const resumen = useMemo(() => {
    const disponibles = viviendas.filter(v => v.disponible).length;
    return {
      total: viviendas.length,
      disponibles,
      reservadas: viviendas.length - disponibles,
      valor: viviendas.reduce((acc, v) => acc + Number(v.precio || 0), 0),
    };
  }, [viviendas]);

  return (
    <div className="flex flex-col gap-14">
      <Seccion numero="01" rotulo="Gestión" titulo="Viviendas"
               derecha={`${dosDigitos(viviendas.length)} registros`} />

      {error && <Aviso tipo="error">No pudimos cargar las viviendas: {error}</Aviso>}

      {!cargando && !error && (
        <section className="regla pt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          <Dato valor={dosDigitos(resumen.total)}       etiqueta="Total inmuebles" />
          <Dato valor={dosDigitos(resumen.disponibles)} etiqueta="Disponibles" />
          <Dato valor={dosDigitos(resumen.reservadas)}  etiqueta="Reservadas" />
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xl md:text-2xl font-medium text-terracota-300 tabular-nums">
              {precioCOP(resumen.valor)}
            </span>
            <span className="rotulo">Valor del inventario</span>
          </div>
        </section>
      )}

      {cargando && <div className="flex flex-col gap-3">{[1,2,3,4].map(i => <Esqueleto key={i} className="h-16 w-full" />)}</div>}

      {!cargando && !error && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[52rem] text-left">
            <thead>
              <tr className="border-b border-tinta-800/20">
                <th className="rotulo pb-4 pr-6 w-10">#</th>
                <th className="rotulo pb-4 pr-6">Inmueble</th>
                <th className="rotulo pb-4 pr-6">Tipo</th>
                <th className="rotulo pb-4 pr-6">Proyecto</th>
                <th className="rotulo pb-4 pr-6 text-center">Hab · Baños · m²</th>
                <th className="rotulo pb-4 pr-6">Estado</th>
                <th className="rotulo pb-4 text-right">Precio</th>
              </tr>
            </thead>
            <tbody>
              {viviendas.map((v, i) => (
                <tr key={v.id} className="border-b border-tinta-800/[0.08] hover:bg-tinta-800/[0.02] transition-colors">
                  <td className="py-5 pr-6 font-mono text-rotulo text-tinta-400">{dosDigitos(i + 1)}</td>
                  <td className="py-5 pr-6 text-base text-tinta-900">{v.titulo}</td>
                  <td className="py-5 pr-6"><Meta>{legible(v.tipo)}</Meta></td>
                  <td className="py-5 pr-6 text-sm text-tinta-600">{v.proyectoNombre}</td>
                  <td className="py-5 pr-6 text-center font-mono text-sm text-tinta-700 tabular-nums whitespace-nowrap">
                    {v.habitaciones} · {v.banos} · {v.area}
                  </td>
                  <td className="py-5 pr-6">
                    {v.disponible ? <Meta acento>Disponible</Meta> : <span className="rotulo">Reservada</span>}
                  </td>
                  <td className="py-5 text-right font-mono text-sm text-tinta-900 tabular-nums whitespace-nowrap">
                    {precioCOP(v.precio)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!cargando && !error && viviendas.length === 0 && (
        <Aviso>Todavía no hay viviendas registradas.</Aviso>
      )}
    </div>
  );
}
