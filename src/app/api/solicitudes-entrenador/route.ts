import { NextRequest, NextResponse } from 'next/server';
import { listarSolicitudesPendientes } from '@/services/GestorAsignacionEntrenador';

export async function POST(req: NextRequest) {
  try {
    const { idEntrenador } = await req.json();
    const solicitudes = await listarSolicitudesPendientes(idEntrenador);
    return NextResponse.json({ solicitudes });
  } catch (error) {
    console.error('Error al obtener solicitudes del entrenador:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> Yoos
