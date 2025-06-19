-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db:3306
-- Tiempo de generación: 15-06-2025 a las 07:54:39
-- Versión del servidor: 8.0.42
-- Versión de PHP: 8.2.27

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
('426aca9a-23d9-4252-aaf0-e5bb210d96f2', '2025-06-15 01:24:48', '7c2de2ee-5c4a-492f-ac65-6b6329c816ff', 'clase-04');

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
('clase-04', 'Pilates', 'Fortalece tu core y mejora tu flexibilidad.', 'Sábados - 10:00 AM', 18, 7);

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
('b66a1c35-263b-418f-a108-58fae02069a8', '2025-06-15 00:47:05', 'f11ee24b-53de-401d-81e7-df831147c208', 'clase-04');

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
('7866be77-79cc-4a15-806f-96bf12d1332c', 'memb_4826deec', 'Básica', 'Activa', '2025-06-15 06:07:20', 'f11ee24b-53de-401d-81e7-df831147c208');

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
('b3fa7853-2453-43a3-82c1-724a39ba004b', '2025-06-15 01:36:14', 24.00, '{\"pecho\":2,\"cintura\":2,\"brazos\":2}', 2.00, 'flaquisimo pa\n', '7c2de2ee-5c4a-492f-ac65-6b6329c816ff');

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
('7c2de2ee-5c4a-492f-ac65-6b6329c816ff', 'Isai Paz Ortiz', 'isai@gmail.com', '9532757827', '2004-10-17', 'Hola513513a@', '2025-06-15 05:57:11'),
('admin-001', 'Admin Principal', 'admin@gym.com', '5551234567', '1990-01-01', 'admin123', '2025-06-15 06:30:45'),
('f11ee24b-53de-401d-81e7-df831147c208', 'Isai Paz Ortiz', 'isaai@gmail.com', '9532757827', '1999-12-11', '123455', '2025-06-15 06:07:20'),
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
-- Indices de la tabla `progresos_fisicos`
--
ALTER TABLE `progresos_fisicos`
  ADD PRIMARY KEY (`idProgreso`),
  ADD KEY `miembroId` (`miembroId`);

--
-- Indices de la tabla `recepcionistas`
--
ALTER TABLE `recepcionistas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `correoElectronico` (`correoElectronico`);

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
-- Filtros para la tabla `progresos_fisicos`
--
ALTER TABLE `progresos_fisicos`
  ADD CONSTRAINT `progresos_fisicos_ibfk_1` FOREIGN KEY (`miembroId`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `recepcionistas`
--
ALTER TABLE `recepcionistas`
  ADD CONSTRAINT `recepcionistas_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
