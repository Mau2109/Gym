import { crearSolicitudEntrenador } from '@/repositories/RepositorioSolicitudEntrenador';

export async function solicitarEntrenador(miembro_id: string, entrenador_id: number) {
  const fecha = new Date();
  await crearSolicitudEntrenador(miembro_id, entrenador_id, fecha);
}
