import { crearSolicitudEntrenador } from '@/repositories/RepositorioSolicitudEntrenador';
import { existeSolicitudPendiente } from '@/repositories/RepositorioSolicitudEntrenador';
import { RepositorioMiembro } from '@/repositories/RepositorioMiembro';
import pool from '@/lib/database'; // ✅ Ruta correcta a tu conexión


import {
    obtenerSolicitudesPendientesPorEntrenador,
    aceptarSolicitudPorId
  } from '@/repositories/RepositorioSolicitudEntrenador';
  
  export async function listarSolicitudesPendientes(entrenadorId: string) {
    return await obtenerSolicitudesPendientesPorEntrenador(entrenadorId);
  }
  
  export async function aceptarSolicitud(solicitudId: number) {
    await aceptarSolicitudPorId(solicitudId);
  }
const repoMiembro = new RepositorioMiembro();

export async function solicitarEntrenador(usuarioId: string, usuarioIdEntrenador: string) {
  const miembro_id = await repoMiembro.obtenerIdMiembroPorUsuarioId(usuarioId);
  if (!miembro_id) throw new Error('Miembro no encontrado');

  const yaExiste = await existeSolicitudPendiente(miembro_id, usuarioIdEntrenador);
  if (yaExiste) throw new Error('Ya tienes una solicitud pendiente con este entrenador');

  // Aquí necesitas convertir usuarioIdEntrenador a id numérico
  const [rows]: any = await pool.query(
    'SELECT id FROM Entrenador WHERE usuarioId = ?',
    [usuarioIdEntrenador]
  );
  if (rows.length === 0) throw new Error('Entrenador no encontrado');
  const entrenador_id = rows[0].id;

  const fecha = new Date();
  await crearSolicitudEntrenador(miembro_id, entrenador_id, fecha);
}
