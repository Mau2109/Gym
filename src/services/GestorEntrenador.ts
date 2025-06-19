import { RepositorioUsuario } from '../repositories/RepositorioUsuario';
import { RepositorioEntrenador } from '@/repositories/RepositorioEntrenador';
import { Entrenador } from '../models/Entrenador';

export class GestorEntrenador {
  private repoUsuario = new RepositorioUsuario();
  private repoEntrenador = new RepositorioEntrenador();

  public async registrarNuevoEntrenador(datos: any): Promise<Entrenador> {
    const yaExiste = await this.repoUsuario.verificarUnicidad(datos.correoElectronico);
    if (yaExiste) {
      throw new Error("UsuarioExistente: El correo electrónico ya está registrado.");
    }

    try {
      const nuevo = await this.repoEntrenador.crear(datos);
      console.log(`Entrenador ${nuevo.getNombreCompleto()} registrado.`);
      return nuevo;
    } catch (err) {
      console.error("Error al registrar entrenador:", err);
      throw err;
    }
  }
 
  
}