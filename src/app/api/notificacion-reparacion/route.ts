import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export async function POST(req: NextRequest) {
  try {
    const { idEquipo, mensaje } = await req.json();

    // Validación básica
    if (!idEquipo || !mensaje) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    // Insertar notificación con la fecha actual (NOW())
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO Notificacion (idEquipo, mensaje, fecha) VALUES (?, ?, NOW())`,
      [idEquipo, mensaje]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error: any) {
    console.error("❌ Error al insertar notificación:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
