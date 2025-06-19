"use client";

import { useEffect, useState } from "react";

interface Equipo {
  idEquipo: number;
  nombre: string;
  estado: string;
}

interface Proveedor {
  idProveedor: number;
  nombre: string;
}

export default function NotificacionMantenimientoPage() {
  const equipoId = 1;
  const sucursalActual = 1;

  const [equipo, setEquipo] = useState<Equipo | null>(null);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [equipoReparable, setEquipoReparable] = useState<boolean | null>(null);
  const [proveedorAsignado, setProveedorAsignado] = useState(false);

  // Función para recargar el equipo desde el backend
  const cargarEquipo = async () => {
    try {
      const res = await fetch(`/api/equipo?id=${equipoId}`);
      if (!res.ok) {
        setMensaje("❌ Error al cargar el equipo");
        return;
      }
      const data = await res.json();
      setEquipo(data.equipo);
    } catch (error) {
      setMensaje("❌ Error al cargar el equipo");
    }
  };

  useEffect(() => {
    cargarEquipo();

    // Cargar proveedores
    fetch("/api/proveedores")
      .then(res => res.json())
      .then(data => setProveedores(data.proveedores))
      .catch(() => setMensaje("❌ Error al cargar proveedores"));

    // Refrescar equipo cada 10 segundos
    const intervalo = setInterval(() => {
      cargarEquipo();
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  const manejarAsignacionProveedor = async () => {
    if (!proveedorSeleccionado) return;

    const res = await fetch("/api/notificacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idEquipo: equipoId,
        idMiembro: 1,
        idAdmin: 1,
        idProveedor: proveedorSeleccionado,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setProveedorAsignado(true);
      setMensaje("✅ Proveedor asignado correctamente. Indica si el equipo es reparable.");
    } else {
      setMensaje("❌ Error al asignar proveedor.");
    }
  };

  const manejarSimulacion = async (esReparable: boolean) => {
    const res = await fetch("/api/equipos/reemplazo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idSucursal: sucursalActual,
        idEquipo: equipoId,
        proveedorDisponible: true,
        equipoReparable: esReparable,
      }),
    });

    const data = await res.json();

    if (data.estado === "reparado") {
      setMensaje("✅ El equipo fue reparado y está listo en funcionamiento.");
      setEquipo(null); // Ocultar tabla
      setEquipoReparable(true);
      setProveedorAsignado(false);
    } else if (data.estado === "reemplazado") {
      setMensaje(`🔁 Equipo no reparable. Se trajo el equipo #${data.idEquipoNuevo} desde otra sucursal.`);
      setEquipo(null);
      setEquipoReparable(false);
    } else if (data.estado === "sin_reemplazo") {
      setMensaje("❌ Equipo no reparable y no hay reemplazo disponible.");
      setEquipoReparable(false);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔔 Notificación Recibida</h1>
      <p className="mb-4">
        Se ha recibido una notificación de daño en el equipo con ID:{" "}
        <strong>{equipoId}</strong>
      </p>

      {!proveedorAsignado && (
        <>
          <label className="block mb-2 text-sm">Seleccionar proveedor para reparación:</label>
          <select
            value={proveedorSeleccionado ?? ""}
            onChange={(e) => setProveedorSeleccionado(Number(e.target.value))}
            className="w-full p-2 border mb-4 rounded"
          >
            <option value="">-- Seleccionar proveedor --</option>
            {proveedores.map((prov) => (
              <option key={prov.idProveedor} value={prov.idProveedor}>
                {prov.nombre}
              </option>
            ))}
          </select>

          <button
            onClick={manejarAsignacionProveedor}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Asignar Proveedor
          </button>
        </>
      )}

      {/* Si proveedor asignado pero equipo reparado, solo mensaje */}
      {proveedorAsignado && equipoReparable === true && (
        <p className="mt-4 text-lg text-green-700 font-semibold">
          ✅ El equipo fue reparado y está listo en funcionamiento.
        </p>
      )}

      {/* Si proveedor asignado y equipo no reparado (mostrar botones) */}
      {proveedorAsignado && equipo && equipoReparable !== true && (
        <div className="my-4 space-x-4">
          <p className="mb-2 font-medium">¿El equipo puede repararse?</p>
          <button
            onClick={() => manejarSimulacion(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ✅ Reparar equipo
          </button>
          <button
            onClick={() => manejarSimulacion(false)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            ❌ No reparable
          </button>
        </div>
      )}

      {/* Tabla solo si equipo existe y no reparado aún */}
      {equipo && equipoReparable !== true && (
        <table className="mt-6 w-full table-auto border border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Reparado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">{equipo.idEquipo}</td>
              <td className="border px-4 py-2">{equipo.nombre}</td>
              <td className="border px-4 py-2">{equipo.estado}</td>
              <td className="border px-4 py-2">
                {equipoReparable === null ? "-" : equipoReparable ? "Sí" : "No"}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Mensaje general */}
      {mensaje && !(proveedorAsignado && equipoReparable === true) && (
        <p className="mt-4 text-lg text-blue-700">{mensaje}</p>
      )}
    </main>
  );
}
