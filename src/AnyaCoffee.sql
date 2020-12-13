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
  `name_productPromo` varchar(50) NOT NULL DEFAULT '',
  `normal_price` int(11) NOT NULL DEFAULT 0,
  `desc_coupon` varchar(50) NOT NULL,
  `code_coupon` varchar(50) NOT NULL,
  `discount_coupon` int(11) NOT NULL DEFAULT 0,
  `id_categoryPromo` int(11) NOT NULL DEFAULT 0,
  `start_expired` datetime NOT NULL,
  `end_expired` datetime NOT NULL,
  `status_promo` enum('ON','OFF') NOT NULL DEFAULT 'ON',
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  PRIMARY KEY (`id_coupon`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.coupon_product: ~2 rows (approximately)
/*!40000 ALTER TABLE `coupon_product` DISABLE KEYS */;
INSERT INTO `coupon_product` (`id_coupon`, `name_productPromo`, `normal_price`, `desc_coupon`, `code_coupon`, `discount_coupon`, `id_categoryPromo`, `start_expired`, `end_expired`, `status_promo`, `create_at`, `update_at`, `delete_at`) VALUES
	(1, 'Kopi Anya ft Rizky', 25000, 'Launcing Promo Song', 'AnyaxRizky12', 30, 1, '2020-12-13 13:21:13', '2020-12-13 13:21:13', 'ON', '2020-12-13 13:21:13', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'Kopi Anya Cuek', 25000, 'Kepok Dicuekin Anya Nih Discount Buatlu bIar Gak S', 'Lujelek', 60, 1, '2020-12-13 13:32:10', '2020-12-13 13:32:10', 'ON', '2020-12-13 13:22:27', '2020-12-13 13:32:10', '0000-00-00 00:00:00'),
	(3, 'Anya Kangen Rudy', 150000, 'Rudy Juga sayang anya geraldine', 'DoainWoy', 100, 3, '2020-12-13 13:23:38', '2020-12-13 13:23:38', 'ON', '2020-12-13 13:23:38', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.detail_history: ~4 rows (approximately)
/*!40000 ALTER TABLE `detail_history` DISABLE KEYS */;
INSERT INTO `detail_history` (`id_detail`, `id_historydetails`, `id_product`, `qty`, `total`, `size_detail`, `status_delivery`, `status_table`, `create_at`, `delete_at`, `status_details`) VALUES
	(1, 1, 4, 10, 150000, 'Reguler', 'Door Delivery', '', '2020-12-13 13:36:40', '0000-00-00 00:00:00', 'ON'),
	(2, 1, 5, 1, 5000, 'Extra Large', 'Dine in', 'Table 2', '2020-12-13 13:36:40', '0000-00-00 00:00:00', 'ON'),
	(3, 1, 2, 6, 60000, 'Large', 'Pick up', '', '2020-12-13 13:36:40', '0000-00-00 00:00:00', 'ON');
/*!40000 ALTER TABLE `detail_history` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.history_product
CREATE TABLE IF NOT EXISTS `history_product` (
  `id_history` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `payment_method` varchar(15) NOT NULL,
  `invoice_payment` varchar(50) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `create_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  PRIMARY KEY (`id_history`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.history_product: ~0 rows (approximately)
/*!40000 ALTER TABLE `history_product` DISABLE KEYS */;
INSERT INTO `history_product` (`id_history`, `user_id`, `payment_method`, `invoice_payment`, `sub_total`, `create_at`, `delete_at`) VALUES
	(1, 1, 'ATM', 'ASDQWE1231SA', 60000, '2020-12-13 13:36:27', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `history_product` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.main_product
CREATE TABLE IF NOT EXISTS `main_product` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `name_product` varchar(50) NOT NULL DEFAULT '',
  `image_product` varchar(100) DEFAULT NULL,
  `price_product` int(11) NOT NULL,
  `desc_product` longtext NOT NULL DEFAULT '0',
  `qty_product` int(11) NOT NULL,
  `category_id` int(2) DEFAULT NULL,
  `status_product` enum('ON','OFF') DEFAULT 'ON',
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `delete_at` datetime NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.main_product: ~5 rows (approximately)
/*!40000 ALTER TABLE `main_product` DISABLE KEYS */;
INSERT INTO `main_product` (`id_product`, `name_product`, `image_product`, `price_product`, `desc_product`, `qty_product`, `category_id`, `status_product`, `create_at`, `update_at`, `delete_at`) VALUES
	(1, 'Kopi Anya Kangen', 'https://images.unsplash.com/photo-1601758003353-418327f4a7d9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fG', 600000, 'Meningkatkan Kesehatan Tubuh +++', 4, 3, 'ON', '2020-12-13 13:00:28', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'Kopi Anya Ngambek', 'https://images.unsplash.com/photo-1601758003353-418327f4a7d9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fG', 10000, 'Meningkatkan Keimutan Peminum', 30, 1, 'ON', '2020-12-13 13:02:40', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(3, 'Kopi Anya Kesepian', 'https://images.unsplash.com/photo-1601758003353-418327f4a7d9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fG', 250000, 'Meningkatkan Keagresifan Pria', 10, 3, 'ON', '2020-12-13 13:04:09', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(4, 'Kopi Anya Bete', 'https://images.unsplash.com/photo-1601758003353-418327f4a7d9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fG', 15000, 'Meningkatkan Kesadaran Diri', 90, 1, 'ON', '2020-12-13 13:06:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(5, 'Kopi Mantra Cinta', 'https://images.unsplash.com/photo-1601758003353-418327f4a7d9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fG', 12000, 'Meningkatkan aura pemikat wanita', 120, 1, 'ON', '2020-12-13 13:07:54', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(6, 'Bakwan', 'https://images.unsplash.com/photo-1601758003353-418327f4a7d9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fG', 15000, 'Lembut Krenyes', 120, 4, 'ON', '2020-12-13 13:09:02', '2020-12-13 13:14:05', '0000-00-00 00:00:00'),
	(7, 'Paha Ayam Anya', 'https://images.unsplash.com/photo-1601758003353-418327f4a7d9?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fG', 20000, 'Paha Ayam bukan Paha ANYA WOII', 100, 4, 'ON', '2020-12-13 13:10:03', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `main_product` ENABLE KEYS */;

-- Dumping structure for table anya_coffee.size_typeproduct
CREATE TABLE IF NOT EXISTS `size_typeproduct` (
  `id_sizeProduct` int(11) NOT NULL,
  `type` enum('Product','Promo') DEFAULT NULL,
  `size_L` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_R` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_XL` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_200` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_350` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `size_400` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `status_product` enum('ON','OFF') NOT NULL DEFAULT 'ON'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table anya_coffee.size_typeproduct: ~7 rows (approximately)
/*!40000 ALTER TABLE `size_typeproduct` DISABLE KEYS */;
INSERT INTO `size_typeproduct` (`id_sizeProduct`, `type`, `size_L`, `size_R`, `size_XL`, `size_200`, `size_350`, `size_400`, `status_product`) VALUES
	(1, 'Product', 'ON', 'ON', 'OFF', 'OFF', 'OFF', 'OFF', 'ON'),
	(2, 'Product', 'ON', 'ON', 'ON', 'OFF', 'OFF', 'OFF', 'ON'),
	(3, 'Product', 'ON', 'ON', 'ON', 'OFF', 'OFF', 'OFF', 'ON'),
	(4, 'Product', 'ON', 'ON', 'OFF', 'OFF', 'OFF', 'OFF', 'ON'),
	(5, 'Product', 'ON', 'ON', 'ON', 'OFF', 'OFF', 'OFF', 'ON'),
	(6, 'Product', 'OFF', 'OFF', 'OFF', 'ON', 'ON', 'OFF', 'ON'),
	(7, 'Product', 'OFF', 'OFF', 'OFF', 'ON', 'ON', 'OFF', 'ON'),
	(1, 'Promo', 'ON', 'ON', 'ON', 'OFF', 'OFF', 'OFF', 'ON'),
	(2, 'Promo', 'ON', 'ON', 'ON', 'OFF', 'OFF', 'OFF', 'ON'),
	(3, 'Promo', 'ON', 'ON', 'ON', 'OFF', 'OFF', 'OFF', 'ON');
/*!40000 ALTER TABLE `size_typeproduct` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
