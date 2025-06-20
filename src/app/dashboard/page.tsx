'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserSession {
  idUsuario: string;
  nombreCompleto: string;
  rol: 'miembro' | 'administrador' | 'recepcionista' | 'entrenador';
}

const iconStyles = "h-10 w-10 text-purple-500 group-hover:text-purple-700 transition-transform duration-300";
const UserPlusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>);
const ClipboardListIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>);
const ChartBarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>);
const CheckCircleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className={iconStyles} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

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
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <p className="text-lg font-semibold animate-pulse">Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-indigo-100">
      <header className="bg-white/60 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-5 px-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-purple-800">Panel Principal</h1>
            <p className="text-purple-600 text-sm mt-1">Bienvenido, <span className="font-semibold">{session.nombreCompleto}</span> ({session.rol})</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {session.rol === 'miembro' && (
            <>
              <NavigationCard href="/inscripciones" icon={<ClipboardListIcon />} title="Inscribirse a Clases" description="Ver clases disponibles y gestionar tus inscripciones." />
              <NavigationCard href="/progreso" icon={<ChartBarIcon />} title="Mi Progreso Físico" description="Registra y visualiza tu evolución y metas." />
              <NavigationCard href="/asistencia" icon={<CheckCircleIcon />} title="Registrar Asistencia" description="Confirma tu asistencia a la clase de hoy." />
              <NavigationCard href="/AsignacionEntrenador" icon={<CheckCircleIcon />} title="Solicitar Entrenador" description="Visualiza entrenadores disponibles y solicita uno." />
            </>
          )}

          {session.rol === 'recepcionista' && (
            <NavigationCard href="/registro" icon={<UserPlusIcon />} title="Registrar Nuevo Miembro" description="Dar de alta a nuevos clientes en el sistema." />
          )}

          {session.rol === 'administrador' && (
            <>
              <NavigationCard href="/registroEntrenador" icon={<UserPlusIcon />} title="Registrar Entrenador" description="Dar de alta a Entrenadores en el sistema" />
              <NavigationCard href="/NotificacionMantenimiento" icon={<CheckCircleIcon />} title="Notificar Mantenimiento" description="Informar sobre equipos dañados o en mal estado." />
            </>
          )}

          {session.rol === 'entrenador' && (
            <>
              <NavigationCard href="/SolicitudesEntrenador" icon={<ChartBarIcon />} title="Solicitudes" description="Gestiona solicitudes y registra el progreso." />
            </>
          )}
        </div>
      </section>
    </main>
  );
}

const NavigationCard = ({ href, icon, title, description }: { href: string, icon: React.ReactElement, title: string, description: string }) => {
  return (
    <Link href={href} className="block bg-white/80 backdrop-blur-sm border border-purple-100 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 p-6 group">
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="ml-4 text-xl font-bold text-purple-800 group-hover:text-purple-700">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
};
