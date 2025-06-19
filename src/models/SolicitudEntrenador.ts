export interface SolicitudEntrenador {
    id: number;
    idMiembro: number;
    idEntrenador: number;
    fechaSolicitud: Date;
    estado: 'pendiente' | 'aceptada' | 'rechazada';
  }
  