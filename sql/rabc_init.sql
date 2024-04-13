-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主机： db
-- 生成日期： 2023-10-28 23:57:35
-- 服务器版本： 8.0.27
-- PHP 版本： 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `rabc`
--
-- 创建新数据库 rabc 并选择
CREATE DATABASE IF NOT EXISTS `rabc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `rabc`;

-- account表格

DROP TABLE IF EXISTS `useraccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useraccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccount`
--

LOCK TABLES `useraccount` WRITE;
/*!40000 ALTER TABLE `useraccount` DISABLE KEYS */;
INSERT INTO `useraccount` VALUES (1,'admin','123456'),(2,'useraccount1','123456'),(3,'useraccount2','123456'),(4,'useraccount3','123456'),(5,'useraccount4','123456');
/*!40000 ALTER TABLE `useraccount` ENABLE KEYS */;
UNLOCK TABLES;

-- users表格
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
  PRIMARY KEY (`key`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1','001','John Doe','JDTest10.31','IT','123-456-7890',1,'2023-10-30','e3886736'),('10','010','Sarah Lee','SL','Sales','555-777-9999',1,'2023-10-14','useraccount2'),('100213','1234567123','8888','888','88','888',0,'2023-10-30','useraccount1'),('12','012','Linda Smith','LS','HR','222-444-6666',0,'2023-10-12','useraccount3'),('13','013','Daniel Brown','DB','Marketing','333-555-7777',1,'2023-10-11','useraccount3'),('14','014','Emily Lee','EL','Sales','444-666-8888',1,'2023-10-10','useraccount3'),('15','015','Alex Johnson','AJ','IT','555-777-9999',0,'2023-10-09','useraccount3'),('16','016','Grace Smith','GS','HR','666-888-1111',1,'2023-10-08','useraccount4'),('17','017','Tom Brown','TB','Finance','777-999-2222',1,'2023-10-07','useraccount4'),('18','018','Olivia Lee','OL','Marketing','888-111-3333',0,'2023-10-06','useraccount4'),('19','019','Michael Johnson','MJ','Sales','999-222-4444',1,'2023-10-05','useraccount4'),('2','002','Alice Smith','AS','HR','987-654-3210',0,'2023-10-22','7f555441'),('20','020','Emma Smith','ES','IT','111-333-5555',0,'2023-10-04','useraccount4'),('3','003','Bob Johnson','BJ','Finance','555-123-4567',1,'2023-10-21','97fde9e5'),('4','004','Eva Brown','EB','Marketing','777-999-8888',0,'2023-10-20','c339799c'),('5','005','Michael Lee','ML','Sales','222-333-4444',1,'2023-10-19','5b69f0b4'),('6','006','Jane Doe','JD','IT','111-222-3333',1,'2023-10-18','useraccount2'),('7','007','David Smith','DS','HR','999-888-7777',0,'2023-10-17','useraccount2'),('8','008','Mary Johnson','MJ','Finance','777-555-4444',1,'2023-10-16','useraccount2'),('9','009','Kevin Brown','KB','Marketing','444-666-8888',0,'2023-10-15','useraccount2'),('9999','99999','9999','999','99','99',0,'2023-10-30','useraccount1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

-- roles表格
DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `key` varchar(10) NOT NULL,
  `roleId` varchar(10) DEFAULT NULL,
  `roleName` varchar(255) DEFAULT NULL,
  `roleType` varchar(255) DEFAULT NULL,
  `roleIdentifier` varchar(255) DEFAULT NULL,
  `displayOrder` int DEFAULT NULL,
  `remark` text,
  `status` tinyint(1) DEFAULT NULL,
  `createTime` date DEFAULT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `roleId` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('1','001','Admin','Admin Type','admin123',1,'Admin Role',1,'2023-10-23'),('12312312','3123123','999','99999','99999',9999,'99999999',0,'2023-10-16'),('3','003','Manager','Manager Type','manager123',3,'Manager Role',1,'2023-10-21'),('4','004','Editor','Editor Type','editor123',4,'Editor Role',1,'2023-10-20'),('5','005','Guest','Guest Type','guest123',5,'Guest Role',1,'2023-10-19'),('6','006','Moderator','Moderator Type','moderator123',6,'Moderator Role',1,'2023-10-18'),('7','007','Supervisor','Supervisor Type','supervisor123',7,'Supervisor Role',1,'2023-10-17'),('8','008','UpdateTest22222','Analyst Type','analyst123',8,'Analyst Role',1,'2023-10-16'),('default','default','11','11','11',4,'2321',1,'2023-10-16');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

-- permissions表格
DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `key` varchar(10) NOT NULL,
  `menuName` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `permission` varchar(255) DEFAULT NULL,
  `componentPath` varchar(255) DEFAULT NULL,
  `componentName` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES ('0','系统管理','777','777','777','7777',1),('2','支付管理','icon','Permission-2','/path/to/component2','Component 2',1),('3','报表管理','icon','Permission-3','/path/to/component3','Component 3',0),('4','工作流程','icon','Permission-4','/path/to/component4','Component 4',1),('6','商品中心','icon','Permission-6','/path/to/component6','Component 6',1),('7','订单中心','icon','Permission-7','/path/to/component7','Component 7',0),('8','营销中心','icon','Permission-8','/path/to/component8','Component 8',1),('9','公众号管理','icon','Permission-9','/path/to/component9','Component 9',0);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

-- user_role表格
DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_name` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_name`,`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('example_user','Role1'),('example_user','TestRole'),('user1','admin'),('user2','editor'),('user3','viewer'),('user4','editor'),('useraccount1','editor'),('useraccount1','User'),('useraccount2','editor');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

-- role_permission表格
DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_name` varchar(255) DEFAULT NULL,
  `permission_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES ('Admin','Admin Type'),('exampleUser','permission1'),('exampleUser','testpermission'),('useraccount1','报表管理'),('useraccount1','工作流程'),('useraccount1','会员中心'),('User','报表管理'),('User','工作流程'),('User','会员中心'),('Editor','营销中心'),('Editor','订单中心'),('Editor','会员中心');
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;


-- -- --------------------------------------------------------

-- --
-- -- 表的结构 `system_users`
-- --

-- CREATE TABLE `system_users` (
--   `id` bigint NOT NULL,
--   `username` varchar(255) NOT NULL,
--   `password` varchar(255) NOT NULL,
--   `nickname` varchar(255) DEFAULT NULL,
--   `status` int NOT NULL DEFAULT '0',
--   `login_ip` varchar(255) DEFAULT NULL,
--   `login_date` datetime DEFAULT NULL,
--   `tenant_id` int DEFAULT '1',
--   `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
--   `update_time` datetime DEFAULT CURRENT_TIMESTAMP,
--   `creator` varchar(255) DEFAULT NULL,
--   `updater` varchar(255) DEFAULT NULL,
--   `deleted` tinyint(1) DEFAULT '0'
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --
-- -- 转存表中的数据 `system_users`
-- --

-- INSERT INTO `system_users` (`id`, `username`, `password`, `nickname`, `status`, `login_ip`, `login_date`, `tenant_id`, `create_time`, `update_time`, `creator`, `updater`, `deleted`) VALUES
-- (1, 'sysadmin', '$2a$10$2n91ncs5vNaKEwcuk9dFVuwpm8o3kpj17YW0Ne.6.e.AF.m0MuBPa', 'admin', 0, NULL, '2023-10-28 10:57:02', 1, '2023-10-28 10:57:30', '2023-10-28 10:57:30', NULL, NULL, 0),
-- (2, 'user', '$2a$10$2n91ncs5vNaKEwcuk9dFVuwpm8o3kpj17YW0Ne.6.e.AF.m0MuBPa', 'admin', 0, NULL, '2023-10-28 10:57:02', 1, '2023-10-28 10:57:30', '2023-10-28 10:57:30', NULL, NULL, 0);

-- --
-- -- 转储表的索引
-- --

-- --
-- -- 表的索引 `system_users`
-- --
-- ALTER TABLE `system_users`
--   ADD PRIMARY KEY (`id`),
--   ADD UNIQUE KEY `username` (`username`);

-- --
-- -- 在导出的表使用AUTO_INCREMENT
-- --

-- --
-- -- 使用表AUTO_INCREMENT `system_users`
-- --
-- ALTER TABLE `system_users`
--   MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
-- COMMIT;

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
