import React, { useEffect, useState } from 'react';
import { fetchApi } from '../api';
import { Seccion, Meta, Button, Esqueleto, Aviso, dosDigitos } from '../ui';

export default function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [porBorrar, setPorBorrar] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  function cargar() {
    return fetchApi('/clientes-interesados').then(setClientes);
  }

  useEffect(() => {
    cargar().catch(err => setError(err.message)).finally(() => setCargando(false));
  }, []);

  // Borra un registro despues de confirmar.
  function eliminar(id) {
    setMensaje(''); setError('');
    fetchApi(`/clientes-interesados/${id}`, { method: 'DELETE' })
      .then(() => { setPorBorrar(null); setMensaje('Cliente eliminado correctamente.'); return cargar(); })
      .catch(err => { setPorBorrar(null); setError(err.message); });
  }

  function formatearFecha(valor) {
    if (!valor) return '—';
    return new Date(valor).toLocaleString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  }

  return (
    <div className="flex flex-col gap-14">
      <Seccion numero="01" rotulo="Gestión" titulo="Clientes interesados"
               descripcion="Solicitudes recibidas desde el sitio público."
               derecha={`${dosDigitos(clientes.length)} registros`} />

      {mensaje && <Aviso tipo="exito">{mensaje}</Aviso>}
      {error && <Aviso tipo="error">{error}</Aviso>}
      {cargando && <div className="flex flex-col gap-3">{[1,2,3].map(i => <Esqueleto key={i} className="h-20 w-full" />)}</div>}

      {!cargando && clientes.length === 0 && !error && (
        <Aviso>Todavía no hay clientes interesados registrados.</Aviso>
      )}

      {/* La tabla solo se dibuja si hay al menos un cliente. */}
      {clientes.length > 0 && (
        <div className="flex flex-col">
          {clientes.map((c, i) => (
            <div key={c.id}
                 className="border-t border-hueso-100/[0.10] py-8
                            grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5 items-start">

              <span className="lg:col-span-1 font-mono text-rotulo text-hueso-500 pt-1">
                {dosDigitos(i + 1)}
              </span>

              <div className="lg:col-span-3 flex flex-col gap-2">
                <span className="text-lg text-hueso-50">{c.nombre}</span>
                <span className="font-mono text-rotulo uppercase text-hueso-400">{c.telefono}</span>
                <span className="font-mono text-rotulo text-hueso-500 lowercase">{c.correo}</span>
              </div>

              <div className="lg:col-span-3 flex flex-col gap-2">
                <span className="rotulo">Proyecto</span>
                <Meta acento>{c.proyectoNombre || '—'}</Meta>
              </div>

              <p className="lg:col-span-3 text-sm leading-relaxed text-hueso-300">
                {c.mensaje || '—'}
              </p>

              <div className="lg:col-span-2 flex flex-col lg:items-end gap-4">
                <span className="rotulo">{formatearFecha(c.fechaRegistro)}</span>
                {porBorrar === c.id ? (
                  <div className="flex gap-3">
                    <Button variant="danger" className="px-4 py-2" onClick={() => eliminar(c.id)}>
                      Confirmar
                    </Button>
                    <Button variant="ghost" className="px-0" onClick={() => setPorBorrar(null)}>
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <Button variant="ghost" className="px-0" onClick={() => setPorBorrar(c.id)}>
                    Eliminar
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className="regla" />
        </div>
      )}
    </div>
  );
}
