import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Proyectos from './pages/Proyectos';
import Viviendas from './pages/Viviendas';
import DetalleProyecto from './pages/DetalleProyecto';
import Contacto from './pages/Contacto';
import AdminClientes from './pages/AdminClientes';
import AdminProyectos from './pages/AdminProyectos';
import AdminViviendas from './pages/AdminViviendas';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-indigo-600">🏗️ Constructora App</Link>
            <nav className="flex gap-6 text-sm font-semibold text-slate-600">
              <Link to="/" className="hover:text-indigo-600">Inicio</Link>
              <Link to="/proyectos" className="hover:text-indigo-600">Proyectos</Link>
              <Link to="/viviendas" className="hover:text-indigo-600">Viviendas</Link>
              <Link to="/contacto" className="hover:text-indigo-600">Contacto</Link>
              <Link to="/admin-clientes" className="hover:text-indigo-600 text-xs px-2 py-1 bg-slate-100 rounded">Admin Clientes</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
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

        <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm border-t border-slate-800">
          © 2026 Constructora App - Desarrollo de Software
        </footer>
      </div>
    </Router>
  );
}
