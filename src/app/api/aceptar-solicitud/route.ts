import { NextRequest, NextResponse } from 'next/server';
import { aceptarSolicitud } from '@/services/GestorAsignacionEntrenador';

export async function POST(req: NextRequest) {
  try {
    const { solicitudId } = await req.json();
    await aceptarSolicitud(solicitudId);
    return NextResponse.json({ mensaje: 'Solicitud aceptada' });
  } catch (error) {
    console.error('Error al aceptar solicitud:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> Yoos
