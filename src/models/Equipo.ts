// models/Equipo.ts
export class Equipo {
  constructor(
    public id: string,
    public nombre: string,
    public estado: "activo" | "dañado" | "reparado" | "baja",
    public sucursalId: string
  ) {}
}
