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
  `name_category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.category_product: ~5 rows (approximately)
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
  `product_id` int(11) DEFAULT NULL,
  `code_coupon` varchar(50) DEFAULT NULL,
  `min_purchase` int(11) DEFAULT NULL,
  `homeDeliv` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `dineIn` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `takeaway` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `discount_coupon` int(11) DEFAULT NULL,
  `start_expired` date DEFAULT NULL,
  `end_expired` date DEFAULT NULL,
  `status_promo` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  `create_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`id_coupon`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.coupon_product: ~1 rows (approximately)
/*!40000 ALTER TABLE `coupon_product` DISABLE KEYS */;
INSERT INTO `coupon_product` (`id_coupon`, `product_id`, `code_coupon`, `min_purchase`, `homeDeliv`, `dineIn`, `takeaway`, `discount_coupon`, `start_expired`, `end_expired`, `status_promo`, `create_at`, `delete_at`, `update_at`) VALUES
	(1, 1, 'Nasgor', 3, 'OFF', 'OFF', 'OFF', 20, '2021-02-16', '2021-02-17', 'ON', '2021-02-16 15:53:41', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `coupon_product` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.detail_history
CREATE TABLE IF NOT EXISTS `detail_history` (
  `id_detail` int(11) NOT NULL AUTO_INCREMENT,
  `id_historydetails` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `size_detail` varchar(50) DEFAULT NULL,
  `status_delivery` varchar(50) DEFAULT NULL,
  `status_table` varchar(50) DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  `status_details` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  PRIMARY KEY (`id_detail`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.detail_history: ~3 rows (approximately)
/*!40000 ALTER TABLE `detail_history` DISABLE KEYS */;
INSERT INTO `detail_history` (`id_detail`, `id_historydetails`, `id_product`, `qty`, `total`, `size_detail`, `status_delivery`, `status_table`, `create_at`, `delete_at`, `status_details`) VALUES
	(1, 1, 1, 3, 75000, '250 Gram', 'Door Delivery', 'Table 2', '2021-02-16 16:00:04', '0000-00-00 00:00:00', 'ON'),
	(2, 1, 1, 1, 25000, '250 Gram', 'Pick up', 'Table 2', '2021-02-16 16:00:04', '0000-00-00 00:00:00', 'ON'),
	(3, 2, 1, 2, 54000, '300 Gram', 'Door Delivery', '', '2021-02-16 16:05:52', '0000-00-00 00:00:00', 'ON');
/*!40000 ALTER TABLE `detail_history` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.history_product
CREATE TABLE IF NOT EXISTS `history_product` (
  `id_history` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `payment_method` varchar(15) DEFAULT NULL,
  `invoice_payment` varchar(50) DEFAULT NULL,
  `sub_total` int(11) DEFAULT NULL,
  `status_history` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  `create_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  PRIMARY KEY (`id_history`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.history_product: ~2 rows (approximately)
/*!40000 ALTER TABLE `history_product` DISABLE KEYS */;
INSERT INTO `history_product` (`id_history`, `user_id`, `payment_method`, `invoice_payment`, `sub_total`, `status_history`, `create_at`, `delete_at`) VALUES
	(1, 2, 'ATM', 'gigk0xw7W3EUJES9XkEGW14gXFrXednB', 125000, 'OFF', '2021-02-16 16:00:04', '0000-00-00 00:00:00'),
	(2, 2, 'COD', 'HfsNoKa0q0X8Pv4T6vKnvLwLs1WwX7DZ', 72100, 'OFF', '2021-02-16 16:05:51', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `history_product` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.main_product
CREATE TABLE IF NOT EXISTS `main_product` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name_product` varchar(50) DEFAULT NULL,
  `image_product` varchar(100) DEFAULT NULL,
  `price_product` int(11) DEFAULT NULL,
  `desc_product` longtext DEFAULT NULL,
  `qty_product` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `homeDeliv` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `dineIn` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `takeaway` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `status_product` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  `time_start` varchar(50) DEFAULT NULL,
  `time_end` varchar(50) DEFAULT NULL,
  `code_discount` varchar(50) DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.main_product: ~1 rows (approximately)
/*!40000 ALTER TABLE `main_product` DISABLE KEYS */;
INSERT INTO `main_product` (`id_product`, `name_product`, `image_product`, `price_product`, `desc_product`, `qty_product`, `category_id`, `homeDeliv`, `dineIn`, `takeaway`, `status_product`, `time_start`, `time_end`, `code_discount`, `create_at`, `update_at`, `delete_at`) VALUES
	(1, 'Nasi Goreng Pete', '2021-02-16T15-53-01.197Znasgor.jpg', 20000, 'Makanan Pembuka Terbaik Dikalangan Masyarakat Indonesia', 50, 3, 'OFF', 'ON', 'ON', 'ON', '7 am', '4 pm', '', '2021-02-16 15:53:01', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `main_product` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.size_typeproduct
CREATE TABLE IF NOT EXISTS `size_typeproduct` (
  `id_size` int(11) NOT NULL AUTO_INCREMENT,
  `id_Product` int(11) DEFAULT NULL,
  `type` enum('Product','Promo') DEFAULT NULL,
  `size_L` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_R` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_XL` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_200` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_350` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_400` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `status_product` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  PRIMARY KEY (`id_size`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.size_typeproduct: ~2 rows (approximately)
/*!40000 ALTER TABLE `size_typeproduct` DISABLE KEYS */;
INSERT INTO `size_typeproduct` (`id_size`, `id_Product`, `type`, `size_L`, `size_R`, `size_XL`, `size_200`, `size_350`, `size_400`, `status_product`) VALUES
	(1, 1, 'Product', 'OFF', 'OFF', 'OFF', 'ON', 'ON', 'OFF', 'ON'),
	(2, 1, 'Promo', 'OFF', 'OFF', 'OFF', 'ON', 'ON', 'OFF', 'ON');
/*!40000 ALTER TABLE `size_typeproduct` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.user
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email_user` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `image_user` varchar(150) DEFAULT NULL,
  `date_birth` date DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `address_user` varchar(150) DEFAULT NULL,
  `token_user` varchar(100) DEFAULT NULL,
  `gender` enum('MALE','FEMALE') DEFAULT NULL,
  `roles` tinyint(2) DEFAULT NULL,
  `status` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.user: ~2 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id_user`, `username`, `email_user`, `password`, `first_name`, `last_name`, `image_user`, `date_birth`, `phone_number`, `address_user`, `token_user`, `gender`, `roles`, `status`, `create_at`, `update_at`) VALUES
	(1, 'Cotlinz', 'rdy.galih@gmail.com', '$2b$10$ux6CLxigHRlC7zIqH8Q7g.b8oLeuEp5sh9oyuh3t2B.84k7f.nHRy', '', '', '', '0000-00-00', '082350775253', '', '', NULL, 1, 'ON', '2021-02-16 15:48:30', '0000-00-00 00:00:00'),
	(2, 'Rizqon', 'rizqonmaulana5@gmail.com', '$2b$10$s6HZvfe1zsf7jhnOyZeDEeGrf8RhxGOqOkhQAv3XzE8uVaNOaJ/K2', 'Riskon', 'Konriz', '2021-02-16T15-59-10.849Zimages.jpg', '1991-01-09', '082323563546', 'SepingganKecamatan Balikpapan Selatan, Kota Balikpapan, Kalimantan Timur', '', '', 0, 'ON', '2021-02-16 15:49:31', '2021-02-16 15:59:10');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
