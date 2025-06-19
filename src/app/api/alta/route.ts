import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { idEquipo, nuevaSucursal, equipoAnterior } = await req.json();

  try {
    await pool.query("UPDATE Equipo SET idSucursal = ?, estado = 'activo' WHERE idEquipo = ?", [nuevaSucursal, idEquipo]);
    await pool.query("DELETE FROM NotificacionMantenimiento WHERE idEquipo = ?", [equipoAnterior]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al reasignar equipo" }, { status: 500 });
  }
}