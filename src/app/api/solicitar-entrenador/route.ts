import { NextRequest, NextResponse } from 'next/server';
import { solicitarEntrenador } from '@/services/GestorAsignacionEntrenador';

export async function POST(req: NextRequest) {
    try {
      const { idMiembro: usuarioId, idEntrenador } = await req.json();
  
      if (!usuarioId || !idEntrenador) {
        return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
      }
  
      await solicitarEntrenador(usuarioId, idEntrenador);
  
      return NextResponse.json({ mensaje: 'Solicitud enviada' });
    } catch (error: any) {
      console.error('Error en solicitar-entrenador:', error);
      return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
    }
  }
<<<<<<< HEAD
  
=======
  
>>>>>>> Yoos
