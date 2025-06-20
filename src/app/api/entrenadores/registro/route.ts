import { NextResponse } from 'next/server';
import { GestorEntrenador } from '@/services/GestorEntrenador';

export async function POST(request: Request) {
  try {
    const datos = await request.json();

    if (!datos.nombreCompleto || !datos.correoElectronico || !datos.contrasena) {
      return NextResponse.json({ message: "Faltan campos obligatorios." }, { status: 400 });
    }

    const gestor = new GestorEntrenador();
    const nuevo = await gestor.registrarNuevoEntrenador(datos);

    delete (nuevo as any).contrasena;

    return NextResponse.json(
      { message: "Entrenador registrado exitosamente.", data: nuevo },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message.startsWith("UsuarioExistente:")) {
      return NextResponse.json({ message: error.message.replace("UsuarioExistente: ", "") }, { status: 409 });
    }

    return NextResponse.json({ message: "Error interno del servidor", error: error.message }, { status: 500 });
  }
}