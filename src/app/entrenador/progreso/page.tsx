"use client";

import { useState, useEffect, FormEvent } from 'react';

interface Alumno {
  idUsuario: string;
  nombreCompleto: string;
}

interface ProgresoData {
  peso?: string;
  pecho?: string;
  cintura?: string;
  brazos?: string;
  porcentajeGrasa?: string;
  observaciones?: string;
}

export default function ProgresoEntrenadorPage() {
  const [session, setSession] = useState<any>(null);
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<string>('');
  const [formData, setFormData] = useState<ProgresoData>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('session');
    if (stored) {
      const s = JSON.parse(stored);
      setSession(s);
      cargarAlumnos(s.idUsuario);
    }
  }, []);

  const cargarAlumnos = async (entrenadorId: string) => {
    try {
      const res = await fetch(`/api/entrenadores/${entrenadorId}/alumnos`);
      const data = await res.json();
      setAlumnos(data);
    } catch (err) {
      console.error('Error al cargar alumnos:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!alumnoSeleccionado) return alert('Selecciona un alumno');

    try {
      const response = await fetch(`/api/miembros/${alumnoSeleccionado}/progreso`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          peso: parseFloat(formData.peso || ''),
          porcentajeGrasa: parseFloat(formData.porcentajeGrasa || ''),
          observaciones: formData.observaciones,
          medidasCorporales: {
            pecho: parseFloat(formData.pecho || ''),
            cintura: parseFloat(formData.cintura || ''),
            brazos: parseFloat(formData.brazos || '')
          }
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setMessage('Progreso guardado correctamente');
      setFormData({});
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Registrar Progreso de Alumno</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block font-medium">Selecciona un Alumno:</label>
          <select name="alumno" onChange={e => setAlumnoSeleccionado(e.target.value)} value={alumnoSeleccionado} className="w-full p-2 border rounded">
            <option value="">-- Selecciona --</option>
            {alumnos.map(a => (
              <option key={a.idUsuario} value={a.idUsuario}>{a.nombreCompleto}</option>
            ))}
          </select>
        </div>

        {/* Campos de progreso */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" step="0.1" name="peso" value={formData.peso || ''} onChange={handleChange} placeholder="Peso (kg)" className="p-2 border rounded" />
          <input type="number" step="0.1" name="porcentajeGrasa" value={formData.porcentajeGrasa || ''} onChange={handleChange} placeholder="% Grasa" className="p-2 border rounded" />
          <input type="number" step="0.1" name="pecho" value={formData.pecho || ''} onChange={handleChange} placeholder="Pecho (cm)" className="p-2 border rounded" />
          <input type="number" step="0.1" name="cintura" value={formData.cintura || ''} onChange={handleChange} placeholder="Cintura (cm)" className="p-2 border rounded" />
          <input type="number" step="0.1" name="brazos" value={formData.brazos || ''} onChange={handleChange} placeholder="Brazos (cm)" className="p-2 border rounded" />
        </div>

        <textarea name="observaciones" value={formData.observaciones || ''} onChange={handleChange} placeholder="Observaciones..." className="w-full p-2 border rounded" />

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Guardar Progreso</button>
        {message && <p className="text-sm mt-2 text-green-600">{message}</p>}
      </form>
    </main>
  );
}
