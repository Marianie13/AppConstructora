import React, { useEffect, useMemo, useState } from 'react';
import { fetchApi } from '../api';
import { TituloSeccion, Etiqueta, Esqueleto, Aviso, Estadistica, precioCOP, legible } from '../ui';

export default function AdminViviendas() {
  const [viviendas, setViviendas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApi('/viviendas')
      .then(data => setViviendas(data))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  // Resumen calculado en el cliente: elemento nuevo.
  const resumen = useMemo(() => {
    const disponibles = viviendas.filter(v => v.disponible).length;
    const total = viviendas.length;
    const valor = viviendas.reduce((acc, v) => acc + Number(v.precio || 0), 0);
    return { total, disponibles, reservadas: total - disponibles, valor };
  }, [viviendas]);

  return (
    <div className="flex flex-col gap-10">
      <TituloSeccion eyebrow="Administración" titulo="Gestión de viviendas" />

      {error && <Aviso tipo="error">No pudimos cargar las viviendas: {error}</Aviso>}

      {!cargando && !error && (
        <section className="border-y border-white/[0.07] divide-y md:divide-y-0 md:divide-x divide-white/[0.07]
                            grid grid-cols-1 md:grid-cols-4">
          <Estadistica valor={resumen.total} etiqueta="Total inmuebles" />
          <Estadistica valor={resumen.disponibles} etiqueta="Disponibles" />
          <Estadistica valor={resumen.reservadas} etiqueta="Reservadas" />
          <Estadistica valor={precioCOP(resumen.valor)} etiqueta="Valor del inventario" />
        </section>
      )}

      {cargando && <div className="flex flex-col gap-2">{[1,2,3,4,5].map(i => <Esqueleto key={i} className="h-14 w-full" />)}</div>}

      {!cargando && !error && (
        <div className="border border-white/[0.07] overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[46rem]">
            <thead>
              <tr className="bg-carbon-900/70 border-b border-white/[0.07]">
                <th className="px-5 py-4 eyebrow">Inmueble</th>
                <th className="px-5 py-4 eyebrow">Tipo</th>
                <th className="px-5 py-4 eyebrow">Proyecto</th>
                <th className="px-5 py-4 eyebrow text-center">Hab. / Baños / m²</th>
                <th className="px-5 py-4 eyebrow">Estado</th>
                <th className="px-5 py-4 eyebrow text-right">Precio</th>
              </tr>
            </thead>
            <tbody>
              {viviendas.map(v => (
                <tr key={v.id} className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 text-white">{v.titulo}</td>
                  <td className="px-5 py-4"><Etiqueta tono="neutro">{legible(v.tipo)}</Etiqueta></td>
                  <td className="px-5 py-4 text-white/60">{v.proyectoNombre}</td>
                  <td className="px-5 py-4 text-center text-white/60 whitespace-nowrap">
                    {v.habitaciones} / {v.banos} / {v.area}
                  </td>
                  <td className="px-5 py-4">
                    <Etiqueta tono={v.disponible ? 'exito' : 'alerta'}>
                      {v.disponible ? 'Disponible' : 'Reservada'}
                    </Etiqueta>
                  </td>
                  <td className="px-5 py-4 text-right text-oro-300 whitespace-nowrap">{precioCOP(v.precio)}</td>
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
