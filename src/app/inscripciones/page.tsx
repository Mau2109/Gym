'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Clase {
  idClase: string;
  nombre: string;
  descripcion: string;
  horario: string;
  cupoMaximo: number;
  inscritos: number;
}

interface UserSession {
  idUsuario: string;
  nombreCompleto: string;
  rol: 'miembro' | 'administrador' | 'recepcionista';
}

export default function InscripcionClasesPage() {
  const [clases, setClases] = useState<Clase[]>([]);
  const [clasesSeleccionadas, setClasesSeleccionadas] = useState<Set<string>>(new Set());
  const [session, setSession] = useState<UserSession | null>(null);
  const [message, setMessage] = useState<{ type: string, text: string, data?: any } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      setSession(parsedSession);
    } else {
      router.push('/login');
    }

    async function fetchClases() {
      try {
        const response = await fetch('/api/inscripciones');
        if (!response.ok) throw new Error('No se pudieron cargar las clases.');
        const data = await response.json();
        setClases(data);
      } catch (error: any) {
        setMessage({ type: 'error', text: error.message });
      }
    }

    fetchClases();
  }, [router]);

  const handleCheckboxChange = (idClase: string) => {
    setClasesSeleccionadas(prev => {
      const newSet = new Set(prev);
      newSet.has(idClase) ? newSet.delete(idClase) : newSet.add(idClase);
      return newSet;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return;

    if (clasesSeleccionadas.size === 0) {
      setMessage({ type: 'error', text: 'Por favor, selecciona al menos una clase.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/inscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ miembroId: session.idUsuario, idsClases: Array.from(clasesSeleccionadas) }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: result.message, data: result.data });
      } else {
        setMessage({ type: 'success', text: result.message, data: result.data });
        setClasesSeleccionadas(new Set());
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ocurrió un error inesperado.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <p className="text-lg font-semibold animate-pulse">Redirigiendo al login...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-purple-800">Inscripción a Clases</h1>
            <p className="text-purple-600">Bienvenido, {session.nombreCompleto} ({session.rol})</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('session');
              router.push('/login');
            }}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
          >
            Cerrar Sesión
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {clases.map(clase => (
              <div
                key={clase.idClase}
                className={`p-5 rounded-xl border transition-all shadow-sm ${
                  clasesSeleccionadas.has(clase.idClase)
                    ? 'bg-purple-100 border-purple-400'
                    : 'bg-white border-gray-200'
                }`}
              >
                <label htmlFor={clase.idClase} className="flex flex-col gap-2 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <input
                      type="checkbox"
                      id={clase.idClase}
                      checked={clasesSeleccionadas.has(clase.idClase)}
                      onChange={() => handleCheckboxChange(clase.idClase)}
                      className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        clase.inscritos >= clase.cupoMaximo
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {clase.inscritos} / {clase.cupoMaximo}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-purple-800">{clase.nombre}</h2>
                    <p className="text-gray-600 text-sm">{clase.descripcion}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      <strong>Horario:</strong> {clase.horario}
                    </p>
                    <p className="text-sm mt-1">
                      {clase.inscritos >= clase.cupoMaximo ? (
                        <span className="text-red-600 font-medium">Llena</span>
                      ) : (
                        <span className="text-green-600 font-medium">Disponible</span>
                      )}
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || session.rol !== 'miembro'}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold shadow disabled:bg-gray-400"
          >
            {session.rol !== 'miembro'
              ? 'Solo los miembros pueden inscribirse'
              : isLoading
              ? 'Procesando...'
              : `Inscribirse a ${clasesSeleccionadas.size} ${clasesSeleccionadas.size === 1 ? 'Clase' : 'Clases'}`}
          </button>

          {message && (
            <div
              className={`p-4 rounded-md text-sm ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              <p className="font-bold">{message.text}</p>
              {message.data?.exitosas?.length > 0 && (
                <p className="mt-2">Éxito en: {message.data.exitosas.join(', ')}</p>
              )}
              {message.data?.fallidas?.length > 0 && (
                <div className="mt-2">
                  <p>Fallos:</p>
                  <ul className="list-disc list-inside">
                    {message.data.fallidas.map((f: any) => (
                      <li key={f.idClase}>
                        {f.idClase}: {f.error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-5 py-2 rounded-lg shadow"
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
