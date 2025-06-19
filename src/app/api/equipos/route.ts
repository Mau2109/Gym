import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const tipo = searchParams.get("tipo");
  const sucursalId = Number(searchParams.get("sucursalId"));

  if (!tipo || isNaN(sucursalId)) {
    return NextResponse.json(
      { error: "Faltan parámetros 'tipo' o 'sucursalId'" },
      { status: 400 }
    );
  }

  try {
    const [rows] = await pool.query(
      `SELECT * FROM Equipo 
       WHERE nombre = ? 
         AND estado = 'activo' 
         AND idSucursal != ?`,
      [tipo, sucursalId]
    );

    return NextResponse.json({ equipos: rows });
  } catch (error) {
    console.error("Error al buscar equipos:", error);
    return NextResponse.json(
      { error: "Error al consultar equipos" },
      { status: 500 }
    );
  }
}
