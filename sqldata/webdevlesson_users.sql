-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: webdevlesson
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `key` varchar(10) NOT NULL,
  `userId` varchar(10) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `userNickname` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createTime` date DEFAULT NULL,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1','001','John Doe','JDTest10.31','IT','123-456-7890',1,'2023-10-30','e3886736','a33b165c'),('10','010','Sarah Lee','SL','Sales','555-777-9999',1,'2023-10-14','useraccount2','123456'),('11','011','Chris Johnson','CJ','IT','111-999-8888',1,'2023-10-13','useraccount3','123456'),('12','012','Linda Smith','LS','HR','222-444-6666',0,'2023-10-12','useraccount3','123456'),('13','013','Daniel Brown','DB','Marketing','333-555-7777',1,'2023-10-11','useraccount3','123456'),('14','014','Emily Lee','EL','Sales','444-666-8888',1,'2023-10-10','useraccount3','123456'),('15','015','Alex Johnson','AJ','IT','555-777-9999',0,'2023-10-09','useraccount3','123456'),('16','016','Grace Smith','GS','HR','666-888-1111',1,'2023-10-08','useraccount4','123456'),('17','017','Tom Brown','TB','Finance','777-999-2222',1,'2023-10-07','useraccount4','123456'),('18','018','Olivia Lee','OL','Marketing','888-111-3333',0,'2023-10-06','useraccount4','123456'),('19','019','Michael Johnson','MJ','Sales','999-222-4444',1,'2023-10-05','useraccount4','123456'),('2','002','Alice Smith','AS','HR','987-654-3210',0,'2023-10-22','7f555441','8560bd04'),('20','020','Emma Smith','ES','IT','111-333-5555',0,'2023-10-04','useraccount4','123456'),('21','021','John Doe','JDTest10.31','IT','123-456-7890',1,'2023-10-30','useraccount1','123456'),('22','022','Alice Smith','AS','HR','987-654-3210',0,'2023-10-22','useraccount1','123456'),('23','023','Bob Johnson','BJ','Finance','555-123-4567',1,'2023-10-21','useraccount1','123456'),('24','024','Eva Brown','EB','Marketing','777-999-8888',0,'2023-10-20','useraccount1','123456'),('25','025','Michael Lee','ML','Sales','222-333-4444',1,'2023-10-19','useraccount1','123456'),('3','003','Bob Johnson','BJ','Finance','555-123-4567',1,'2023-10-21','97fde9e5','f25b8789'),('4','004','Eva Brown','EB','Marketing','777-999-8888',0,'2023-10-20','c339799c','0ad451c7'),('5','005','Michael Lee','ML','Sales','222-333-4444',1,'2023-10-19','5b69f0b4','f3e6f321'),('6','006','Jane Doe','JD','IT','111-222-3333',1,'2023-10-18','useraccount2','123456'),('7','007','David Smith','DS','HR','999-888-7777',0,'2023-10-17','useraccount2','123456'),('8','008','Mary Johnson','MJ','Finance','777-555-4444',1,'2023-10-16','useraccount2','123456'),('9','009','Kevin Brown','KB','Marketing','444-666-8888',0,'2023-10-15','useraccount2','123456');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-13 14:35:12
