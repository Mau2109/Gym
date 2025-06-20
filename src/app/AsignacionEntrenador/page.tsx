'use client';

import React, { useEffect, useState } from 'react';

interface Entrenador {
  id: number;
  especialidad: string;
  disponible: boolean;
}

export default function AsignacionEntrenador() {
  const [entrenadores, setEntrenadores] = useState<Entrenador[]>([]);
  const [loading, setLoading] = useState(true);
  const [idMiembro, setIdMiembro] = useState<string | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setIdMiembro(parsed.idUsuario);
      } catch (e) {
        console.error('Error al parsear session de localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchEntrenadores() {
      try {
        const res = await fetch('/api/entrenadores');
        if (!res.ok) throw new Error('Error al cargar entrenadores');
        const data: Entrenador[] = await res.json();
        setEntrenadores(data);
      } catch (error) {
        alert((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchEntrenadores();
  }, []);

  const solicitar = async (idEntrenador: number) => {
    if (!idMiembro) {
      alert('Usuario no autenticado');
      return;
    }
    console.log(idEntrenador,idMiembro)
    try {
      const res = await fetch('/api/solicitar-entrenador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idMiembro, idEntrenador }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        alert(errorData?.error || 'Error al solicitar');
        return;
      }

      const data = await res.json();
      alert(data.mensaje);
    } catch (err) {
      alert('Error de conexión');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <p className="text-lg font-semibold animate-pulse">Cargando entrenadores...</p>
      </main>
    );
  }

  if (!idMiembro) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <p className="text-lg font-semibold">No se pudo identificar al usuario. Inicia sesión nuevamente.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-indigo-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10">
          Asignación de Entrenador
        </h1>

        {entrenadores.length === 0 ? (
          <p className="text-center text-gray-700">No hay entrenadores disponibles.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {entrenadores.map((entrenador) => (
              <div
                key={entrenador.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6"
              >
                <h2 className="text-xl font-bold text-purple-700">{entrenador.especialidad}</h2>
                <p className="mt-2 text-gray-600">
                  Estado:{' '}
                  <span className={`font-semibold ${entrenador.disponible ? 'text-green-600' : 'text-red-500'}`}>
                    {entrenador.disponible ? 'Disponible' : 'No disponible'}
                  </span>
                </p>

                {entrenador.disponible && (
                  <button
                    onClick={() => solicitar(entrenador.id)}
                    className="mt-4 w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 px-4 rounded-lg shadow transition-all"
                  >
                    Solicitar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
