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
