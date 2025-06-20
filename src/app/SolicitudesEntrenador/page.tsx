'use client';

import { useEffect, useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/solid';

interface Solicitud {
  id: number;
  nombreCompleto: string;
  correoElectronico: string;
  fecha: string;
}

export default function SolicitudesEntrenador() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  const sessionStr = typeof window !== 'undefined' ? localStorage.getItem('session') : null;
  const session = sessionStr ? JSON.parse(sessionStr) : null;
  const idEntrenador = session?.idUsuario ?? '';

  useEffect(() => {
    async function cargarSolicitudes() {
      const res = await fetch('/api/solicitudes-entrenador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idEntrenador }),
      });

      const data = await res.json();
      setSolicitudes(data.solicitudes || []);
      setLoading(false);
    }

    if (idEntrenador) cargarSolicitudes();
  }, [idEntrenador]);

  const aceptar = async (id: number) => {
    const res = await fetch('/api/aceptar-solicitud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ solicitudId: id }),
    });

    const data = await res.json();
    alert(data.mensaje);
    setSolicitudes((prev) => prev.filter((s) => s.id !== id));
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Cargando solicitudes...</p>;

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <header className="flex items-center gap-3 mb-6">
          <UserPlusIcon className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Solicitudes Pendientes</h1>
        </header>

        {solicitudes.length === 0 ? (
          <p className="text-gray-600">No hay solicitudes pendientes por el momento.</p>
        ) : (
          <ul className="space-y-4">
            {solicitudes.map((s) => (
              <li key={s.id} className="border border-gray-200 p-4 rounded-lg bg-indigo-50 shadow-sm">
                <div className="space-y-1">
                  <p><span className="font-semibold text-gray-700">Miembro:</span> {s.nombreCompleto}</p>
                  <p><span className="font-semibold text-gray-700">Correo:</span> {s.correoElectronico}</p>
                  <p><span className="font-semibold text-gray-700">Fecha:</span> {new Date(s.fecha).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => aceptar(s.id)}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-all"
                >
                  ✅ Aceptar Solicitud
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
