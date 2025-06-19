// /app/api/equipo/baja/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { idEquipo } = await req.json();

    await pool.query("UPDATE Equipo SET estado = 'baja_definitiva' WHERE idEquipo = ?", [idEquipo]);

    return NextResponse.json({ success: true, mensaje: "✅ Equipo dado de baja definitiva." });
  } catch (error) {
    console.error("Error al dar de baja el equipo:", error);
    return NextResponse.json({ success: false, error: "❌ Error al dar de baja el equipo." }, { status: 500 });
  }
}