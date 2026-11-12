import React from 'react';
import { FormularioInteres } from '../FormularioInteres';
import { Seccion } from '../ui';

const datos = [
  { etiqueta: 'Sala de ventas', valor: 'Calle 100 #15-20, Bogotá' },
  { etiqueta: 'Teléfono',       valor: '+57 300 123 4567', mono: true },
  { etiqueta: 'Correo',         valor: 'info@habita.com.co', mono: true },
  { etiqueta: 'Horario',        valor: 'Lunes a sábado · 9:00 — 18:00' },
];

export default function Contacto() {
  return (
    <div className="flex flex-col gap-16">
      <Seccion
        numero="01"
        rotulo="Contacto"
        titulo="Agenda tu asesoría"
        descripcion="Déjanos tus datos y un asesor te contacta en menos de 24 horas hábiles."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16">
        <div className="lg:col-span-5 flex flex-col">
          {datos.map(d => (
            <div key={d.etiqueta}
                 className="border-t border-hueso-100/[0.10] py-6 flex items-baseline justify-between gap-6">
              <span className="rotulo">{d.etiqueta}</span>
              <span className={`text-sm text-right text-hueso-100 ${d.mono ? 'font-mono' : ''}`}>
                {d.valor}
              </span>
            </div>
          ))}
          <div className="regla" />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <FormularioInteres />
        </div>
      </div>
    </div>
  );
}
