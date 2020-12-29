-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for anya_coffee
CREATE DATABASE IF NOT EXISTS `anya_coffee` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `anya_coffee`;

-- Dumping structure for table anya_coffee.category_product
CREATE TABLE IF NOT EXISTS `category_product` (
  `id_category` int(11) NOT NULL,
  `name_category` varchar(50) NOT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.category_product: ~4 rows (approximately)
/*!40000 ALTER TABLE `category_product` DISABLE KEYS */;
INSERT INTO `category_product` (`id_category`, `name_category`) VALUES
	(1, 'Coffee'),
	(2, 'Non Coffee'),
	(3, 'Favorite Product'),
	(4, 'Foods'),
	(5, 'Add-on');
/*!40000 ALTER TABLE `category_product` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.coupon_product
CREATE TABLE IF NOT EXISTS `coupon_product` (
  `id_coupon` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `code_coupon` varchar(50) NOT NULL,
  `min_purchase` int(11) NOT NULL,
  `homeDeliv` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `dineIn` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `takeaway` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `discount_coupon` int(11) NOT NULL,
  `start_expired` date NOT NULL,
  `end_expired` date NOT NULL,
  `status_promo` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  `create_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`id_coupon`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.coupon_product: ~0 rows (approximately)
/*!40000 ALTER TABLE `coupon_product` DISABLE KEYS */;
INSERT INTO `coupon_product` (`id_coupon`, `product_id`, `code_coupon`, `min_purchase`, `homeDeliv`, `dineIn`, `takeaway`, `discount_coupon`, `start_expired`, `end_expired`, `status_promo`, `create_at`, `delete_at`, `update_at`) VALUES
	(1, 2, 'ChefJuna', 5, 'OFF', 'OFF', 'OFF', 20, '2020-12-29', '2020-12-31', 'ON', '2020-12-28 18:42:22', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `coupon_product` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.detail_history
CREATE TABLE IF NOT EXISTS `detail_history` (
  `id_detail` int(11) NOT NULL AUTO_INCREMENT,
  `id_historydetails` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `size_detail` varchar(50) NOT NULL DEFAULT '',
  `status_delivery` varchar(50) NOT NULL DEFAULT '',
  `status_table` varchar(50) NOT NULL,
  `create_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  `status_details` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  PRIMARY KEY (`id_detail`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.detail_history: ~8 rows (approximately)
/*!40000 ALTER TABLE `detail_history` DISABLE KEYS */;
INSERT INTO `detail_history` (`id_detail`, `id_historydetails`, `id_product`, `qty`, `total`, `size_detail`, `status_delivery`, `status_table`, `create_at`, `delete_at`, `status_details`) VALUES
	(1, 1, 1, 5, 235000, '300 Gram', 'Door Delivery', 'Table 2', '2020-12-21 06:56:46', '0000-00-00 00:00:00', 'ON'),
	(2, 1, 2, 2, 130000, 'Reguler', 'Pick up', 'Table 2', '2020-12-21 06:56:46', '0000-00-00 00:00:00', 'ON'),
	(3, 1, 5, 3, 75000, 'Extra Large', 'Dine in', 'Table 2', '2020-12-21 06:56:46', '0000-00-00 00:00:00', 'ON'),
	(4, 4, 4, 2, 78910, 'Large', 'Door Delivery', 'Table 2', '2020-12-22 17:08:43', '0000-00-00 00:00:00', 'ON'),
	(5, 5, 3, 4, 46000, '300 Gram', 'Door Delivery', 'Table 2', '2020-12-22 17:16:33', '0000-00-00 00:00:00', 'ON'),
	(6, 5, 2, 2, 134000, 'Large', 'Door Delivery', 'Table 2', '2020-12-22 17:16:33', '0000-00-00 00:00:00', 'ON'),
	(7, 7, 1, 1, 45000, '250 Gram', 'Door Delivery', 'Table 2', '2020-12-27 09:20:28', '0000-00-00 00:00:00', 'ON'),
	(8, 7, 8, 2, 90000, 'Extra Large', 'Door Delivery', 'Table 2', '2020-12-27 09:20:28', '0000-00-00 00:00:00', 'ON'),
	(9, 7, 10, 1, 65000, 'Reguler', 'Door Delivery', 'Table 2', '2020-12-27 09:20:28', '0000-00-00 00:00:00', 'ON'),
	(10, 7, 10, 2, 130000, 'Reguler', 'Door Delivery', 'Table 2', '2020-12-27 09:20:28', '0000-00-00 00:00:00', 'ON');
/*!40000 ALTER TABLE `detail_history` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.history_product
CREATE TABLE IF NOT EXISTS `history_product` (
  `id_history` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `payment_method` varchar(15) NOT NULL,
  `invoice_payment` varchar(50) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `status_history` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  `create_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  PRIMARY KEY (`id_history`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.history_product: ~7 rows (approximately)
/*!40000 ALTER TABLE `history_product` DISABLE KEYS */;
INSERT INTO `history_product` (`id_history`, `user_id`, `payment_method`, `invoice_payment`, `sub_total`, `status_history`, `create_at`, `delete_at`) VALUES
	(1, 4, 'ATM', 'zVueZnOH3JmJdUMSEMXYoeyW8UBXciUy', 516000, 'OFF', '2020-12-21 06:56:46', '0000-00-00 00:00:00'),
	(2, 4, 'ATM', 'IuQaG2BHPnSENgnknC8Pkwjx0V0YuuQg', 10000, 'OFF', '2020-12-22 16:56:53', '0000-00-00 00:00:00'),
	(3, 4, 'ATM', 'fmXgcfI5jSXANT07ly3NVW8g3m5MqV3P', 185795, 'OFF', '2020-12-22 17:06:56', '0000-00-00 00:00:00'),
	(4, 5, 'ATM', 'YsKKRz4b0Ruz3ZegKTx4dUawGwf5X92G', 191493, 'OFF', '2020-12-22 17:08:43', '0000-00-00 00:00:00'),
	(5, 4, 'ATM', 'jyil5bQY5fP1kiehnushTpD0A2M85kbm', 256675, 'OFF', '2020-12-22 17:16:32', '0000-00-00 00:00:00'),
	(6, 1, 'ATM', 'ASDQWE1231SA', 60000, 'ON', '2020-12-29 18:09:04', '0000-00-00 00:00:00'),
	(7, 4, 'ATM', 'eGst3PCldF9imTtf3E6FaS75WGsX9BIj', 448150, 'OFF', '2020-12-29 09:20:28', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `history_product` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.main_product
CREATE TABLE IF NOT EXISTS `main_product` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name_product` varchar(50) NOT NULL DEFAULT '',
  `image_product` varchar(100) DEFAULT NULL,
  `price_product` int(11) NOT NULL,
  `desc_product` longtext NOT NULL DEFAULT '0',
  `qty_product` int(11) NOT NULL,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `homeDeliv` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `dineIn` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `takeaway` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `status_product` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  `time_start` varchar(50) NOT NULL,
  `time_end` varchar(50) NOT NULL,
  `code_discount` varchar(50) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.main_product: ~2 rows (approximately)
/*!40000 ALTER TABLE `main_product` DISABLE KEYS */;
INSERT INTO `main_product` (`id_product`, `name_product`, `image_product`, `price_product`, `desc_product`, `qty_product`, `category_id`, `homeDeliv`, `dineIn`, `takeaway`, `status_product`, `time_start`, `time_end`, `code_discount`, `create_at`, `update_at`, `delete_at`) VALUES
	(1, 'Steak Chef Juna', '', 45000, 'Chef Juna Yang buat no debat valid', 100, 3, 'ON', 'OFF', 'OFF', 'ON', '4 am', '7 pm', '', '2020-12-28 18:39:44', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'Coffee Chef Juna', '', 20000, 'Coffeenya Chef Juna No debat', 50, 1, 'ON', 'ON', 'OFF', 'ON', '10 am', '10 pm', 'ChefJuna', '2020-12-28 18:41:03', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `main_product` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.size_typeproduct
CREATE TABLE IF NOT EXISTS `size_typeproduct` (
  `id_size` int(11) NOT NULL AUTO_INCREMENT,
  `id_Product` int(11) NOT NULL,
  `type` enum('Product','Promo') DEFAULT NULL,
  `size_L` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_R` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_XL` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_200` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_350` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_400` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `status_product` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  PRIMARY KEY (`id_size`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.size_typeproduct: ~2 rows (approximately)
/*!40000 ALTER TABLE `size_typeproduct` DISABLE KEYS */;
INSERT INTO `size_typeproduct` (`id_size`, `id_Product`, `type`, `size_L`, `size_R`, `size_XL`, `size_200`, `size_350`, `size_400`, `status_product`) VALUES
	(1, 1, 'Product', 'ON', 'ON', 'OFF', 'OFF', 'OFF', 'OFF', 'ON'),
	(2, 2, 'Product', 'ON', 'ON', 'OFF', 'OFF', 'OFF', 'OFF', 'ON'),
	(3, 2, 'Promo', 'ON', 'OFF', 'OFF', 'OFF', 'OFF', 'OFF', 'ON');
/*!40000 ALTER TABLE `size_typeproduct` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.user
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email_user` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `image_user` varchar(150) NOT NULL,
  `date_birth` date NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `address_user` varchar(150) NOT NULL,
  `token_user` varchar(100) NOT NULL,
  `gender` enum('MALE','FEMALE') DEFAULT NULL,
  `roles` tinyint(2) NOT NULL,
  `status` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.user: ~5 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id_user`, `username`, `email_user`, `password`, `first_name`, `last_name`, `image_user`, `date_birth`, `phone_number`, `address_user`, `token_user`, `gender`, `roles`, `status`, `create_at`, `update_at`) VALUES
	(1, 'Cotlinz', 'rdy.galih@gmail.com', '$2b$10$ljJopcgVny9M/DDJk7xRdOgBfVUBf5AzgO3bhVTTwiVuskOadGzWe', 'Rudy', 'Galeh', '2020-12-25T16-11-16.913ZBiodataImage.jpeg', '2000-10-01', '082350775253', 'Balikpapan Asoy', '', 'MALE', 1, 'ON', '2020-12-23 16:53:00', '2020-12-25 16:11:16'),
	(6, 'RM', 'rizqonmetal@gmail.com', '$2b$10$UUq6VwInhZyY9zIY.rmoguroynzQEdHkdEOdIXYEcI1YwNTA2Em3.', 'Rizqon', 'Maulana', '2020-12-24T19-50-26.032ZPicture1.jpg', '1996-10-10', '089812313123', 'Jln Kemana Aja lah', '', 'MALE', 0, 'ON', '2020-12-24 17:13:10', '2020-12-24 19:50:26'),
	(14, 'RM', 'rizqonmetaa@gmail.com', '$2b$10$KIi7fmyilc5f0g4QInxMvOczvGK4JyU4CbHg7TXE67l2PFh1ftxXS', 'Rizqon', 'Maulana', '2020-12-24T19-50-06.464Zphoto-1589309736404-2e142a2acdf0.webp', '1996-10-10', '089812313123', 'Jln Kemana Aja lah', '', 'MALE', 0, 'ON', '2020-12-24 18:41:35', '2020-12-24 19:50:06'),
	(29, 'Coltinz', 'co.tlinz121@gmail.com', '$2b$10$UAEl8HrepBePY0bvnVVm.OPa2IoY.ND3RjSkJZGI3Yi2iRYCboOE6', '', '', '', '0000-00-00', '0823354213', '', '', NULL, 0, 'ON', '2020-12-26 09:07:21', '0000-00-00 00:00:00'),
	(30, 'LOL VUE.JS', 'rizqonmaulana5@gmail.com', '$2b$10$tKvN3hIzdqRXY8d6LN8myOpvuPi/Qsxts9fP4xFJfmEUqx0vuKdyi', '', '', '', '0000-00-00', '0823354213', '', '', NULL, 1, 'ON', '2020-12-27 03:54:40', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
