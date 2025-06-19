// models/NotificacionMantenimiento.ts
export class NotificacionMantenimiento {
  constructor(
    public id: string,
    public equipoId: string,
    public estado: "pendiente" | "en_proceso" | "reparado" | "no_reparable",
    public fecha: Date
  ) {}
}
