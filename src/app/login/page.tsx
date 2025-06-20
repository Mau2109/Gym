'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correoElectronico, contrasena }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión.');
      }

      localStorage.setItem('session', JSON.stringify(data));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-900 px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-purple-100 drop-shadow-md">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="correoElectronico" className="block text-sm font-medium text-purple-200">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correoElectronico"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-purple-100/10 text-white border border-purple-500 rounded-lg placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>
          <div>
            <label htmlFor="contrasena" className="block text-sm font-medium text-purple-200">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-purple-100/10 text-white border border-purple-500 rounded-lg placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              placeholder="********"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm font-semibold">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
