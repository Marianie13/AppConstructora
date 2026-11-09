import React, { useEffect, useState } from 'react';
import { fetchApi } from './api';
import { Button, Input, Textarea, Select, Aviso } from './ui';

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

  function actualizar(campo, valor) {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  }

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
      setMensajeExito('Recibimos tus datos. Un asesor te contactará muy pronto.');
      setFormData({ nombre: '', telefono: '', correo: '', mensaje: '', proyectoId: proyectoId || '' });
      if (onExito) onExito();
    } catch (err) {
      setError(err.message || 'Error al enviar el formulario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <span className="eyebrow">{necesitaSelector ? 'Formulario' : 'Me interesa'}</span>
        <h3 className="font-display text-2xl text-white font-light">
          {necesitaSelector ? 'Déjanos tus datos' : 'Solicita información'}
        </h3>
        <div className="regla-oro max-w-[5rem]" />
      </div>

      {mensajeExito && <Aviso tipo="exito">{mensajeExito}</Aviso>}
      {error && <Aviso tipo="error">{error}</Aviso>}

      {necesitaSelector && (
        <Select
          label="Proyecto de interés"
          required
          value={formData.proyectoId}
          onChange={e => actualizar('proyectoId', e.target.value)}
        >
          <option value="">Selecciona un proyecto</option>
          {proyectos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} — {p.ciudad}</option>
          ))}
        </Select>
      )}

      <Input
        label="Nombre completo"
        placeholder="Tu nombre"
        required
        value={formData.nombre}
        onChange={e => actualizar('nombre', e.target.value)}
      />
      <Input
        label="Teléfono"
        placeholder="300 123 4567"
        required
        value={formData.telefono}
        onChange={e => actualizar('telefono', e.target.value)}
      />
      <Input
        label="Correo electrónico"
        type="email"
        placeholder="tucorreo@ejemplo.com"
        required
        value={formData.correo}
        onChange={e => actualizar('correo', e.target.value)}
      />
      <Textarea
        label="Mensaje"
        rows="3"
        placeholder="Cuéntanos qué estás buscando..."
        required
        value={formData.mensaje}
        onChange={e => actualizar('mensaje', e.target.value)}
      />

      <Button type="submit" variant="primary" disabled={loading} className="mt-2">
        {loading ? 'Enviando...' : 'Enviar solicitud'}
      </Button>

      <p className="text-[0.64rem] text-white/30 leading-relaxed">
        Al enviar este formulario autorizas el tratamiento de tus datos para fines
        comerciales relacionados con el proyecto seleccionado.
      </p>
    </form>
  );
}
