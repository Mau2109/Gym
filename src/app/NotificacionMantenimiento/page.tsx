'use client';

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

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export default function NotificacionMantenimientoPage() {
  const equipoId = 1;
  const sucursalActual = 1;

  const [equipo, setEquipo] = useState<Equipo | null>(null);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [equipoReparable, setEquipoReparable] = useState<boolean | null>(null);
  const [proveedorAsignado, setProveedorAsignado] = useState(false);
  const [reemplazos, setReemplazos] = useState<Equipo[]>([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<number | null>(null);
  const [solicitudSucursal, setSolicitudSucursal] = useState(false);
  const [refrescarEquipo, setRefrescarEquipo] = useState(true);
  const [equipoDadoDeAlta, setEquipoDadoDeAlta] = useState(false);

  const cargarEquipo = async () => {
    try {
      const res = await fetch(`/api/equipo?id=${equipoId}`);
      const data = await res.json();
      setEquipo(data.equipo);
    } catch {
      setMensaje("❌ Error al cargar el equipo");
    }
  };

  useEffect(() => {
    cargarEquipo();

    fetch("/api/proveedores")
      .then((res) => res.json())
      .then((data) => setProveedores(data.proveedores))
      .catch(() => setMensaje("❌ Error al cargar proveedores"));

    if (refrescarEquipo) {
      const intervalo = setInterval(() => {
        cargarEquipo();
      }, 10000);
      return () => clearInterval(intervalo);
    }
  }, [refrescarEquipo]);

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
      setMensaje("✅ Proveedor asignado. Indica si el equipo es reparable.");
      setRefrescarEquipo(false);
    } else {
      setMensaje("❌ Error al asignar proveedor.");
    }
  };

  const manejarSimulacion = async (esReparable: boolean) => {
    if (esReparable) {
      const res = await fetch("/api/notificacion-reparacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idEquipo: equipoId,
          mensaje: `🛠️ Equipo enviado a reparación el ${new Date().toLocaleDateString()}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMensaje("✅ El equipo fue enviado a reparación.");
        setEquipoReparable(true);
        setRefrescarEquipo(false);
        cargarEquipo();
      } else {
        setMensaje("❌ Error al enviar a reparación.");
      }
      return;
    }
    try {
      const res = await fetch(`/api/equipos?tipo=${encodeURIComponent(equipo?.nombre ?? "")}&sucursalId=${sucursalActual}`);
      const data = await res.json();
      if (data.equipos.length > 0) {
        setReemplazos(data.equipos);
        setMensaje("🔍 Equipos disponibles en otras sucursales:");
      } else {
        setMensaje("❌ Equipo no reparable y no hay reemplazo disponible. Puedes solicitar a otra sucursal.");
        setSolicitudSucursal(true);
        setEquipo(null);
        setRefrescarEquipo(false);
      }
    } catch {
      setMensaje("❌ Error al buscar reemplazos.");
    }
  };

  const manejarReemplazo = async () => {
    if (!equipoSeleccionado) return;
    await fetch("/api/notificacion-reparacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idEquipo: equipoId,
        mensaje: `🔁 Equipo reemplazado con el equipo #${equipoSeleccionado} desde otra sucursal.`,
      }),
    });
    setMensaje(`🔁 Equipo reemplazado con el equipo #${equipoSeleccionado}`);
    setEquipo(null);
    setRefrescarEquipo(false);
  };

  const manejarSolicitudOtraSucursal = async () => {
    setMensaje("⏳ Verificando disponibilidad en otras sucursales...");
    setTimeout(async () => {
      await fetch("/api/notificacion-reparacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idEquipo: equipoId,
          mensaje: `📦 Equipo recibido y dado de alta desde otra sucursal el ${new Date().toLocaleDateString()}`,
        }),
      });
      setMensaje("✅ Se ha recibido y dado de alta el equipo desde otra sucursal.");
      setSolicitudSucursal(false);
      setEquipo(null);
      setEquipoDadoDeAlta(true);
      setRefrescarEquipo(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6 max-w-3xl mx-auto font-sans">
      <header className="flex items-center space-x-3 mb-6">
        <BellIcon />
        <h1 className="text-3xl font-bold text-purple-800">Notificación de Mantenimiento</h1>
      </header>

      <section className="bg-white rounded-xl shadow-xl p-6 space-y-6 border border-purple-100">
        <p className="text-gray-700 text-lg">
          Se ha recibido una notificación de daño en el equipo con ID:{" "}
          <strong className="text-purple-600">{equipoId}</strong>
        </p>

        {/* Asignar proveedor */}
        {!proveedorAsignado && !solicitudSucursal && !equipoDadoDeAlta && (
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Seleccionar proveedor:</label>
            <select
              value={proveedorSeleccionado ?? ""}
              onChange={(e) => setProveedorSeleccionado(Number(e.target.value))}
              className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">-- Selecciona un proveedor --</option>
              {proveedores.map((prov) => (
                <option key={prov.idProveedor} value={prov.idProveedor}>{prov.nombre}</option>
              ))}
            </select>
            <button
              onClick={manejarAsignacionProveedor}
              disabled={!proveedorSeleccionado}
              className={`mt-4 w-full py-2 rounded-lg font-semibold text-white transition-all ${
                proveedorSeleccionado ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-300 cursor-not-allowed"
              }`}
            >
              Asignar Proveedor
            </button>
          </div>
        )}

        {/* Reparable o no */}
        {proveedorAsignado && equipoReparable === null && !solicitudSucursal && !equipoDadoDeAlta && (
          <div className="flex gap-4 justify-center">
            <button onClick={() => manejarSimulacion(true)} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow">
              ✅ Reparar equipo
            </button>
            <button onClick={() => manejarSimulacion(false)} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold shadow">
              ❌ No reparable
            </button>
          </div>
        )}

        {/* Reemplazos */}
        {reemplazos.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-purple-700 mb-2">Reemplazos disponibles:</h2>
            <select
              value={equipoSeleccionado ?? ""}
              onChange={(e) => setEquipoSeleccionado(Number(e.target.value))}
              className="w-full border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-3"
            >
              <option value="">-- Selecciona un equipo --</option>
              {reemplazos.map(eq => (
                <option key={eq.idEquipo} value={eq.idEquipo}>#{eq.idEquipo} - {eq.nombre}</option>
              ))}
            </select>
            <button
              onClick={manejarReemplazo}
              disabled={!equipoSeleccionado}
              className={`w-full py-2 rounded-lg font-semibold text-white ${
                equipoSeleccionado ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300 cursor-not-allowed"
              }`}
            >
              Confirmar Reemplazo
            </button>
          </div>
        )}

        {/* Solicitar a otra sucursal */}
        {solicitudSucursal && !equipoDadoDeAlta && (
          <button
            onClick={manejarSolicitudOtraSucursal}
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow"
          >
            🚚 Solicitar a otra sucursal
          </button>
        )}

        {/* Tabla de equipo */}
        {equipo && equipoReparable !== true && !equipoDadoDeAlta && (
          <table className="w-full border text-left mt-6 border-gray-200">
            <thead className="bg-purple-100 text-purple-800">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">¿Reparado?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-purple-50 transition-colors">
                <td className="px-4 py-2">{equipo.idEquipo}</td>
                <td className="px-4 py-2">{equipo.nombre}</td>
                <td className="px-4 py-2">{equipo.estado}</td>
                <td className="px-4 py-2">{equipoReparable === null ? "-" : equipoReparable ? "Sí" : "No"}</td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Mensaje final */}
        {mensaje && (
          <p className="mt-4 p-4 bg-purple-100 text-purple-800 rounded-lg shadow-inner text-sm font-medium">{mensaje}</p>
        )}
      </section>
    </main>
  );
}
