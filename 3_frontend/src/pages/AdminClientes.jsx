import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api';
import { Button } from '../ui';

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
        setMensaje('Cliente eliminado.');
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
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes Interesados</h1>
        <span className="text-sm text-slate-500">{clientes.length} registro(s)</span>
      </div>

      {mensaje && <p className="text-sm text-emerald-600 font-semibold">{mensaje}</p>}
      {error && <p className="text-sm text-rose-600 font-semibold">Error: {error}</p>}
      {cargando && <p className="text-slate-500">Cargando clientes interesados...</p>}
      {!cargando && clientes.length === 0 && !error && (
        <p className="text-slate-500">Todavia no hay clientes interesados registrados.</p>
      )}

      {/* La tabla solo se dibuja si hay al menos un cliente. */}
      {clientes.length > 0 && (
        <div className="bg-white rounded-xl border overflow-x-auto shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Contacto</th>
                <th className="p-3">Proyecto</th>
                <th className="p-3">Mensaje</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id} className="border-t hover:bg-slate-50">
                  <td className="p-3 font-semibold">{cliente.nombre}</td>
                  <td className="p-3">
                    {cliente.telefono}
                    <br />
                    <span className="text-slate-500">{cliente.correo}</span>
                  </td>
                  <td className="p-3">{cliente.proyectoNombre || '-'}</td>
                  <td className="p-3 max-w-xs truncate" title={cliente.mensaje}>
                    {cliente.mensaje || '-'}
                  </td>
                  <td className="p-3 whitespace-nowrap">{formatearFecha(cliente.fechaRegistro)}</td>
                  <td className="p-3">
                    {porBorrar === cliente.id ? (
                      <div className="flex gap-2">
                        <Button variant="danger" className="text-xs px-3 py-1" onClick={() => eliminar(cliente.id)}>
                          Si
                        </Button>
                        <Button variant="secondary" className="text-xs px-3 py-1" onClick={() => setPorBorrar(null)}>
                          No
                        </Button>
                      </div>
                    ) : (
                      <Button variant="danger" className="text-xs px-3 py-1" onClick={() => setPorBorrar(cliente.id)}>
                        Eliminar
                      </Button>
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
