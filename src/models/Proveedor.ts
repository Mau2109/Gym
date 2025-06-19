// models/Proveedor.ts
export class Proveedor {
  constructor(
    public id: string,
    public nombre: string,
    public disponible: boolean
  ) {}

  public agendarVisita(): boolean {
    return this.disponible;
  }
}
