'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserSession {
  idUsuario: string;
  nombreCompleto: string;
  rol: 'miembro' | 'administrador' | 'recepcionista' | 'entrenador';
}

// --- Iconos SVG con tamaño y color consistentes ---
const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);
const ClipboardListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);
const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function DashboardPage() {
  const [session, setSession] = useState<UserSession | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('session');
    router.push('/login');
  };

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-indigo-50 to-white">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-5 px-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">Panel Principal</h1>
            <p className="text-indigo-600 mt-1 font-medium">
              Bienvenido, <span className="underline decoration-indigo-400">{session.nombreCompleto}</span> ({session.rol})
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text-white font-semibold py-2 px-5 rounded-md shadow-md transition"
            aria-label="Cerrar sesión"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>
<<<<<<< HEAD
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Opciones para Miembros */}
            {session.rol === 'miembro' && (
              <>
                <NavigationCard href="/inscripciones" icon={<ClipboardListIcon />} title="Inscribirse a Clases" description="Ver clases disponibles y gestionar tus inscripciones." />
                <NavigationCard href="/progreso" icon={<ChartBarIcon />} title="Mi Progreso Físico" description="Registra y visualiza tu evolución y metas." />
                <NavigationCard href="/asistencia" icon={<CheckCircleIcon />} title="Registrar Asistencia" description="Confirma tu asistencia a la clase de hoy." />
                <NavigationCard href="/AsignacionEntrenador" icon={<CheckCircleIcon />} title="Solicitar asignacion entrenador" description="Vizualizar entrenadores disponibles" />
              </>
            )}
=======
>>>>>>> Chris

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Opciones Miembro */}
          {session.rol === 'miembro' && (
            <>
              <NavigationCard
                href="/inscripciones"
                icon={<ClipboardListIcon />}
                title="Inscribirse a Clases"
                description="Ver clases disponibles y gestionar tus inscripciones."
              />
              <NavigationCard
                href="/progreso"
                icon={<ChartBarIcon />}
                title="Mi Progreso Físico"
                description="Registra y visualiza tu evolución y metas."
              />
              <NavigationCard
                href="/asistencia"
                icon={<CheckCircleIcon />}
                title="Registrar Asistencia"
                description="Confirma tu asistencia a la clase de hoy."
              />
              <NavigationCard
                href="/AsignacionEntrenador"
                icon={<CheckCircleIcon />}
                title="Solicitar asignación entrenador"
                description="Visualizar entrenadores disponibles."
              />
            </>
          )}

             {/* Opciones para Administradores */}
            {session.rol === 'administrador' && (
              <>
                 <NavigationCard href="/registro" icon={<UserPlusIcon />} title="Registrar Usuarios" description="Dar de alta a miembros, recepcionistas y entrenadores." />
                 <NavigationCard href="/NotificacionMantenimiento" icon={<CheckCircleIcon/>} title="Notificacion Mantenimiento" description="Informar sobre el equipos dañados." />

                 {/* Aquí se podrían añadir más tarjetas para el administrador en el futuro */}
              </>
            )}

            {/* Opciones Recepcionista */}
            {session.rol === 'recepcionista' && (
              <>
                <NavigationCard
                  href="/registro"
                  icon={<UserPlusIcon />}
                  title="Registrar Nuevo Miembro"
                  description="Dar de alta a nuevos clientes en el sistema."
                />
              </>
            )}

          {/* Opciones Administrador */}
          {session.rol === 'administrador' && (
            <>
              <NavigationCard
                href="/registro"
                icon={<UserPlusIcon />}
                title="Registrar Usuarios"
                description="Dar de alta a miembros, recepcionistas y entrenadores."
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}

const NavigationCard = ({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactElement;
  title: string;
  description: string;
}) => {
  return (
    <Link
      href={href}
      className="group block rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
      tabIndex={0}
      aria-label={`${title} - ${description}`}
    >
      <div className="flex items-center gap-4">
        {icon}
        <h3 className="text-xl font-semibold text-indigo-800 group-hover:text-indigo-600 transition-colors">{title}</h3>
      </div>
      <p className="mt-3 text-gray-600">{description}</p>
    </Link>
  );
};
