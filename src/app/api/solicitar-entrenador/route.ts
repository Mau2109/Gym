import { NextRequest, NextResponse } from 'next/server';
import { solicitarEntrenador } from '@/services/GestorAsignacionEntrenador';

export async function POST(req: NextRequest) {
  try {
    const { idMiembro, idEntrenador } = await req.json();

    if (!idMiembro || !idEntrenador) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    await solicitarEntrenador(idMiembro, idEntrenador);

    return NextResponse.json({ mensaje: 'Solicitud enviada' });
  } catch (error) {
    console.error('Error en solicitar-entrenador:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
