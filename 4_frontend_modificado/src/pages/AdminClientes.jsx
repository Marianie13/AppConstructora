import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api';
import { TituloSeccion, Etiqueta, Esqueleto, Aviso, Button } from '../ui';

export default function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [porBorrar, setPorBorrar] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  function cargar() {
    return fetchApi('/clientes-interesados').then(data => setClientes(data));
  }

  useEffect(() => {
    cargar()
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  // Borra un registro despues de confirmar con Si.
  function eliminar(id) {
    setMensaje('');
    setError('');
    fetchApi(`/clientes-interesados/${id}`, { method: 'DELETE' })
      .then(() => {
        setPorBorrar(null);
        setMensaje('Cliente eliminado correctamente.');
        return cargar();
      })
      .catch(err => {
        setPorBorrar(null);
        setError(err.message);
      });
  }

  function formatearFecha(valor) {
    if (!valor) return '-';
    return new Date(valor).toLocaleString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <TituloSeccion
          eyebrow="Administración"
          titulo="Clientes interesados"
          descripcion="Solicitudes recibidas desde el sitio público."
        />
        <span className="text-[0.64rem] uppercase tracking-[0.18em] text-white/35">
          {clientes.length} registro(s)
        </span>
      </div>

      {mensaje && <Aviso tipo="exito">{mensaje}</Aviso>}
      {error && <Aviso tipo="error">{error}</Aviso>}
      {cargando && <div className="flex flex-col gap-2">{[1,2,3].map(i => <Esqueleto key={i} className="h-16 w-full" />)}</div>}

      {!cargando && clientes.length === 0 && !error && (
        <Aviso>Todavía no hay clientes interesados registrados.</Aviso>
      )}

      {/* La tabla solo se dibuja si hay al menos un cliente. */}
      {clientes.length > 0 && (
        <div className="border border-white/[0.07] overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[52rem]">
            <thead>
              <tr className="bg-carbon-900/70 border-b border-white/[0.07]">
                <th className="px-5 py-4 eyebrow">Nombre</th>
                <th className="px-5 py-4 eyebrow">Contacto</th>
                <th className="px-5 py-4 eyebrow">Proyecto</th>
                <th className="px-5 py-4 eyebrow">Mensaje</th>
                <th className="px-5 py-4 eyebrow">Registro</th>
                <th className="px-5 py-4 eyebrow text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id} className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 text-white whitespace-nowrap">{cliente.nombre}</td>
                  <td className="px-5 py-4 text-white/60">
                    {cliente.telefono}
                    <br />
                    <span className="text-[0.7rem] text-white/35">{cliente.correo}</span>
                  </td>
                  <td className="px-5 py-4"><Etiqueta tono="neutro">{cliente.proyectoNombre || '-'}</Etiqueta></td>
                  <td className="px-5 py-4 text-white/50 max-w-xs">
                    <span className="line-clamp-2" title={cliente.mensaje}>{cliente.mensaje || '-'}</span>
                  </td>
                  <td className="px-5 py-4 text-white/40 text-[0.72rem] whitespace-nowrap">
                    {formatearFecha(cliente.fechaRegistro)}
                  </td>
                  <td className="px-5 py-4">
                    {porBorrar === cliente.id ? (
                      <div className="flex gap-2 justify-end">
                        <Button variant="danger" className="text-[0.64rem] px-3 py-1.5" onClick={() => eliminar(cliente.id)}>
                          Sí, eliminar
                        </Button>
                        <Button variant="secondary" className="text-[0.64rem] px-3 py-1.5" onClick={() => setPorBorrar(null)}>
                          No
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <Button variant="danger" className="text-[0.64rem] px-3 py-1.5" onClick={() => setPorBorrar(cliente.id)}>
                          Eliminar
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
