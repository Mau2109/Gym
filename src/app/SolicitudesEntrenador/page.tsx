'use client';

import { useEffect, useState } from 'react';

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
  console.log(idEntrenador)
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

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Solicitudes Pendientes</h1>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes.</p>
      ) : (
        <ul className="space-y-4">
          {solicitudes.map((s) => (
            <li key={s.id} className="border p-4 rounded shadow">
              <p><strong>Miembro:</strong> {s.nombreCompleto}</p>
              <p><strong>Correo:</strong> {s.correoElectronico}</p>
              <p><strong>Fecha:</strong> {new Date(s.fecha).toLocaleString()}</p>
              <button
                onClick={() => aceptar(s.id)}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Aceptar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}