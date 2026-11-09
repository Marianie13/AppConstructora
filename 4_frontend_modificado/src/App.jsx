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

const enlacesPublicos = [
  { to: '/', texto: 'Inicio' },
  { to: '/proyectos', texto: 'Proyectos' },
  { to: '/viviendas', texto: 'Viviendas' },
  { to: '/contacto', texto: 'Contacto' },
];

const enlacesAdmin = [
  { to: '/admin-proyectos', texto: 'Proyectos' },
  { to: '/admin-viviendas', texto: 'Viviendas' },
  { to: '/admin-clientes', texto: 'Clientes' },
];

function Enlace({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        'relative text-[0.76rem] uppercase tracking-[0.17em] transition-colors duration-300 py-1 ' +
        (isActive
          ? 'text-oro-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-oro-400'
          : 'text-white/55 hover:text-white')
      }
    >
      {children}
    </NavLink>
  );
}

export default function App() {
  // Menu de administracion plegable: elemento nuevo respecto a la version base.
  const [adminAbierto, setAdminAbierto] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-carbon-950/85 backdrop-blur-md border-b border-white/[0.07]">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link to="/" className="flex flex-col leading-none group">
              <span className="font-display text-2xl text-white tracking-wide group-hover:text-oro-200 transition-colors duration-300">
                Habita
              </span>
              <span className="text-[0.56rem] uppercase tracking-marca text-oro-400/80 mt-1">
                Constructora
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-9">
              {enlacesPublicos.map(e => (
                <Enlace key={e.to} to={e.to}>{e.texto}</Enlace>
              ))}

              <div className="relative">
                <button
                  onClick={() => setAdminAbierto(v => !v)}
                  className="text-[0.76rem] uppercase tracking-[0.17em] text-white/45 hover:text-oro-300
                             border border-white/10 px-3 py-1.5 transition-colors duration-300"
                >
                  Administración
                </button>
                {adminAbierto && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-carbon-900 border border-white/10 shadow-2xl"
                    onMouseLeave={() => setAdminAbierto(false)}
                  >
                    {enlacesAdmin.map(e => (
                      <NavLink
                        key={e.to}
                        to={e.to}
                        onClick={() => setAdminAbierto(false)}
                        className="block px-4 py-3 text-[0.74rem] uppercase tracking-[0.14em] text-white/60
                                   hover:text-oro-300 hover:bg-white/[0.03] border-b border-white/5 last:border-0
                                   transition-colors duration-200"
                      >
                        {e.texto}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Navegacion compacta para pantallas pequenas */}
            <nav className="flex md:hidden gap-5">
              {enlacesPublicos.map(e => (
                <Enlace key={e.to} to={e.to}>{e.texto.slice(0, 4)}</Enlace>
              ))}
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-14 flex-grow w-full">
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

        <footer className="border-t border-white/[0.07] bg-carbon-900/50">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-3">
              <span className="font-display text-xl text-white">Habita Constructora</span>
              <p className="text-xs text-white/40 leading-relaxed max-w-xs">
                Proyectos inmobiliarios con estándares de alta construcción en Bogotá,
                Medellín y Cali.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Navegación</span>
              {enlacesPublicos.map(e => (
                <Link key={e.to} to={e.to} className="text-xs text-white/45 hover:text-oro-300 transition-colors">
                  {e.texto}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Contacto</span>
              <span className="text-xs text-white/45">Calle 100 #15-20, Bogotá</span>
              <span className="text-xs text-white/45">+57 300 123 4567</span>
              <span className="text-xs text-white/45">info@habita.com.co</span>
            </div>
          </div>
          <div className="regla-oro" />
          <div className="max-w-6xl mx-auto px-6 py-5 text-center">
            <span className="text-[0.64rem] uppercase tracking-[0.2em] text-white/25">
              © 2026 Habita Constructora · Construcción de Software
            </span>
          </div>
        </footer>
      </div>
    </Router>
  );
}
