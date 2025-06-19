// repositories/RepositorioSucursal.ts
import { Sucursal } from "@/models/Sucursal";

export class RepositorioSucursal {
  static consultarEquipoDisponible(): string | null {
    const sucursal = new Sucursal("s1", "Sucursal Norte", ["e3", "e4"]);
    return sucursal.buscarEquipoDisponible();
  }
}
