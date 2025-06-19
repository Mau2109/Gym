"use client";

import { useState, FormEvent } from 'react';

export default function RegistroEntrenadorPage() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    telefono: '',
    fechaNacimiento: '',
    contrasena: '',
    especialidad: '',
    experiencia: '',
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/entrenadores/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Error del servidor');

      setMessage({ type: 'success', text: result.message });
      setFormData({
        nombreCompleto: '',
        correoElectronico: '',
        telefono: '',
        fechaNacimiento: '',
        contrasena: '',
        especialidad: '',
        experiencia: '',
      });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Registro de Entrenador</h1>
        <p className="text-gray-600 mb-6">Formulario exclusivo para personal autorizado.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField id="nombreCompleto" label="Nombre Completo" value={formData.nombreCompleto} onChange={handleChange} />
                <InputField id="correoElectronico" label="Correo Electrónico" type="email" value={formData.correoElectronico} onChange={handleChange} />
                <InputField id="telefono" label="Teléfono" value={formData.telefono} onChange={handleChange} />
                <InputField id="fechaNacimiento" label="Fecha de Nacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
                <InputField id="especialidad" label="Especialidad" value={formData.especialidad} onChange={handleChange} />
                <InputField id="experiencia" label="Años de Experiencia" type="number" value={formData.experiencia} onChange={handleChange} />
                <InputField id="contrasena" label="Contraseña" type="password" value={formData.contrasena} onChange={handleChange} />
            </div>


          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md disabled:bg-indigo-300"
          >
            {isLoading ? 'Registrando...' : 'Registrar Entrenador'}
          </button>

          {message && (
            <div className={`p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

function InputField({ id, label, value, onChange, type = "text" }: any) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
    );
  }
  