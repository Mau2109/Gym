import pool from '../lib/database';
import { Entrenador } from '../models/Entrenador';
import { v4 as uuidv4 } from 'uuid';

export class RepositorioEntrenador {
  public async crear(datos: any): Promise<Entrenador> {
    const idUsuario = uuidv4();
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Insertar en usuarios
      const sqlUsuario = `
        INSERT INTO usuarios (idUsuario, nombreCompleto, correoElectronico, telefono, fechaNacimiento, contrasena)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await connection.execute(sqlUsuario, [
        idUsuario,
        datos.nombreCompleto,
        datos.correoElectronico,
        datos.telefono || null,
        datos.fechaNacimiento || null,
        datos.contrasena
      ]);

      // Insertar en Entrenador
      const sqlEntrenador = `
        INSERT INTO Entrenador (usuarioId, especialidad, experiencia, disponible)
        VALUES (?, ?, ?, ?)
      `;
      await connection.execute(sqlEntrenador, [
        idUsuario,
        datos.especialidad || '',
        parseInt(datos.experiencia) || 0,
        1
      ]);

      await connection.commit();

      return new Entrenador(
        idUsuario,
        datos.nombreCompleto,
        datos.correoElectronico,
        datos.telefono || '',
        new Date(datos.fechaNacimiento),
        datos.contrasena,
        datos.especialidad
      );

    } catch (error) {
      await connection.rollback();
      console.error('Error al registrar entrenador:', error);
      throw new Error('No se pudo registrar el entrenador.');
    } finally {
      connection.release();
    }
  }

  public async obtenerAlumnosAsignados(idEntrenador: string): Promise<{ idUsuario: string; nombreCompleto: string }[]> {
    const sql = `
      SELECT u.idUsuario, u.nombreCompleto
      FROM SolicitudEntrenador se
      JOIN usuarios u ON se.miembro_id = u.idUsuario
      WHERE se.entrenador_id = ? AND se.estado = 'aprobado'
    `;
    const [rows]: any[] = await pool.execute(sql, [idEntrenador]);
    return rows;
  }
}
