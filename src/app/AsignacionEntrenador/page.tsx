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

  // Obtener el id del usuario autenticado desde localStorage
  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setIdMiembro(parsed.idUsuario); // 👈 Aquí obtienes el id real
      } catch (e) {
        console.error('Error al parsear session de localStorage:', e);
      }
    }
  }, []);

  // Cargar entrenadores
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

  if (loading) return <p>Cargando entrenadores...</p>;
  if (!idMiembro) return <p>No se pudo identificar al usuario. Inicia sesión nuevamente.</p>;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Asignación de Entrenador</h1>
      {entrenadores.length === 0 ? (
        <p>No hay entrenadores disponibles.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {entrenadores.map((entrenador) => (
            <div
              key={entrenador.id}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              }}
            >
              <h2>{entrenador.especialidad}</h2>
              <p>
                Estado:{' '}
                <strong style={{ color: entrenador.disponible ? 'green' : 'red' }}>
                  {entrenador.disponible ? 'Disponible' : 'No disponible'}
                </strong>
              </p>
              {entrenador.disponible && (
                <button
                  onClick={() => solicitar(entrenador.id)}
                  style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2ecc71',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Solicitar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
