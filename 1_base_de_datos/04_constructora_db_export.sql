-- MySQL dump 10.13  Distrib 9.3.0, for macos15 (x86_64)
--
-- Host: localhost    Database: constructora_db
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `constructora_db`
--

/*!40000 DROP DATABASE IF EXISTS `constructora_db`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `constructora_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `constructora_db`;

--
-- Table structure for table `clientes_interesados`
--

DROP TABLE IF EXISTS `clientes_interesados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes_interesados` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mensaje` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_registro` datetime NOT NULL,
  `proyecto_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cliente_proyecto` (`proyecto_id`),
  CONSTRAINT `fk_cliente_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes_interesados`
--

LOCK TABLES `clientes_interesados` WRITE;
/*!40000 ALTER TABLE `clientes_interesados` DISABLE KEYS */;
INSERT INTO `clientes_interesados` VALUES (1,'María González','3001234567','maria@email.com','Me interesa conocer más sobre las casas del proyecto.','2026-11-09 16:55:51',1),(2,'Carlos Ruiz','3109876543','carlos@email.com','Quisiera agendar una visita al apartamento 801.','2026-11-09 16:55:51',2),(3,'Ana López','3205551234','ana@email.com','Busco un lote para construir mi casa campestre.','2026-11-09 16:55:51',3);
/*!40000 ALTER TABLE `clientes_interesados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ciudad` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `precio_desde` decimal(15,2) NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destacado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'Villas del Sol','Conjunto residencial con amplias zonas verdes y club house.','Bogotá','Calle 100 #15-20',280000000.00,'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800','EN_CONSTRUCCION',1),(2,'Torres del Parque','Apartamentos con vista al parque y excelente ubicación.','Medellín','Carrera 43A #1-50',350000000.00,'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800','ENTREGA_INMEDIATA',1),(3,'Campestre La Pradera','Lotes campestres para construir la casa de tus sueños.','Cali','Km 5 Vía Cali-Jamundí',150000000.00,'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800','EN_PLANOS',0);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viviendas`
--

DROP TABLE IF EXISTS `viviendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viviendas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `habitaciones` int DEFAULT '0',
  `banos` int DEFAULT '0',
  `area` double NOT NULL,
  `precio` decimal(15,2) NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT '1',
  `proyecto_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vivienda_proyecto` (`proyecto_id`),
  CONSTRAINT `fk_vivienda_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viviendas`
--

LOCK TABLES `viviendas` WRITE;
/*!40000 ALTER TABLE `viviendas` DISABLE KEYS */;
INSERT INTO `viviendas` VALUES (1,'Casa Tipo A','CASA',3,2,120,320000000.00,'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',1,1),(2,'Casa Tipo B','CASA',4,3,150,380000000.00,'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',1,1),(3,'Apartamento 801','APARTAMENTO',2,2,75,350000000.00,'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',1,2),(4,'Apartamento 1202','APARTAMENTO',3,2,95,420000000.00,'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',0,2),(5,'Lote Premium','LOTE',0,0,300,180000000.00,'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',1,3),(6,'Lote Estándar','LOTE',0,0,250,150000000.00,'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800',1,3);
/*!40000 ALTER TABLE `viviendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'constructora_db'
--

--
-- Dumping routines for database 'constructora_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-09 17:15:11
