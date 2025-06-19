import db from '@/lib/database';

export async function crearSolicitudEntrenador(
  miembro_id: string,
  entrenador_id: number,
  fecha: Date,
  estado = 'pendiente'
) {
  await db.query(
    'INSERT INTO SolicitudEntrenador (miembro_id, entrenador_id, fecha, estado) VALUES (?, ?, ?, ?)',
    [miembro_id, entrenador_id, fecha, estado]
  );
}

/**
 * Verifica si ya existe una solicitud pendiente para ese miembro y entrenador.
 */
export async function existeSolicitudPendiente(miembro_id: string, entrenador_id: number): Promise<boolean> {
    const [rows]: any = await db.query(
      'SELECT id FROM SolicitudEntrenador WHERE miembro_id = ? AND entrenador_id = ? AND estado = "pendiente"',
      [miembro_id, entrenador_id]
    );
    return rows.length > 0;
  }

  export async function obtenerSolicitudesPendientesPorEntrenador(entrenador_id: string) {
    const [rows] = await db.query(
      `
      SELECT se.id, se.miembro_id, se.fecha, u.nombreCompleto, u.correoElectronico
      FROM SolicitudEntrenador se
      JOIN miembros m ON se.miembro_id = m.id
      JOIN usuarios u ON m.usuarioId = u.idUsuario
      WHERE se.entrenador_id = ? AND se.estado = 'pendiente'
      ORDER BY se.fecha DESC
      `,
      [entrenador_id]
    );
    return rows;
  }
  
  export async function aceptarSolicitudPorId(solicitudId: number) {
    await db.query(
      `UPDATE SolicitudEntrenador SET estado = 'aceptada' WHERE id = ?`,
      [solicitudId]
    );
  }