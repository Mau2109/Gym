// app/api/equipo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idEquipo = searchParams.get("id");

    if (!idEquipo) {
      return NextResponse.json({ error: "idEquipo es requerido" }, { status: 400 });
    }

    const [rows] = await pool.query(
      "SELECT idEquipo, nombre, estado FROM Equipo WHERE idEquipo = ?",
      [idEquipo]
    );

    const equipo = (rows as any[])[0];

    if (!equipo) {
      return NextResponse.json({ error: "Equipo no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ equipo });
  } catch (error) {
    console.error("Error al obtener equipo:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
