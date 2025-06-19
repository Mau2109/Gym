import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootpass",
  database: "Gimnasio",
  port: 3306,
});

export async function POST(req: NextRequest) {
  try {
    const { idEquipo, nuevaSucursal } = await req.json();

    if (!idEquipo || !nuevaSucursal) {
      return NextResponse.json({ success: false, message: "Faltan parámetros" }, { status: 400 });
    }

    // ✅ Registrar el cambio de sucursal del equipo
    const [updateResult] = await pool.query(
      `UPDATE Equipo SET idSucursal = ?, estado = 'activo' WHERE idEquipo = ?`,
      [nuevaSucursal, idEquipo]
    );

    // ✅ Registrar una notificación de alta
    const mensaje = `📦 Equipo #${idEquipo} dado de alta en la sucursal #${nuevaSucursal} el ${new Date().toISOString().slice(0, 10)}`;
    await pool.query(
      `INSERT INTO Notificacion (idEquipo, mensaje, fecha) VALUES (?, ?, NOW())`,
      [idEquipo, mensaje]
    );

    return NextResponse.json({ success: true, message: "Equipo dado de alta en la nueva sucursal" });
  } catch (error) {
    console.error("Error al dar de alta equipo:", error);
    return NextResponse.json({ success: false, error: "Error al registrar equipo" }, { status: 500 });
  }
}