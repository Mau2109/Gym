// repositories/RepositorioProveedor.ts
import { Proveedor } from "@/models/Proveedor";

export class RepositorioProveedor {
  static obtenerProveedorDisponible(): Proveedor {
    return new Proveedor("p1", "MantenimientoMax", true); // Simulado
  }
}
