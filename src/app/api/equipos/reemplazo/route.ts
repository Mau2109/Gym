import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { idSucursal } = await req.json();

  try {
    const [rows] = await pool.query(
      "SELECT idEquipo FROM Equipo WHERE estado = 'activo' AND idSucursal != ? LIMIT 1",
      [idSucursal]
    );
    if ((rows as any[]).length > 0) {
      return NextResponse.json({ equipoIdDisponible: (rows as any[])[0].idEquipo });
    } else {
      return NextResponse.json({ equipoIdDisponible: null });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error al buscar equipo alternativo" }, { status: 500 });
  }
}
