import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM Proveedor WHERE disponible = true");
    return NextResponse.json({ proveedores: rows });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener proveedores" }, { status: 500 });
  }
}