import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Proyectos from './pages/Proyectos';
import Viviendas from './pages/Viviendas';
import DetalleProyecto from './pages/DetalleProyecto';
import Contacto from './pages/Contacto';
import AdminClientes from './pages/AdminClientes';
import AdminProyectos from './pages/AdminProyectos';
import AdminViviendas from './pages/AdminViviendas';

const publicos = [
  { to: '/',          texto: 'Inicio' },
  { to: '/proyectos', texto: 'Proyectos' },
  { to: '/viviendas', texto: 'Viviendas' },
  { to: '/contacto',  texto: 'Contacto' },
];

const admin = [
  { to: '/admin-proyectos', texto: 'Proyectos' },
  { to: '/admin-viviendas', texto: 'Viviendas' },
  { to: '/admin-clientes',  texto: 'Clientes' },
];

function Enlace({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        'font-mono text-rotulo uppercase transition-colors duration-300 ' +
        (isActive ? 'text-terracota-400' : 'text-tinta-600 hover:text-tinta-900')
      }
    >
      {children}
    </NavLink>
  );
}

export default function App() {
  const [abierto, setAbierto] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">

        <header className="sticky top-0 z-50 bg-papel-100/90 backdrop-blur-sm border-b border-tinta-800/[0.10]">
          <div className="max-w-contenido mx-auto px-6 lg:px-10 h-[4.5rem] flex items-center justify-between gap-8">
            {/* La marca: tipografía apretada, sin logo ni emoji. */}
            <Link to="/" className="flex items-baseline gap-3 group shrink-0">
              <span className="text-2xl font-display font-semibold tracking-[-0.04em] text-tinta-900
                               group-hover:text-terracota-300 transition-colors duration-300">
                Habita
              </span>
              <span className="hidden sm:block rotulo">Constructora</span>
            </Link>

            <nav className="hidden md:flex items-center gap-9">
              {publicos.map(e => <Enlace key={e.to} to={e.to}>{e.texto}</Enlace>)}

              <div className="relative pl-9 border-l border-tinta-800/[0.10]">
                <button
                  onClick={() => setAbierto(v => !v)}
                  className="font-mono text-rotulo uppercase text-tinta-500 hover:text-terracota-300
                             transition-colors duration-300 flex items-center gap-2"
                >
                  Gestión
                  <span className={`transition-transform duration-300 ${abierto ? 'rotate-45' : ''}`}>+</span>
                </button>
                {abierto && (
                  <div
                    className="absolute right-0 top-9 w-52 bg-papel-200 border border-tinta-800/[0.10]"
                    onMouseLeave={() => setAbierto(false)}
                  >
                    {admin.map((e, i) => (
                      <NavLink
                        key={e.to}
                        to={e.to}
                        onClick={() => setAbierto(false)}
                        className="flex items-center gap-4 px-5 py-4 font-mono text-rotulo uppercase
                                   text-tinta-600 hover:text-terracota-300 hover:bg-tinta-800/[0.03]
                                   border-b border-tinta-800/[0.07] last:border-0 transition-colors duration-200"
                      >
                        <span className="text-tinta-400">0{i + 1}</span>
                        {e.texto}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <nav className="flex md:hidden gap-5">
              {publicos.map(e => <Enlace key={e.to} to={e.to}>{e.texto.slice(0, 3)}</Enlace>)}
            </nav>
          </div>
        </header>

        <main className="max-w-contenido mx-auto px-6 lg:px-10 w-full flex-grow py-16 lg:py-24">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/viviendas" element={<Viviendas />} />
            <Route path="/detalle-proyecto/:id" element={<DetalleProyecto />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin-clientes" element={<AdminClientes />} />
            <Route path="/admin-proyectos" element={<AdminProyectos />} />
            <Route path="/admin-viviendas" element={<AdminViviendas />} />
          </Routes>
        </main>

        <footer className="border-t border-tinta-800/[0.10] mt-10">
          <div className="max-w-contenido mx-auto px-6 lg:px-10 py-16
                          grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
            <div className="md:col-span-5">
              <span className="text-3xl font-display font-semibold tracking-[-0.04em] text-tinta-900">
                Habita
              </span>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-tinta-500">
                Proyectos residenciales en Bogotá, Medellín y Cali. Arquitectura,
                luz y detalle a favor de quien los habita.
              </p>
            </div>

            <div className="md:col-span-3 flex flex-col gap-4">
              <span className="rotulo">Navegación</span>
              <div className="flex flex-col gap-3">
                {publicos.map(e => (
                  <Link key={e.to} to={e.to}
                        className="text-sm text-tinta-600 hover:text-terracota-300 transition-colors w-max">
                    {e.texto}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-4">
              <span className="rotulo">Sala de ventas</span>
              <div className="flex flex-col gap-3 text-sm text-tinta-600">
                <span>Calle 100 #15-20, Bogotá</span>
                <span className="font-mono">+57 300 123 4567</span>
                <span className="font-mono">info@habita.com.co</span>
              </div>
            </div>
          </div>

          <div className="max-w-contenido mx-auto px-6 lg:px-10 pb-10">
            <div className="regla pt-6 flex flex-wrap justify-between gap-4">
              <span className="rotulo">© 2026 Habita Constructora</span>
              <span className="rotulo">Construcción de Software</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
