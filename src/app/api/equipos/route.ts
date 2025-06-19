import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { idSucursal, idEquipo, proveedorDisponible, equipoReparable } = await req.json();
    console.log("Datos recibidos:", { idSucursal, idEquipo, proveedorDisponible, equipoReparable });

    if (!proveedorDisponible) {
      return NextResponse.json({ estado: "sin_proveedor" });
    }

    if (equipoReparable) {
      // Cambiar estado del equipo a 'reparado'
      const [resultado] = await pool.query(
        "UPDATE Equipo SET estado = 'reparado' WHERE idEquipo = ?",
        [idEquipo]
      );

      console.log("Resultado UPDATE:", resultado);

      // Obtener proveedor asignado a ese equipo
      const [notis] = await pool.query(
        "SELECT idProveedor FROM NotificacionMantenimiento WHERE idEquipo = ? ORDER BY idNotificacion DESC LIMIT 1",
        [idEquipo]
      );
      const proveedor = (notis as any[])[0]?.idProveedor;

      if (proveedor) {
        await pool.query(
          "INSERT INTO HistorialMantenimiento (idEquipo, idProveedor) VALUES (?, ?)",
          [idEquipo, proveedor]
        );
      }

      return NextResponse.json({ estado: "reparado" });
    }

    // Si no es reparable, buscar reemplazo
    const [reemplazos] = await pool.query(
      "SELECT idEquipo FROM Equipo WHERE estado = 'activo' AND idSucursal != ? LIMIT 1",
      [idSucursal]
    );

    if ((reemplazos as any[]).length > 0) {
      const idNuevo = (reemplazos as any[])[0].idEquipo;

      await pool.query(
        "UPDATE Equipo SET idSucursal = ? WHERE idEquipo = ?",
        [idSucursal, idNuevo]
      );

      await pool.query(
        "DELETE FROM Equipo WHERE idEquipo = ?",
        [idEquipo]
      );

      await pool.query(
        "DELETE FROM NotificacionMantenimiento WHERE idEquipo = ?",
        [idEquipo]
      );

      return NextResponse.json({ estado: "reemplazado", idEquipoNuevo: idNuevo });
    }

    return NextResponse.json({ estado: "sin_reemplazo" });
  } catch (error) {
    console.error("❌ Error en el flujo de reemplazo:", error);
    return NextResponse.json({ error: "Error en el flujo de reemplazo" }, { status: 500 });
  }
}
