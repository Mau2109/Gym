import { Usuario } from "./Usuario";
import { ProgresoFisico} from "../types/models";

export class Entrenador extends Usuario {
  private especialidad: string;

  constructor(
    idUsuario: string,
    nombreCompleto: string,
    correoElectronico: string,
    telefono: string,
    fechaNacimiento: Date,
    contrasena: string,
    especialidad: string
  ) {
    super(idUsuario, nombreCompleto, correoElectronico, telefono, fechaNacimiento, contrasena);
    this.especialidad = especialidad;
  }
  /*
  public consultarAgenda(): Agenda[] {
    console.log(`Consultando agenda para el entrenador ${this.nombreCompleto}.`);
    return [];
  }
*/
  public registrarProgresoMiembro(idMiembro: string, progreso: ProgresoFisico): void {
    console.log(`Registrando progreso físico del miembro ${idMiembro} por el entrenador ${this.nombreCompleto}.`);
  }

  /*
  public enviarQuejaOSugerencia(mensaje: QuejaSugerencia): void {
    console.log(`Entrenador ${this.nombreCompleto} envió una queja o sugerencia: ${mensaje.mensaje}`);
  }
  */
  public getEspecialidad(): string {
    return this.especialidad;
  }

  public getNombreCompleto(): string {
    return this.nombreCompleto;
  }
}
