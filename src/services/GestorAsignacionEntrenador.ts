import { crearSolicitudEntrenador } from '@/repositories/RepositorioSolicitudEntrenador';
import { existeSolicitudPendiente2} from '@/repositories/RepositorioSolicitudEntrenador';
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

export async function solicitarEntrenador(usuarioId: string, entrenador_id: number) {
  const miembro_id = await repoMiembro.obtenerIdMiembroPorUsuarioId(usuarioId);
  if (!miembro_id) throw new Error('Miembro no encontrado');

  const yaExiste = await existeSolicitudPendiente2(miembro_id, entrenador_id);
  if (yaExiste) throw new Error('Ya tienes una solicitud pendiente con este entrenador');

  const fecha = new Date();
  await crearSolicitudEntrenador(miembro_id, entrenador_id, fecha);
}
