import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { idEquipo } = await req.json();

  try {
    // Obtener equipo y proveedor de la notificación
    const [rows] = await pool.query<any[]>(
      `SELECT E.nombre as equipoNombre, E.estado, P.nombre as proveedorNombre
       FROM NotificacionMantenimiento N
       JOIN Equipo E ON N.idEquipo = E.idEquipo
       JOIN Proveedor P ON N.idProveedor = P.idProveedor
       WHERE N.idEquipo = ? ORDER BY N.idNotificacion DESC LIMIT 1`,
      [idEquipo]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Equipo no encontrado" }, { status: 404 });
    }

    const equipo = rows[0];

    // Simular reparación o baja
    const reparable = Math.random() > 0.4; // 60% probabilidad de reparar

    if (reparable) {
      await pool.query(
        "UPDATE Equipo SET estado = 'reparado' WHERE idEquipo = ?",
        [idEquipo]
      );

      return NextResponse.json({
        estado: "reparado",
        equipo: equipo.equipoNombre,
        proveedor: equipo.proveedorNombre,
      });
    } else {
      await pool.query("DELETE FROM Equipo WHERE idEquipo = ?", [idEquipo]);
      return NextResponse.json({
        estado: "baja",
        equipo: equipo.equipoNombre,
        proveedor: equipo.proveedorNombre,
      });
    }
  } catch (err) {
    return NextResponse.json({ error: "Error en la simulación" }, { status: 500 });
  }
}