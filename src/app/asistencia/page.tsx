'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Clase {
  idClase: string;
  nombre: string;
  horario: string;
}

interface UserSession {
  idUsuario: string;
  nombreCompleto: string;
  rol: 'miembro' | 'administrador' | 'recepcionista';
}

export default function AsistenciaPage() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [clases, setClases] = useState<Clase[]>([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState('');
  const [message, setMessage] = useState<{ type: string, text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    } else {
      router.push('/login');
    }

    async function fetchClases() {
      const response = await fetch('/api/inscripciones');
      const data = await response.json();
      setClases(data);
      if (data.length > 0) {
        setClaseSeleccionada(data[0].idClase);
      }
    }
    fetchClases();
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session || !claseSeleccionada) return;
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/asistencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ miembroId: session.idUsuario, claseId: claseSeleccionada }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setMessage({ type: 'success', text: `¡Hola ${session.nombreCompleto}! Asistencia registrada con éxito.` });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-indigo-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-purple-800 mb-2">Control de Asistencia</h1>
        <p className="text-purple-600 mb-6">Bienvenido, {session.nombreCompleto}. Selecciona tu clase para registrar tu asistencia.</p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label htmlFor="clase" className="block text-sm font-semibold text-purple-800 mb-1">
              Clase de Hoy
            </label>
            <select
              id="clase"
              value={claseSeleccionada}
              onChange={(e) => setClaseSeleccionada(e.target.value)}
              className="block w-full px-3 py-3 bg-purple-100 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {clases.map(c => (
                <option key={c.idClase} value={c.idClase}>
                  {c.nombre} ({c.horario})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading || !claseSeleccionada}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-semibold shadow disabled:bg-gray-400"
          >
            {isLoading ? 'Registrando...' : 'Confirmar Asistencia'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-md text-lg font-semibold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {message.text}
          </div>
        )}

        <button
          onClick={() => router.push('/dashboard')}
          className="mt-6 inline-block bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-5 py-2 rounded-lg shadow"
        >
          ← Volver al Dashboard
        </button>
      </div>
    </main>
  );
}
