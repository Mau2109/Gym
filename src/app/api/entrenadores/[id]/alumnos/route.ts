import { NextResponse } from 'next/server';
import { GestorEntrenador } from '@/services/GestorEntrenador';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const idEntrenador = params.id;

  try {
    const gestor = new GestorEntrenador();
    const alumnos = await gestor.obtenerAlumnosAsignados(idEntrenador);
    return NextResponse.json(alumnos);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener los alumnos' }, { status: 500 });
  }
}
