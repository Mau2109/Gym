import db from '@/lib/database';

export async function crearSolicitudEntrenador(
  miembro_id: string,
  entrenador_id: number,
  fecha: Date,
  estado = 'pendiente'
) {
  console.log(miembro_id,entrenador_id)
  await db.query(
    'INSERT INTO SolicitudEntrenador (miembro_id, entrenador_id, fecha, estado) VALUES (?, ?, ?, ?)',
    [miembro_id, entrenador_id, fecha, estado]
  );
}

/**
 * Verifica si ya existe una solicitud pendiente para ese miembro y entrenador.
 */
export async function existeSolicitudPendiente(miembro_id: string, usuarioIdEntrenador: string): Promise<boolean> {
  const [rows]: any = await db.query(
    `
    SELECT se.id
    FROM SolicitudEntrenador se
    WHERE se.miembro_id = ?
      AND se.entrenador_id = (
        SELECT id FROM Entrenador WHERE usuarioId = ?
      )
      AND se.estado = 'pendiente'
    `,
    [miembro_id, usuarioIdEntrenador]
  );
  return rows.length > 0;
}

export async function existeSolicitudPendiente2(miembro_id: string, entrenador_id: number): Promise<boolean> {
  const [rows]: any = await db.query(
    'SELECT id FROM SolicitudEntrenador WHERE miembro_id = ? AND entrenador_id = ? AND estado = "pendiente"',
    [miembro_id, entrenador_id]
  );
  return rows.length > 0;
}
  export async function obtenerSolicitudesPendientesPorEntrenador(usuarioIdEntrenador: string) {
    const [rows] = await db.query(
      `
      SELECT se.id, se.miembro_id, se.fecha, u.nombreCompleto, u.correoElectronico
      FROM SolicitudEntrenador se
      JOIN Entrenador e ON se.entrenador_id = e.id
      JOIN miembros m ON se.miembro_id = m.id
      JOIN usuarios u ON m.usuarioId = u.idUsuario
      WHERE e.usuarioId = ? AND se.estado = 'pendiente'
      ORDER BY se.fecha DESC
      `,
      [usuarioIdEntrenador]
    );
    return rows;
  }
  
  
  export async function aceptarSolicitudPorId(solicitudId: number) {
    await db.query(
      `UPDATE SolicitudEntrenador SET estado = 'aceptada' WHERE id = ?`,
      [solicitudId]
    );
  }