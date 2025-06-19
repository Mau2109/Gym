-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db:3306
-- Tiempo de generación: 19-06-2025 a las 11:47:22
-- Versión del servidor: 8.0.36
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Gimnasio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` varchar(36) NOT NULL,
  `puesto` varchar(100) DEFAULT 'Admin General',
  `usuarioId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `puesto`, `usuarioId`) VALUES
('admin-role-001', 'Admin General', 'admin-001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `idAsistencia` varchar(36) NOT NULL,
  `fechaHora` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `miembroId` varchar(36) NOT NULL,
  `claseId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`idAsistencia`, `fechaHora`, `miembroId`, `claseId`) VALUES
('426aca9a-23d9-4252-aaf0-e5bb210d96f2', '2025-06-15 01:24:48', '7c2de2ee-5c4a-492f-ac65-6b6329c816ff', 'clase-04'),
('f1dc85a6-b032-40f0-8101-7b417e4551e5', '2025-06-18 16:46:28', 'ec0ca549-660c-4c09-b700-669531fff982', 'clase-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `idClase` varchar(36) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `horario` varchar(100) DEFAULT NULL,
  `cupoMaximo` int NOT NULL,
  `inscritos` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`idClase`, `nombre`, `descripcion`, `horario`, `cupoMaximo`, `inscritos`) VALUES
('clase-01', 'Yoga Matutino', 'Una sesión revitalizante de yoga para empezar el día con energía.', 'Lunes y Miércoles - 7:00 AM', 20, 20),
('clase-02', 'Spinning Avanzado', 'Un reto de alta intensidad para ciclistas experimentados.', 'Martes y Jueves - 6:00 PM', 15, 15),
('clase-03', 'Boxeo Funcional', 'Combina técnicas de boxeo con entrenamiento funcional.', 'Viernes - 5:00 PM', 25, 12),
('clase-04', 'Pilates', 'Fortalece tu core y mejora tu flexibilidad.', 'Sábados - 10:00 AM', 18, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Entrenador`
--

CREATE TABLE `Entrenador` (
  `id` int NOT NULL,
  `usuarioId` varchar(36) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT '1',
  `experiencia` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Entrenador`
--

INSERT INTO `Entrenador` (`id`, `usuarioId`, `especialidad`, `disponible`, `experiencia`) VALUES
(6, '7c2de2ee-5c4a-492f-ac65-6b6329c816ff', 'Entrenamiento Funcional', 1, 5),
(7, 'f11ee24b-53de-401d-81e7-df831147c208', 'Pilates', 1, 3),
(8, 'recep-001', 'Yoga', 1, 4),
(9, 'admin-001', 'Musculacin', 1, 7),
(10, '00000000-0000-0000-0000-000000000001', 'Crossfit', 1, 2),
(11, '5da47e40-39e4-4c5c-9302-c74da925847b', 'Box', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Equipo`
--

CREATE TABLE `Equipo` (
  `idEquipo` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `estado` enum('activo','dañado','reparado','baja') DEFAULT 'activo',
  `idSucursal` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Equipo`
--

INSERT INTO `Equipo` (`idEquipo`, `nombre`, `estado`, `idSucursal`) VALUES
(1, 'Bicicleta Estática', 'dañado', 1),
(2, 'Caminadora', 'activo', 1),
(3, 'Polea-Remo', 'dañado', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `HistorialMantenimiento`
--

CREATE TABLE `HistorialMantenimiento` (
  `idHistorial` int NOT NULL,
  `idEquipo` int NOT NULL,
  `idProveedor` int NOT NULL,
  `fechaReparacion` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `idInscripcion` varchar(36) NOT NULL,
  `fechaInscripcion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `miembroId` varchar(36) NOT NULL,
  `claseId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`idInscripcion`, `fechaInscripcion`, `miembroId`, `claseId`) VALUES
('0c36b0db-2ad4-4873-815b-e2bd4f6fc2a6', '2025-06-15 00:47:08', 'f11ee24b-53de-401d-81e7-df831147c208', 'clase-01'),
('25a0a9a7-f29a-4218-afd6-933988e7edeb', '2025-06-15 01:07:50', '7c2de2ee-5c4a-492f-ac65-6b6329c816ff', 'clase-03'),
('39f73a73-2632-4f30-96ec-323cf80943fc', '2025-06-15 00:47:12', 'f11ee24b-53de-401d-81e7-df831147c208', 'clase-03'),
('8c87c4c6-3c4c-45b3-b463-f9b5d2fb77f5', '2025-06-15 00:42:22', '7c2de2ee-5c4a-492f-ac65-6b6329c816ff', 'clase-04'),
('af51004e-736b-4e70-b219-41e3271ded71', '2025-06-15 00:45:24', '7c2de2ee-5c4a-492f-ac65-6b6329c816ff', 'clase-01'),
('b66a1c35-263b-418f-a108-58fae02069a8', '2025-06-15 00:47:05', 'f11ee24b-53de-401d-81e7-df831147c208', 'clase-04'),
('ea7b1e60-46c2-43a6-8f1e-7c0fe25bf76b', '2025-06-18 16:43:07', 'ec0ca549-660c-4c09-b700-669531fff982', 'clase-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `miembros`
--

CREATE TABLE `miembros` (
  `id` varchar(36) NOT NULL,
  `idMembresia` varchar(50) NOT NULL,
  `tipoMembresia` varchar(50) NOT NULL,
  `estadoMembresia` varchar(50) NOT NULL,
  `fechaInscripcion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarioId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `miembros`
--

INSERT INTO `miembros` (`id`, `idMembresia`, `tipoMembresia`, `estadoMembresia`, `fechaInscripcion`, `usuarioId`) VALUES
('36029953-8455-485c-be59-404a2911af88', 'memb_584b11f8', 'Básica', 'Activ', '2025-06-15 05:57:11', '7c2de2ee-5c4a-492f-ac65-6b6329c816ff'),
('62d7a2e8-f449-4651-862e-b4374a1806cd', 'memb_9de4fe44', 'Premium', 'Activa', '2025-06-19 07:55:23', 'f9c8424a-24e6-4378-bab4-4f2ec65a00c0'),
('7866be77-79cc-4a15-806f-96bf12d1332c', 'memb_4826deec', 'Básica', 'Activa', '2025-06-15 06:07:20', 'f11ee24b-53de-401d-81e7-df831147c208'),
('e0ed90de-5017-4b08-b45e-d4fbd8f1fba3', 'memb_eb2951f6', 'Básica', 'Activa', '2025-06-18 21:01:23', 'ec0ca549-660c-4c09-b700-669531fff982');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Notificacion`
--

CREATE TABLE `Notificacion` (
  `idNotificacion` int NOT NULL,
  `idEquipo` int NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Notificacion`
--

INSERT INTO `Notificacion` (`idNotificacion`, `idEquipo`, `mensaje`, `fecha`) VALUES
(1, 1, '🛠️ Equipo enviado a reparación el 2025-06-19', '2025-06-19 06:51:37'),
(2, 1, '🛠️ Equipo enviado a reparación el 2025-06-19', '2025-06-19 06:54:38'),
(3, 1, '🛠️ Equipo enviado a reparación el 2025-06-19', '2025-06-19 07:02:41'),
(4, 1, '🛑 Equipo dado de baja definitiva. No hay reemplazo disponible.', '2025-06-19 07:08:35'),
(5, 1, '🛠️ Equipo enviado a reparación el 2025-06-19', '2025-06-19 07:15:43'),
(6, 1, '🛑 Equipo dado de baja definitiva. No hay reemplazo disponible.', '2025-06-19 07:16:10'),
(7, 1, '🛠️ Equipo enviado a reparación el 19/6/2025', '2025-06-19 07:16:19'),
(8, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 07:20:26'),
(9, 1, '🛠️ Equipo enviado a reparación el 19/6/2025', '2025-06-19 07:24:22'),
(10, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 07:24:46'),
(11, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 07:27:08'),
(12, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 07:29:28'),
(13, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 07:35:07'),
(14, 1, '🛠️ Equipo enviado a reparación el 19/6/2025', '2025-06-19 07:35:16'),
(15, 1, '🛠️ Equipo enviado a reparación el 19/6/2025', '2025-06-19 07:40:55'),
(16, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 07:41:08'),
(17, 1, '🛠️ Equipo enviado a reparación el 19/6/2025', '2025-06-19 07:41:19'),
(18, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 07:45:03'),
(19, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 07:47:11'),
(20, 1, '🛠️ Equipo enviado a reparación el 19/6/2025', '2025-06-19 07:51:17'),
(21, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 07:51:29'),
(22, 1, '🛠️ Equipo enviado a reparación el 19/6/2025', '2025-06-19 07:53:08'),
(23, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 07:53:29'),
(24, 1, '🛠️ Equipo enviado a reparación el 19/6/2025', '2025-06-19 08:50:25'),
(25, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 08:50:38'),
(26, 1, '🛠️ Equipo enviado a reparación el 19/6/2025', '2025-06-19 11:40:33'),
(27, 1, '📦 Equipo recibido y dado de alta desde otra sucursal el 19/6/2025', '2025-06-19 11:43:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `NotificacionMantenimiento`
--

CREATE TABLE `NotificacionMantenimiento` (
  `idNotificacion` int NOT NULL,
  `idEquipo` int DEFAULT NULL,
  `idProveedor` int DEFAULT NULL,
  `fechaReporte` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('pendiente','en_proceso','reparado','no_reparable') DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `NotificacionMantenimiento`
--

INSERT INTO `NotificacionMantenimiento` (`idNotificacion`, `idEquipo`, `idProveedor`, `fechaReporte`, `estado`) VALUES
(1, 3, 1, '2025-06-19 01:01:46', 'pendiente'),
(2, 1, 1, '2025-06-19 01:35:58', 'pendiente'),
(3, 1, 1, '2025-06-19 01:38:29', 'pendiente'),
(4, 1, 1, '2025-06-19 01:38:39', 'pendiente'),
(5, 1, 1, '2025-06-19 01:39:31', 'pendiente'),
(6, 1, 1, '2025-06-19 01:39:39', 'pendiente'),
(7, 1, 1, '2025-06-19 01:39:50', 'pendiente'),
(8, 1, 1, '2025-06-19 01:40:41', 'pendiente'),
(9, 1, 1, '2025-06-19 03:47:53', 'pendiente'),
(10, 1, 1, '2025-06-19 04:01:54', 'pendiente'),
(11, 1, 1, '2025-06-19 04:01:56', 'pendiente'),
(12, 1, 1, '2025-06-19 04:01:57', 'pendiente'),
(13, 1, 1, '2025-06-19 04:01:58', 'pendiente'),
(14, 1, 1, '2025-06-19 04:01:59', 'pendiente'),
(15, 1, 1, '2025-06-19 04:07:04', 'pendiente'),
(16, 1, 1, '2025-06-19 04:44:47', 'pendiente'),
(17, 1, 1, '2025-06-19 04:44:56', 'pendiente'),
(18, 1, 1, '2025-06-19 04:45:02', 'pendiente'),
(19, 1, 1, '2025-06-19 04:45:27', 'pendiente'),
(20, 1, 1, '2025-06-19 04:45:38', 'pendiente'),
(21, 2, 1, '2025-06-19 04:47:34', 'pendiente'),
(22, 1, 2, '2025-06-19 04:59:50', 'pendiente'),
(23, 1, 1, '2025-06-19 05:06:39', 'pendiente'),
(24, 1, 1, '2025-06-19 05:10:53', 'pendiente'),
(25, 1, 2, '2025-06-19 05:11:28', 'pendiente'),
(26, 1, 1, '2025-06-19 05:15:53', 'pendiente'),
(27, 1, 1, '2025-06-19 05:16:25', 'pendiente'),
(28, 1, 1, '2025-06-19 05:17:42', 'pendiente'),
(29, 1, 1, '2025-06-19 05:23:56', 'pendiente'),
(30, 1, 1, '2025-06-19 05:24:31', 'pendiente'),
(31, 1, 1, '2025-06-19 05:26:27', 'pendiente'),
(32, 1, 1, '2025-06-19 05:31:33', 'pendiente'),
(33, 1, 1, '2025-06-19 05:33:30', 'pendiente'),
(34, 1, 1, '2025-06-19 11:37:47', 'pendiente'),
(35, 1, 1, '2025-06-19 11:40:29', 'pendiente'),
(36, 1, 2, '2025-06-19 11:40:46', 'pendiente'),
(37, 1, 1, '2025-06-19 11:43:32', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progresos_fisicos`
--

CREATE TABLE `progresos_fisicos` (
  `idProgreso` varchar(36) NOT NULL,
  `fechaRegistro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `peso` decimal(5,2) DEFAULT NULL,
  `medidasCorporales` text,
  `porcentajeGrasa` decimal(4,2) DEFAULT NULL,
  `observaciones` text,
  `miembroId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `progresos_fisicos`
--

INSERT INTO `progresos_fisicos` (`idProgreso`, `fechaRegistro`, `peso`, `medidasCorporales`, `porcentajeGrasa`, `observaciones`, `miembroId`) VALUES
('1e478c2d-fed9-403a-85f0-d7318aa38319', '2025-06-15 01:11:58', 53.00, '{\"pecho\":56,\"cintura\":40,\"brazos\":35}', 3.00, 'flacow\n', '7c2de2ee-5c4a-492f-ac65-6b6329c816ff'),
('b3fa7853-2453-43a3-82c1-724a39ba004b', '2025-06-15 01:36:14', 24.00, '{\"pecho\":2,\"cintura\":2,\"brazos\":2}', 2.00, 'flaquisimo pa\n', '7c2de2ee-5c4a-492f-ac65-6b6329c816ff'),
('e78134a1-6e2e-41fc-ab1e-6eb321636628', '2025-06-18 16:47:17', 75.00, '{\"pecho\":65,\"cintura\":55,\"brazos\":43}', 12.00, 'ijole te falta', 'ec0ca549-660c-4c09-b700-669531fff982');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Proveedor`
--

CREATE TABLE `Proveedor` (
  `idProveedor` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Proveedor`
--

INSERT INTO `Proveedor` (`idProveedor`, `nombre`, `disponible`) VALUES
(1, 'MantenimientoMax', 1),
(2, 'TechFitness', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recepcionistas`
--

CREATE TABLE `recepcionistas` (
  `id` varchar(36) NOT NULL,
  `idSucursalAsignada` varchar(50) NOT NULL,
  `turno` enum('Mañana','Tarde','Noche') DEFAULT NULL,
  `usuarioId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `recepcionistas`
--

INSERT INTO `recepcionistas` (`id`, `idSucursalAsignada`, `turno`, `usuarioId`) VALUES
('role-recep-001', 'SUCURSAL_01', 'Mañana', 'recep-001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SolicitudEntrenador`
--

CREATE TABLE `SolicitudEntrenador` (
  `id` int NOT NULL,
  `miembro_id` varchar(36) NOT NULL,
  `entrenador_id` int NOT NULL,
  `estado` varchar(50) DEFAULT 'pendiente',
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `SolicitudEntrenador`
--

INSERT INTO `SolicitudEntrenador` (`id`, `miembro_id`, `entrenador_id`, `estado`, `fecha`) VALUES
(5, '36029953-8455-485c-be59-404a2911af88', 6, 'pendiente', '2025-06-18 22:32:38'),
(6, '36029953-8455-485c-be59-404a2911af88', 7, 'pendiente', '2025-06-18 22:32:49'),
(7, '36029953-8455-485c-be59-404a2911af88', 6, 'pendiente', '2025-06-18 22:57:38'),
(8, '36029953-8455-485c-be59-404a2911af88', 8, 'pendiente', '2025-06-18 22:57:41'),
(9, '36029953-8455-485c-be59-404a2911af88', 6, 'pendiente', '2025-06-18 23:02:50'),
(10, '36029953-8455-485c-be59-404a2911af88', 10, 'pendiente', '2025-06-18 23:02:53'),
(11, '36029953-8455-485c-be59-404a2911af88', 8, 'pendiente', '2025-06-19 00:22:05'),
(12, '36029953-8455-485c-be59-404a2911af88', 8, 'pendiente', '2025-06-19 00:22:23'),
(13, '36029953-8455-485c-be59-404a2911af88', 9, 'pendiente', '2025-06-19 00:22:32'),
(14, '36029953-8455-485c-be59-404a2911af88', 6, 'pendiente', '2025-06-19 01:55:46'),
(15, '36029953-8455-485c-be59-404a2911af88', 7, 'pendiente', '2025-06-19 01:55:49'),
(16, '36029953-8455-485c-be59-404a2911af88', 8, 'pendiente', '2025-06-19 01:55:52'),
(17, '36029953-8455-485c-be59-404a2911af88', 9, 'pendiente', '2025-06-19 01:55:54'),
(18, '36029953-8455-485c-be59-404a2911af88', 10, 'pendiente', '2025-06-19 01:55:56'),
(19, '36029953-8455-485c-be59-404a2911af88', 11, 'pendiente', '2025-06-19 01:56:00'),
(20, '62d7a2e8-f449-4651-862e-b4374a1806cd', 6, 'pendiente', '2025-06-19 03:00:35'),
(21, '62d7a2e8-f449-4651-862e-b4374a1806cd', 11, 'aceptada', '2025-06-19 03:04:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Sucursal`
--

CREATE TABLE `Sucursal` (
  `idSucursal` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Sucursal`
--

INSERT INTO `Sucursal` (`idSucursal`, `nombre`, `direccion`) VALUES
(1, 'Sucursal Norte', 'Av. 1 #123'),
(2, 'Sucursal Sur', 'Calle 2 #456');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` varchar(36) NOT NULL,
  `nombreCompleto` varchar(255) NOT NULL,
  `correoElectronico` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL,
  `fechaRegistro` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreCompleto`, `correoElectronico`, `telefono`, `fechaNacimiento`, `contrasena`, `fechaRegistro`) VALUES
('5da47e40-39e4-4c5c-9302-c74da925847b', 'Pancho Pantera ', 'panteraDinamita@gym.com', '182726254242', '1998-10-13', '12345', '2025-06-19 07:27:10'),
('7c2de2ee-5c4a-492f-ac65-6b6329c816ff', 'Isai Paz Ortiz', 'isai@gmail.com', '9532757827', '2004-10-17', 'Hola513513a@', '2025-06-15 05:57:11'),
('admin-001', 'Admin Principal', 'admin@gym.com', '5551234567', '1990-01-01', 'admin123', '2025-06-15 06:30:45'),
('ec0ca549-660c-4c09-b700-669531fff982', 'Usuario1', 'usuario@gmail.com', '953 111 1111', '2025-06-17', 'usuario123', '2025-06-18 21:01:23'),
('f11ee24b-53de-401d-81e7-df831147c208', 'Isai Paz Ortiz', 'isaai@gmail.com', '9532757827', '1999-12-11', '123455', '2025-06-15 06:07:20'),
('f9c8424a-24e6-4378-bab4-4f2ec65a00c0', 'Mau', 'Mau@gmai.com', '1234567890', '2003-09-20', '12345', '2025-06-19 07:55:23'),
('recep-001', 'Recepcionista Turno Mañana', 'recepcionista@gym.com', '5550000002', '1995-05-10', 'recep123', '2025-06-15 07:48:03');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`idAsistencia`),
  ADD KEY `miembroId` (`miembroId`),
  ADD KEY `claseId` (`claseId`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`idClase`);

--
-- Indices de la tabla `Entrenador`
--
ALTER TABLE `Entrenador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `Equipo`
--
ALTER TABLE `Equipo`
  ADD PRIMARY KEY (`idEquipo`),
  ADD KEY `idSucursal` (`idSucursal`);

--
-- Indices de la tabla `HistorialMantenimiento`
--
ALTER TABLE `HistorialMantenimiento`
  ADD PRIMARY KEY (`idHistorial`),
  ADD KEY `idEquipo` (`idEquipo`),
  ADD KEY `idProveedor` (`idProveedor`);

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`idInscripcion`),
  ADD UNIQUE KEY `uq_miembro_clase` (`miembroId`,`claseId`),
  ADD KEY `claseId` (`claseId`);

--
-- Indices de la tabla `miembros`
--
ALTER TABLE `miembros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idMembresia` (`idMembresia`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `Notificacion`
--
ALTER TABLE `Notificacion`
  ADD PRIMARY KEY (`idNotificacion`),
  ADD KEY `idEquipo` (`idEquipo`);

--
-- Indices de la tabla `NotificacionMantenimiento`
--
ALTER TABLE `NotificacionMantenimiento`
  ADD PRIMARY KEY (`idNotificacion`),
  ADD KEY `idEquipo` (`idEquipo`),
  ADD KEY `idProveedor` (`idProveedor`);

--
-- Indices de la tabla `progresos_fisicos`
--
ALTER TABLE `progresos_fisicos`
  ADD PRIMARY KEY (`idProgreso`),
  ADD KEY `miembroId` (`miembroId`);

--
-- Indices de la tabla `Proveedor`
--
ALTER TABLE `Proveedor`
  ADD PRIMARY KEY (`idProveedor`);

--
-- Indices de la tabla `recepcionistas`
--
ALTER TABLE `recepcionistas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `SolicitudEntrenador`
--
ALTER TABLE `SolicitudEntrenador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `miembro_id` (`miembro_id`),
  ADD KEY `entrenador_id` (`entrenador_id`);

--
-- Indices de la tabla `Sucursal`
--
ALTER TABLE `Sucursal`
  ADD PRIMARY KEY (`idSucursal`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Entrenador`
--
ALTER TABLE `Entrenador`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `Equipo`
--
ALTER TABLE `Equipo`
  MODIFY `idEquipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `HistorialMantenimiento`
--
ALTER TABLE `HistorialMantenimiento`
  MODIFY `idHistorial` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Notificacion`
--
ALTER TABLE `Notificacion`
  MODIFY `idNotificacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `NotificacionMantenimiento`
--
ALTER TABLE `NotificacionMantenimiento`
  MODIFY `idNotificacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `Proveedor`
--
ALTER TABLE `Proveedor`
  MODIFY `idProveedor` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `SolicitudEntrenador`
--
ALTER TABLE `SolicitudEntrenador`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `Sucursal`
--
ALTER TABLE `Sucursal`
  MODIFY `idSucursal` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD CONSTRAINT `administradores_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`miembroId`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `asistencias_ibfk_2` FOREIGN KEY (`claseId`) REFERENCES `clases` (`idClase`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Equipo`
--
ALTER TABLE `Equipo`
  ADD CONSTRAINT `Equipo_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `Sucursal` (`idSucursal`);

--
-- Filtros para la tabla `HistorialMantenimiento`
--
ALTER TABLE `HistorialMantenimiento`
  ADD CONSTRAINT `HistorialMantenimiento_ibfk_1` FOREIGN KEY (`idEquipo`) REFERENCES `Equipo` (`idEquipo`),
  ADD CONSTRAINT `HistorialMantenimiento_ibfk_2` FOREIGN KEY (`idProveedor`) REFERENCES `Proveedor` (`idProveedor`);

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`miembroId`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`claseId`) REFERENCES `clases` (`idClase`) ON DELETE CASCADE;

--
-- Filtros para la tabla `miembros`
--
ALTER TABLE `miembros`
  ADD CONSTRAINT `miembros_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Notificacion`
--
ALTER TABLE `Notificacion`
  ADD CONSTRAINT `Notificacion_ibfk_1` FOREIGN KEY (`idEquipo`) REFERENCES `Equipo` (`idEquipo`);

--
-- Filtros para la tabla `NotificacionMantenimiento`
--
ALTER TABLE `NotificacionMantenimiento`
  ADD CONSTRAINT `NotificacionMantenimiento_ibfk_1` FOREIGN KEY (`idEquipo`) REFERENCES `Equipo` (`idEquipo`),
  ADD CONSTRAINT `NotificacionMantenimiento_ibfk_2` FOREIGN KEY (`idProveedor`) REFERENCES `Proveedor` (`idProveedor`);

--
-- Filtros para la tabla `progresos_fisicos`
--
ALTER TABLE `progresos_fisicos`
  ADD CONSTRAINT `progresos_fisicos_ibfk_1` FOREIGN KEY (`miembroId`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `recepcionistas`
--
ALTER TABLE `recepcionistas`
  ADD CONSTRAINT `recepcionistas_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `SolicitudEntrenador`
--
ALTER TABLE `SolicitudEntrenador`
  ADD CONSTRAINT `SolicitudEntrenador_ibfk_1` FOREIGN KEY (`miembro_id`) REFERENCES `miembros` (`id`),
  ADD CONSTRAINT `SolicitudEntrenador_ibfk_2` FOREIGN KEY (`entrenador_id`) REFERENCES `Entrenador` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;