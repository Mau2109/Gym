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

  const idMiembro = '36029953-8455-485c-be59-404a2911af88'; // simulado

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

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Asignación de Entrenador</h1>

      {loading ? (
        <p style={styles.loading}>⏳ Cargando entrenadores...</p>
      ) : entrenadores.length === 0 ? (
        <p style={styles.empty}>No hay entrenadores disponibles.</p>
      ) : (
        <div style={styles.grid}>
          {entrenadores.map((entrenador) => (
            <div key={entrenador.id} style={styles.card}>
              <h2 style={styles.specialty}>{entrenador.especialidad}</h2>
              <p style={styles.status}>
                Estado:{' '}
                <span
                  style={{
                    color: entrenador.disponible ? '#27ae60' : '#c0392b',
                    fontWeight: 'bold',
                  }}
                >
                  {entrenador.disponible ? 'Disponible' : 'No disponible'}
                </span>
              </p>
              {entrenador.disponible && (
                <button style={styles.button} onClick={() => solicitar(entrenador.id)}>
                  Solicitar Entrenador
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '1000px',
    margin: 'auto',
    padding: '2rem',
    fontFamily: '"Segoe UI", sans-serif',
    color: '#2c3e50',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  loading: {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#888',
  },
  empty: {
    fontSize: '1.1rem',
    textAlign: 'center',
    color: '#999',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out',
  },
  specialty: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
  },
  status: {
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
};
