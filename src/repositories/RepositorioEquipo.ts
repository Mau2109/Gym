// repositories/RepositorioEquipo.ts
import { Equipo } from "@/models/Equipo";

const equipos: Equipo[] = [
  new Equipo("e1", "Bicicleta", "activo", "s1"),
  new Equipo("e2", "Caminadora", "activo", "s1"),
];

export class RepositorioEquipo {
  static buscarPorId(id: string): Equipo | undefined {
    return equipos.find((e) => e.id === id);
  }

  static actualizarEstado(id: string, nuevoEstado: Equipo["estado"]) {
    const equipo = this.buscarPorId(id);
    if (equipo) equipo.estado = nuevoEstado;
  }

  static eliminarEquipo(id: string) {
    const index = equipos.findIndex((e) => e.id === id);
    if (index !== -1) equipos.splice(index, 1);
  }
}
