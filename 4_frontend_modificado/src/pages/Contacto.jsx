import React from 'react';
import { FormularioInteres } from '../FormularioInteres';
import { TituloSeccion } from '../ui';

export default function Contacto() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
      <div className="flex flex-col gap-8">
        <TituloSeccion
          eyebrow="Hablemos"
          titulo="Agenda tu asesoría"
          descripcion="Déjanos tus datos y un asesor te contacta en menos de 24 horas hábiles para
                       resolver tus dudas sobre cualquiera de nuestros proyectos."
        />

        {/* --- Datos de contacto (elemento nuevo) --- */}
        <div className="flex flex-col divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {[
            { etiqueta: 'Sala de ventas', valor: 'Calle 100 #15-20, Bogotá' },
            { etiqueta: 'Teléfono', valor: '+57 300 123 4567' },
            { etiqueta: 'Correo', valor: 'info@habita.com.co' },
            { etiqueta: 'Horario', valor: 'Lunes a sábado · 9:00 a 18:00' },
          ].map(d => (
            <div key={d.etiqueta} className="py-5 flex items-baseline justify-between gap-6">
              <span className="eyebrow">{d.etiqueta}</span>
              <span className="text-sm text-white/70 text-right">{d.valor}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-white/[0.07] bg-carbon-900/40 p-8 md:p-10">
        <FormularioInteres />
      </div>
    </div>
  );
}
