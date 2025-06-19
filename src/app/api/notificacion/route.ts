// app/api/notificacion/route.ts
import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import type { OkPacket } from "mysql2";

export async function POST(req: NextRequest) {
  const {
    idEquipo,
    idProveedor,
    estado = "pendiente",
  } = await req.json();

  try {
    const [result] = await pool.query<OkPacket>(
      `INSERT INTO NotificacionMantenimiento (idEquipo, idProveedor, estado) 
       VALUES (?, ?, ?)`,
      [idEquipo, idProveedor, estado]
    );

    await pool.query(
      "UPDATE Equipo SET estado = 'dañado' WHERE idEquipo = ?",
      [idEquipo]
    );

    return NextResponse.json({ success: true, idNotificacion: result.insertId });
  } catch (error) {
    console.error("❌ Error al crear la notificación:", error);
    return NextResponse.json(
      { error: "Error al crear la notificación" },
      { status: 500 }
    );
  }
}
