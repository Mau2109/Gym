"use client";

import { useState, FormEvent } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';

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
    setFormData(prev => ({ ...prev, [name]: value }));
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

      setMessage({ type: 'success', text: result.message || 'Entrenador registrado con éxito ✅' });
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
      setMessage({ type: 'error', text: error.message || 'Error desconocido' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg border border-indigo-100">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">Registro de Entrenador</h1>
        <p className="text-sm text-gray-600 mb-6">Solo personal autorizado puede acceder a este formulario.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField id="nombreCompleto" label="Nombre Completo" value={formData.nombreCompleto} onChange={handleChange} />
            <InputField id="correoElectronico" label="Correo Electrónico" type="email" value={formData.correoElectronico} onChange={handleChange} />
            <InputField id="telefono" label="Teléfono" value={formData.telefono} onChange={handleChange} />
            <InputField id="fechaNacimiento" label="Fecha de Nacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
            <InputField id="especialidad" label="Especialidad" value={formData.especialidad} onChange={handleChange} />
            <InputField id="experiencia" label="Años de Experiencia" type="number" value={formData.experiencia} onChange={handleChange} />
            <InputField id="contrasena" label="Contraseña Temporal" type="password" value={formData.contrasena} onChange={handleChange} />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md transition-all ${
              isLoading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? 'Registrando...' : 'Registrar Entrenador'}
          </button>

          {message && (
            <div className={`mt-4 flex items-center gap-2 p-3 rounded-md text-sm font-medium ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.type === 'success' ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <XCircleIcon className="h-5 w-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

// Componente tipado
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ id, label, value, onChange, type = "text" }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />
    </div>
  );
}
