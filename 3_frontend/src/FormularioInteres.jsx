import React, { useEffect, useState } from 'react';
import { fetchApi } from './api';
import { Button, Input, Select } from './ui';

export function FormularioInteres({ proyectoId, onExito }) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    mensaje: '',
    proyectoId: proyectoId || '',
  });
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');

  // Si el formulario no viene amarrado a un proyecto (pagina Contacto),
  // cargamos la lista para que el usuario elija uno. El backend exige
  // siempre un proyectoId.
  const necesitaSelector = !proyectoId;

  useEffect(() => {
    if (!necesitaSelector) return;
    fetchApi('/proyectos')
      .then(data => setProyectos(data))
      .catch(err => setError(err.message));
  }, [necesitaSelector]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMensajeExito('');

    try {
      await fetchApi('/clientes-interesados', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          proyectoId: Number(formData.proyectoId),
        }),
      });
      setMensajeExito('¡Gracias! Tu información fue enviada con éxito.');
      setFormData({ nombre: '', telefono: '', correo: '', mensaje: '', proyectoId: proyectoId || '' });
      if (onExito) onExito();
    } catch (err) {
      setError(err.message || 'Error al enviar el formulario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800">
        {necesitaSelector ? 'Déjanos tus datos' : '¿Te interesa este proyecto?'}
      </h3>
      {mensajeExito && <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-sm">{mensajeExito}</div>}
      {error && <div className="p-3 bg-rose-100 text-rose-800 rounded-lg text-sm">{error}</div>}

      {necesitaSelector && (
        <Select
          label="Proyecto de interés"
          required
          value={formData.proyectoId}
          onChange={(e) => setFormData({ ...formData, proyectoId: e.target.value })}
        >
          <option value="">Selecciona un proyecto</option>
          {proyectos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} - {p.ciudad}</option>
          ))}
        </Select>
      )}

      <Input
        label="Nombre Completo"
        required
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
      />
      <Input
        label="Teléfono"
        required
        value={formData.telefono}
        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
      />
      <Input
        label="Correo Electrónico"
        type="email"
        required
        value={formData.correo}
        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-slate-700">Mensaje</label>
        <textarea
          rows="3"
          required
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          value={formData.mensaje}
          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
        ></textarea>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Solicitar Información'}
      </Button>
    </form>
  );
}
