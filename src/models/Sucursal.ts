// models/Sucursal.ts
export class Sucursal {
  constructor(
    public id: string,
    public nombre: string,
    public equiposDisponibles: string[]
  ) {}

  public buscarEquipoDisponible(): string | null {
    return this.equiposDisponibles.length > 0
      ? this.equiposDisponibles[0]
      : null;
  }
}
