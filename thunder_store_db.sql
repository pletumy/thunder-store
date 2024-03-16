CREATE SCHEMA IF NOT EXISTS `thunder_store_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `thunder_store_db` ;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for c_cart
-- ----------------------------
DROP TABLE IF EXISTS `c_cart`;
CREATE TABLE `c_cart`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `num_of_product` int NULL DEFAULT NULL,
  `total` decimal(10, 2) NULL DEFAULT 0.00,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_cart
-- ----------------------------
INSERT INTO `c_cart` VALUES ('370845db-471f-49b2-bd59-af8e7d741c00', 0, 0.00);
INSERT INTO `c_cart` VALUES ('373ea37f-b22d-4512-a3f7-0d9cf700c668', 0, 0.00);
INSERT INTO `c_cart` VALUES ('774095b3-f94f-475f-855a-bed9e40b97ca', 3, 995000.00);
INSERT INTO `c_cart` VALUES ('bf5739d7-1fa3-4a28-aef4-d420b6544b85', 0, 0.00);
INSERT INTO `c_cart` VALUES ('cfcfc2b1-d8ea-4a85-88d6-99fe3aacb6a5', 2, 620000.00);
INSERT INTO `c_cart` VALUES ('d097eda2-7896-4f6d-87b3-94cf73949488', 0, 0.00);

-- ----------------------------
-- Table structure for c_cart_item
-- ----------------------------
DROP TABLE IF EXISTS `c_cart_item`;
CREATE TABLE `c_cart_item`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `version` int NOT NULL,
  `quantity` int NULL DEFAULT NULL,
  `color_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `product_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cart_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  INDEX `fk_cart_item_product`(`product_id` ASC) USING BTREE,
  INDEX `fk_cart_item_cart`(`cart_id` ASC) USING BTREE,
  CONSTRAINT `fk_cart_item_cart` FOREIGN KEY (`cart_id`) REFERENCES `c_cart` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_cart_item_product` FOREIGN KEY (`product_id`) REFERENCES `c_product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_cart_item
-- ----------------------------
INSERT INTO `c_cart_item` VALUES ('6c81b64a-1d82-4906-9192-8cf831fffbec', '2023-12-12 16:58:18', 'devhuunhan', '2023-12-12 16:58:18', 'devhuunhan', 0, 1, '607de454-50c1-4140-96c9-180ad02452ba', '68531e5d-41e4-4d10-9111-24f682411881', '095694a2-ab6c-4213-992b-b622cd0416e4', 'cfcfc2b1-d8ea-4a85-88d6-99fe3aacb6a5');
INSERT INTO `c_cart_item` VALUES ('34ff663d-923b-43bb-9e9d-d55b9fb5b9b5', '2023-12-12 16:58:25', 'devhuunhan', '2023-12-12 17:00:05', 'devhuunhan', 11, 1, '5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '1c2f9ba5-38c6-4f42-a6dc-e1af5f846bb8', 'cfcfc2b1-d8ea-4a85-88d6-99fe3aacb6a5');

-- ----------------------------
-- Table structure for c_category
-- ----------------------------
DROP TABLE IF EXISTS `c_category`;
CREATE TABLE `c_category`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tag` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_category
-- ----------------------------
INSERT INTO `c_category` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', 'Hoodie', 'Hoodie T-shirt', 'hoodie');
INSERT INTO `c_category` VALUES ('b9c19dd0-ad54-4535-8c21-4d5859e85232', 'Sweater', 'Sweater T-shirt', 'sweater');

-- ----------------------------
-- Table structure for c_category_product
-- ----------------------------
DROP TABLE IF EXISTS `c_category_product`;
CREATE TABLE `c_category_product`  (
  `category_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`category_id`, `product_id`) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `c_category_product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `c_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_category_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `c_product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_category_product
-- ----------------------------
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', '002a218f-11c9-4792-8cc9-f730aedd6e10');
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', '095694a2-ab6c-4213-992b-b622cd0416e4');
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', '1c2f9ba5-38c6-4f42-a6dc-e1af5f846bb8');
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', '3423283f-2154-4dff-826a-d8e6d8a32a9c');
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', '344d18f8-9963-4cac-ab14-e65822e47406');
INSERT INTO `c_category_product` VALUES ('b9c19dd0-ad54-4535-8c21-4d5859e85232', '3997ad1d-dc64-4c45-af58-2d4a935f5a98');
INSERT INTO `c_category_product` VALUES ('b9c19dd0-ad54-4535-8c21-4d5859e85232', '459489c1-4989-4398-9918-8120123d7a0c');
INSERT INTO `c_category_product` VALUES ('b9c19dd0-ad54-4535-8c21-4d5859e85232', '5c6c622e-4060-4a74-97f1-2940c8d71124');
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', '5ca60c31-cb43-4972-94e7-ffbb9cafabc4');
INSERT INTO `c_category_product` VALUES ('b9c19dd0-ad54-4535-8c21-4d5859e85232', '616c611a-dc44-41d6-9b2f-8f45b5f4f244');
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', '68a6957f-bbd7-487e-91b1-a40aafea3f9a');
INSERT INTO `c_category_product` VALUES ('b9c19dd0-ad54-4535-8c21-4d5859e85232', '6b533a0c-7141-4f36-9261-fc5b97c95733');
INSERT INTO `c_category_product` VALUES ('b9c19dd0-ad54-4535-8c21-4d5859e85232', '7d53bf09-b954-488b-8eda-3eefe9e3f0f6');
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', 'a465e851-3e49-47ae-b61b-2c305ef8554c');
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', 'a8f2c72e-21a9-4f97-a62c-eda13feff6f9');
INSERT INTO `c_category_product` VALUES ('b9c19dd0-ad54-4535-8c21-4d5859e85232', 'a9444bfb-573f-4046-ad0d-223b75f0d681');
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', 'aa86d9ad-1228-4dde-b872-cee5dead2aea');
INSERT INTO `c_category_product` VALUES ('b9c19dd0-ad54-4535-8c21-4d5859e85232', 'c62d587c-88d4-4d16-867a-804b5c1f5574');
INSERT INTO `c_category_product` VALUES ('4b885833-be95-4771-8778-444a5a75ee19', 'ee2d0e15-ba13-4620-afeb-370d966b2b98');
INSERT INTO `c_category_product` VALUES ('b9c19dd0-ad54-4535-8c21-4d5859e85232', 'feedb0d5-ca01-4690-88d4-e2287e1dacff');

-- ----------------------------
-- Table structure for c_color
-- ----------------------------
DROP TABLE IF EXISTS `c_color`;
CREATE TABLE `c_color`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `color` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_color
-- ----------------------------
INSERT INTO `c_color` VALUES ('1ecf1d27-1ad0-4185-aa6f-1516d7e950ca', 'Red', '#e74c3c');
INSERT INTO `c_color` VALUES ('209ba45c-c2b3-4117-a735-ea6c9af2b98a', 'Light Green', '#2ecc71');
INSERT INTO `c_color` VALUES ('25651135-7a4f-46ac-b361-75051b848221', 'White', '#fff');
INSERT INTO `c_color` VALUES ('4d21ab0a-3635-43db-8232-08b4eb044252', 'Grey', '#333');
INSERT INTO `c_color` VALUES ('50b27f95-ae87-4298-b5a1-a01b26584b27', 'Moss Green', '#6ab04c');
INSERT INTO `c_color` VALUES ('5fa048d4-5713-4b77-97bf-15554766956b', 'Pink', '#FDA7DF');
INSERT INTO `c_color` VALUES ('607de454-50c1-4140-96c9-180ad02452ba', 'blue', '#3498db');
INSERT INTO `c_color` VALUES ('67a5ead8-52b4-4728-8f8d-72859e24f77b', 'Dark Green', '#27ae60');
INSERT INTO `c_color` VALUES ('80ae1781-2b37-45a2-9e44-a3eef5ced05a', 'Yellow', '#f1c40f');
INSERT INTO `c_color` VALUES ('8c3e12cd-3901-4f4e-8475-c0218137a546', 'Black', '#000');
INSERT INTO `c_color` VALUES ('a8642612-c10c-47ab-b760-43786eb4a611', 'Orange', '#e67e22');
INSERT INTO `c_color` VALUES ('cd2fbedd-ba51-4a39-b69f-e303dc775b9c', 'Light Orange', '#ffbe76');
INSERT INTO `c_color` VALUES ('ec5fc7ad-c10a-442e-9200-fe2c36df3a47', 'Green', '#16a085');
INSERT INTO `c_color` VALUES ('fffd4b22-778d-403c-9a91-914313e04ef6', 'Dark Red', '#c0392b');

-- ----------------------------
-- Table structure for c_order
-- ----------------------------
DROP TABLE IF EXISTS `c_order`;
CREATE TABLE `c_order`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `version` int NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `order_details_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `fk_order_to_details`(`order_details_id` ASC) USING BTREE,
  CONSTRAINT `c_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `c_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_order_to_details` FOREIGN KEY (`order_details_id`) REFERENCES `c_order_details` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_order
-- ----------------------------
INSERT INTO `c_order` VALUES ('7d7f0fd3-0cc7-430e-b38f-77a44a831b8c', '2024-01-08 07:44:27', 'devhuunhan', '2024-01-08 07:44:27', 'devhuunhan', 0, '436f7600-6b84-4736-b2fe-15f2185e094f', 'defa29b3-29a4-4e67-804f-2a3d8b6b2043', 'AWAITING');
INSERT INTO `c_order` VALUES ('b4f58ea0-61ec-442b-b6af-ede5511d6359', '2023-12-12 17:00:15', 'devhuunhan', '2023-12-12 17:04:37', 'admin1', 3, '436f7600-6b84-4736-b2fe-15f2185e094f', '44448844-0fc7-47d2-93ad-adc6c164ee17', 'PENDING');

-- ----------------------------
-- Table structure for c_order_details
-- ----------------------------
DROP TABLE IF EXISTS `c_order_details`;
CREATE TABLE `c_order_details`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `VERSION` int NOT NULL,
  `num_of_product` int NOT NULL,
  `order_date` timestamp NULL DEFAULT NULL,
  `status` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shipping_cost` decimal(10, 2) NULL DEFAULT 0.00,
  `surcharge` decimal(10, 2) NULL DEFAULT 0.00,
  `total` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `final_total` decimal(10, 2) NOT NULL,
  `payment_method` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `payment_status` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_order_details
-- ----------------------------
INSERT INTO `c_order_details` VALUES ('44448844-0fc7-47d2-93ad-adc6c164ee17', '2023-12-12 17:00:15', 'devhuunhan', '2023-12-12 17:04:07', 'admin1', 1, 2, '2023-12-12 17:00:15', 'PREPARING_ORDER', '133/14 hà huy giap , Phường 13, Quận Gò Vấp, Thành phố Hồ Chí Minh', 0.00, 0.00, 750000.00, 620000.00, 'PAY_ON_DELIVERY', 'UNPAID', '0376571233');
INSERT INTO `c_order_details` VALUES ('defa29b3-29a4-4e67-804f-2a3d8b6b2043', '2024-01-08 07:44:27', 'devhuunhan', '2024-01-08 07:44:27', 'devhuunhan', 0, 1, '2024-01-08 07:44:27', 'NOT_READY', '111/111 Bẩy Chuồng , Phường Vĩnh Phúc, Quận Ba Đình, Thành phố Hà Nội', 0.00, 0.00, 400000.00, 340000.00, 'PAY_ON_DELIVERY', 'UNPAID', '0376571235');

-- ----------------------------
-- Table structure for c_order_details_item
-- ----------------------------
DROP TABLE IF EXISTS `c_order_details_item`;
CREATE TABLE `c_order_details_item`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quantity` int NOT NULL,
  `product_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `color` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `size` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `total` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `order_detail_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  INDEX `fk_item_to_details`(`order_detail_id` ASC) USING BTREE,
  CONSTRAINT `c_order_details_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `c_product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_item_to_details` FOREIGN KEY (`order_detail_id`) REFERENCES `c_order_details` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_order_details_item
-- ----------------------------
INSERT INTO `c_order_details_item` VALUES ('0f804232-7c51-43eb-ae2f-44a64a39df05', 1, '095694a2-ab6c-4213-992b-b622cd0416e4', 'blue', 'L', 340000.00, 'defa29b3-29a4-4e67-804f-2a3d8b6b2043');
INSERT INTO `c_order_details_item` VALUES ('c4ba1532-9e5e-4316-a016-a088323e90a3', 1, '095694a2-ab6c-4213-992b-b622cd0416e4', 'blue', 'L', 340000.00, '44448844-0fc7-47d2-93ad-adc6c164ee17');
INSERT INTO `c_order_details_item` VALUES ('e5d0889e-c448-47a0-9fa2-9c298419ee99', 1, '1c2f9ba5-38c6-4f42-a6dc-e1af5f846bb8', NULL, 'M', 280000.00, '44448844-0fc7-47d2-93ad-adc6c164ee17');

-- ----------------------------
-- Table structure for c_product
-- ----------------------------
DROP TABLE IF EXISTS `c_product`;
CREATE TABLE `c_product`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `VERSION` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `quantity` int NOT NULL,
  `sold` int NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `rate` float NULL DEFAULT 0,
  `likes` int NULL DEFAULT NULL,
  `discount` decimal(5, 2) NULL DEFAULT 0.00,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_product
-- ----------------------------
INSERT INTO `c_product` VALUES ('002a218f-11c9-4792-8cc9-f730aedd6e10', '2023-11-24 20:23:43', 'admin1', '2023-11-24 20:23:43', 'admin1', 0, 'Áo hoodie màu bơ new', 350000.00, 120, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!.', 0, 0, 20.00);
INSERT INTO `c_product` VALUES ('095694a2-ab6c-4213-992b-b622cd0416e4', '2023-11-24 20:27:16', 'admin1', '2023-11-24 20:27:16', 'admin1', 0, 'Áo hoodie xanh dương new', 400000.00, 200, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!.', 0, 0, 15.00);
INSERT INTO `c_product` VALUES ('1c2f9ba5-38c6-4f42-a6dc-e1af5f846bb8', '2023-11-24 20:32:51', 'admin1', '2023-11-24 20:32:51', 'admin1', 0, 'Áo hoodie cam họa tiết new', 350000.00, 100, 0, 'Áo sweater - Sự lựa chọn tuyệt vời cho phong cách ấm áp và thời thượng. Chất liệu cao cấp, êm ái và thoải mái, giúp bạn tự tin khoe sự phong độ trong mọi dịp. Thiết kế tối giản, trẻ trung và dễ dàng phối cùng nhiều trang phục. Với áo sweater này, bạn sẽ luôn nổi bật và tỏa sáng trong cảm giác thoải mái và ấm áp suốt cả ngày dài.', 0, 0, 20.00);
INSERT INTO `c_product` VALUES ('3423283f-2154-4dff-826a-d8e6d8a32a9c', '2023-11-24 20:35:43', 'admin1', '2023-11-24 20:35:43', 'admin1', 0, 'Hoodie jacket Red', 350000.00, 100, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!', 0, 0, 10.00);
INSERT INTO `c_product` VALUES ('344d18f8-9963-4cac-ab14-e65822e47406', '2023-11-24 20:39:02', 'admin1', '2023-11-24 20:39:02', 'admin1', 0, 'Hoodie jacket Black', 350000.00, 100, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!', 0, 0, 10.00);
INSERT INTO `c_product` VALUES ('3997ad1d-dc64-4c45-af58-2d4a935f5a98', '2023-11-24 20:28:49', 'admin1', '2023-11-24 20:28:49', 'admin1', 0, 'Sweater Front Yellow Mockup', 450000.00, 100, 0, 'Áo sweater - Sự lựa chọn tuyệt vời cho phong cách ấm áp và thời thượng. Chất liệu cao cấp, êm ái và thoải mái, giúp bạn tự tin khoe sự phong độ trong mọi dịp. Thiết kế tối giản, trẻ trung và dễ dàng phối cùng nhiều trang phục. Với áo sweater này, bạn sẽ luôn nổi bật và tỏa sáng trong cảm giác thoải mái và ấm áp suốt cả ngày dài.', 0, 0, 0.00);
INSERT INTO `c_product` VALUES ('459489c1-4989-4398-9918-8120123d7a0c', '2023-11-24 20:30:32', 'admin1', '2023-11-24 20:30:32', 'admin1', 0, 'Sweater Front Black', 400000.00, 100, 0, 'Áo sweater - Sự lựa chọn tuyệt vời cho phong cách ấm áp và thời thượng. Chất liệu cao cấp, êm ái và thoải mái, giúp bạn tự tin khoe sự phong độ trong mọi dịp. Thiết kế tối giản, trẻ trung và dễ dàng phối cùng nhiều trang phục. Với áo sweater này, bạn sẽ luôn nổi bật và tỏa sáng trong cảm giác thoải mái và ấm áp suốt cả ngày dài.', 0, 0, 10.00);
INSERT INTO `c_product` VALUES ('5c6c622e-4060-4a74-97f1-2940c8d71124', '2023-11-24 20:25:54', 'admin1', '2023-11-24 20:25:54', 'admin1', 0, 'Sweater Front Blue', 400000.00, 123, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!.', 0, 0, 15.00);
INSERT INTO `c_product` VALUES ('5ca60c31-cb43-4972-94e7-ffbb9cafabc4', '2023-11-24 20:27:56', 'admin1', '2023-11-24 20:27:56', 'admin1', 0, 'Áo hoodie đen họa tiết new', 350000.00, 200, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!.', 0, 0, 0.00);
INSERT INTO `c_product` VALUES ('616c611a-dc44-41d6-9b2f-8f45b5f4f244', '2023-11-24 20:29:56', 'admin1', '2023-11-24 20:29:56', 'admin1', 0, 'Sweater Front Light Pink', 450000.00, 100, 0, 'Áo sweater - Sự lựa chọn tuyệt vời cho phong cách ấm áp và thời thượng. Chất liệu cao cấp, êm ái và thoải mái, giúp bạn tự tin khoe sự phong độ trong mọi dịp. Thiết kế tối giản, trẻ trung và dễ dàng phối cùng nhiều trang phục. Với áo sweater này, bạn sẽ luôn nổi bật và tỏa sáng trong cảm giác thoải mái và ấm áp suốt cả ngày dài.', 0, 0, 10.00);
INSERT INTO `c_product` VALUES ('68a6957f-bbd7-487e-91b1-a40aafea3f9a', '2023-11-24 20:26:32', 'admin1', '2023-11-24 20:26:32', 'admin1', 0, 'Áo hoodie đen trơn', 350000.00, 123, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!.', 0, 0, 15.00);
INSERT INTO `c_product` VALUES ('6b533a0c-7141-4f36-9261-fc5b97c95733', '2023-11-24 20:36:24', 'admin1', '2023-11-24 20:36:24', 'admin1', 0, 'Sweater Front Dark Green', 400000.00, 100, 0, 'Áo sweater - Sự lựa chọn tuyệt vời cho phong cách ấm áp và thời thượng. Chất liệu cao cấp, êm ái và thoải mái, giúp bạn tự tin khoe sự phong độ trong mọi dịp. Thiết kế tối giản, trẻ trung và dễ dàng phối cùng nhiều trang phục. Với áo sweater này, bạn sẽ luôn nổi bật và tỏa sáng trong cảm giác thoải mái và ấm áp suốt cả ngày dài.', 0, 0, 10.00);
INSERT INTO `c_product` VALUES ('7d53bf09-b954-488b-8eda-3eefe9e3f0f6', '2023-11-24 20:17:54', 'admin1', '2023-11-24 20:17:54', 'admin1', 0, 'Sweater Front White', 400000.00, 100, 0, 'Áo sweater - Sự lựa chọn tuyệt vời cho phong cách ấm áp và thời thượng. Chất liệu cao cấp, êm ái và thoải mái, giúp bạn tự tin khoe sự phong độ trong mọi dịp. Thiết kế tối giản, trẻ trung và dễ dàng phối cùng nhiều trang phục. Với áo sweater này, bạn sẽ luôn nổi bật và tỏa sáng trong cảm giác thoải mái và ấm áp suốt cả ngày dài.', 0, 0, 10.00);
INSERT INTO `c_product` VALUES ('a465e851-3e49-47ae-b61b-2c305ef8554c', '2023-11-24 20:40:36', 'admin1', '2023-11-24 20:40:36', 'admin1', 0, 'Áo hoodie da cam họa tiết new', 350000.00, 100, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!', 0, 0, 10.00);
INSERT INTO `c_product` VALUES ('a8f2c72e-21a9-4f97-a62c-eda13feff6f9', '2023-11-24 20:41:48', 'admin1', '2023-12-12 14:55:32', 'admin1', 3, 'Áo hoodie xanh rêu NEW', 400000.00, 100, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!', 0, 0, 9.00);
INSERT INTO `c_product` VALUES ('a9444bfb-573f-4046-ad0d-223b75f0d681', '2023-11-24 20:34:58', 'admin1', '2023-11-24 20:34:58', 'admin1', 0, 'Sweater Front Dark Red', 400000.00, 100, 0, 'Áo sweater - Sự lựa chọn tuyệt vời cho phong cách ấm áp và thời thượng. Chất liệu cao cấp, êm ái và thoải mái, giúp bạn tự tin khoe sự phong độ trong mọi dịp. Thiết kế tối giản, trẻ trung và dễ dàng phối cùng nhiều trang phục. Với áo sweater này, bạn sẽ luôn nổi bật và tỏa sáng trong cảm giác thoải mái và ấm áp suốt cả ngày dài.', 0, 0, 10.00);
INSERT INTO `c_product` VALUES ('aa86d9ad-1228-4dde-b872-cee5dead2aea', '2023-11-24 20:20:29', 'admin1', '2023-11-24 20:20:29', 'admin1', 0, 'Hoodie jacket Orange', 350000.00, 100, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!.', 0, 0, 0.00);
INSERT INTO `c_product` VALUES ('c62d587c-88d4-4d16-867a-804b5c1f5574', '2023-11-24 20:33:59', 'admin1', '2023-11-24 20:33:59', 'admin1', 0, 'Sweater Front Yellow', 400000.00, 100, 0, 'Áo sweater - Sự lựa chọn tuyệt vời cho phong cách ấm áp và thời thượng. Chất liệu cao cấp, êm ái và thoải mái, giúp bạn tự tin khoe sự phong độ trong mọi dịp. Thiết kế tối giản, trẻ trung và dễ dàng phối cùng nhiều trang phục. Với áo sweater này, bạn sẽ luôn nổi bật và tỏa sáng trong cảm giác thoải mái và ấm áp suốt cả ngày dài.', 0, 0, 20.00);
INSERT INTO `c_product` VALUES ('ee2d0e15-ba13-4620-afeb-370d966b2b98', '2023-11-24 20:25:00', 'admin1', '2023-11-24 20:25:00', 'admin1', 0, 'Hoodie jacket Rainbow Night', 350000.00, 123, 0, 'Chào mừng bạn đến với bộ sưu tập áo hoodie của chúng tôi! Áo hoodie được chế tác từ chất liệu cao cấp, mang đến sự thoải mái và phong cách. Với thiết kế cổ tròn và tay dài, áo hoodie này giữ ấm áp và tạo nên vẻ ngoài trẻ trung, lịch lãm. Màu đen tối giản dễ dàng phối hợp với nhiều trang phục khác nhau, thích hợp cho cả nam và nữ. Sở hữu ngay món đồ thời trang này để thêm điểm nhấn cho phong cách cá nhân độc đáo của bạn!.', 0, 0, 15.00);
INSERT INTO `c_product` VALUES ('feedb0d5-ca01-4690-88d4-e2287e1dacff', '2023-11-24 20:31:44', 'admin1', '2023-11-24 20:31:44', 'admin1', 0, 'Sweater Front Light Green', 400000.00, 100, 0, 'Áo sweater - Sự lựa chọn tuyệt vời cho phong cách ấm áp và thời thượng. Chất liệu cao cấp, êm ái và thoải mái, giúp bạn tự tin khoe sự phong độ trong mọi dịp. Thiết kế tối giản, trẻ trung và dễ dàng phối cùng nhiều trang phục. Với áo sweater này, bạn sẽ luôn nổi bật và tỏa sáng trong cảm giác thoải mái và ấm áp suốt cả ngày dài.', 0, 0, 10.00);

-- ----------------------------
-- Table structure for c_product_color
-- ----------------------------
DROP TABLE IF EXISTS `c_product_color`;
CREATE TABLE `c_product_color`  (
  `color_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`color_id`, `product_id`) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `c_product_color_ibfk_1` FOREIGN KEY (`color_id`) REFERENCES `c_color` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_product_color_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `c_product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_product_color
-- ----------------------------
INSERT INTO `c_product_color` VALUES ('ec5fc7ad-c10a-442e-9200-fe2c36df3a47', '002a218f-11c9-4792-8cc9-f730aedd6e10');
INSERT INTO `c_product_color` VALUES ('607de454-50c1-4140-96c9-180ad02452ba', '095694a2-ab6c-4213-992b-b622cd0416e4');
INSERT INTO `c_product_color` VALUES ('a8642612-c10c-47ab-b760-43786eb4a611', '1c2f9ba5-38c6-4f42-a6dc-e1af5f846bb8');
INSERT INTO `c_product_color` VALUES ('1ecf1d27-1ad0-4185-aa6f-1516d7e950ca', '3423283f-2154-4dff-826a-d8e6d8a32a9c');
INSERT INTO `c_product_color` VALUES ('8c3e12cd-3901-4f4e-8475-c0218137a546', '344d18f8-9963-4cac-ab14-e65822e47406');
INSERT INTO `c_product_color` VALUES ('80ae1781-2b37-45a2-9e44-a3eef5ced05a', '3997ad1d-dc64-4c45-af58-2d4a935f5a98');
INSERT INTO `c_product_color` VALUES ('8c3e12cd-3901-4f4e-8475-c0218137a546', '459489c1-4989-4398-9918-8120123d7a0c');
INSERT INTO `c_product_color` VALUES ('607de454-50c1-4140-96c9-180ad02452ba', '5c6c622e-4060-4a74-97f1-2940c8d71124');
INSERT INTO `c_product_color` VALUES ('8c3e12cd-3901-4f4e-8475-c0218137a546', '5ca60c31-cb43-4972-94e7-ffbb9cafabc4');
INSERT INTO `c_product_color` VALUES ('5fa048d4-5713-4b77-97bf-15554766956b', '616c611a-dc44-41d6-9b2f-8f45b5f4f244');
INSERT INTO `c_product_color` VALUES ('8c3e12cd-3901-4f4e-8475-c0218137a546', '68a6957f-bbd7-487e-91b1-a40aafea3f9a');
INSERT INTO `c_product_color` VALUES ('67a5ead8-52b4-4728-8f8d-72859e24f77b', '6b533a0c-7141-4f36-9261-fc5b97c95733');
INSERT INTO `c_product_color` VALUES ('25651135-7a4f-46ac-b361-75051b848221', '7d53bf09-b954-488b-8eda-3eefe9e3f0f6');
INSERT INTO `c_product_color` VALUES ('cd2fbedd-ba51-4a39-b69f-e303dc775b9c', 'a465e851-3e49-47ae-b61b-2c305ef8554c');
INSERT INTO `c_product_color` VALUES ('50b27f95-ae87-4298-b5a1-a01b26584b27', 'a8f2c72e-21a9-4f97-a62c-eda13feff6f9');
INSERT INTO `c_product_color` VALUES ('fffd4b22-778d-403c-9a91-914313e04ef6', 'a9444bfb-573f-4046-ad0d-223b75f0d681');
INSERT INTO `c_product_color` VALUES ('a8642612-c10c-47ab-b760-43786eb4a611', 'aa86d9ad-1228-4dde-b872-cee5dead2aea');
INSERT INTO `c_product_color` VALUES ('80ae1781-2b37-45a2-9e44-a3eef5ced05a', 'c62d587c-88d4-4d16-867a-804b5c1f5574');
INSERT INTO `c_product_color` VALUES ('8c3e12cd-3901-4f4e-8475-c0218137a546', 'ee2d0e15-ba13-4620-afeb-370d966b2b98');
INSERT INTO `c_product_color` VALUES ('209ba45c-c2b3-4117-a735-ea6c9af2b98a', 'feedb0d5-ca01-4690-88d4-e2287e1dacff');

-- ----------------------------
-- Table structure for c_product_images
-- ----------------------------
DROP TABLE IF EXISTS `c_product_images`;
CREATE TABLE `c_product_images`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `c_product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `c_product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_product_images
-- ----------------------------
INSERT INTO `c_product_images` VALUES ('0849d29a-04a3-4186-b0f5-b59df543e8ff', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748669/devshop/product/sweater/dark-red-sweater_uiccku.jpg', 'a9444bfb-573f-4046-ad0d-223b75f0d681');
INSERT INTO `c_product_images` VALUES ('0d475399-d87e-42d5-9253-4dfe12fcbcfa', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748669/devshop/product/sweater/yellow-sweater_doy2xr.jpg', 'c62d587c-88d4-4d16-867a-804b5c1f5574');
INSERT INTO `c_product_images` VALUES ('1a95f24d-4648-4795-900f-5787081d6b3f', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748671/devshop/product/sweater/pink-sweater_jke2sk.jpg', '616c611a-dc44-41d6-9b2f-8f45b5f4f244');
INSERT INTO `c_product_images` VALUES ('216cb628-c1ae-4ad5-974a-d8366d956974', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748670/devshop/product/sweater/green-sweater_lrfhwl.jpg', 'feedb0d5-ca01-4690-88d4-e2287e1dacff');
INSERT INTO `c_product_images` VALUES ('2c1eb6cb-dba5-42b6-a364-7cf20e09cb74', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748669/devshop/product/hoodie/orange-hoodie_u8bggi.jpg', 'aa86d9ad-1228-4dde-b872-cee5dead2aea');
INSERT INTO `c_product_images` VALUES ('2c7d3dd9-cb78-421d-8f40-f43203d159ed', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748674/devshop/product/hoodie/red-hoodie_z2bx9u.jpg', '3423283f-2154-4dff-826a-d8e6d8a32a9c');
INSERT INTO `c_product_images` VALUES ('594519ac-e151-47e4-84c4-119de980e6d0', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748669/devshop/product/sweater/yellow-sweater-mockup_vrq34j.jpg', '3997ad1d-dc64-4c45-af58-2d4a935f5a98');
INSERT INTO `c_product_images` VALUES ('5aba36de-1f76-4930-8023-7fb9cc0e77fc', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748671/devshop/product/sweater/white-front-sweater_tnpg0g.jpg', '7d53bf09-b954-488b-8eda-3eefe9e3f0f6');
INSERT INTO `c_product_images` VALUES ('6d70ded4-0591-4eb3-80d6-c32726ef4f10', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748668/devshop/product/hoodie/hoodie-den-hoa-tiet_j7pfvd.jpg', '5ca60c31-cb43-4972-94e7-ffbb9cafabc4');
INSERT INTO `c_product_images` VALUES ('6db22659-bcaf-42b7-9f93-dd99cf2e2bb3', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748669/devshop/product/sweater/blue-sweater_zqes1t.jpg', '5c6c622e-4060-4a74-97f1-2940c8d71124');
INSERT INTO `c_product_images` VALUES ('79e33830-4216-4492-9ea8-ecd694fe4185', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748670/devshop/product/sweater/black-sweater_vbdsyi.jpg', '459489c1-4989-4398-9918-8120123d7a0c');
INSERT INTO `c_product_images` VALUES ('93e815d5-906a-4d2f-a842-b87b56ac6099', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748669/devshop/product/hoodie/hoodie-xam-xanh_kzanpz.jpg', '002a218f-11c9-4792-8cc9-f730aedd6e10');
INSERT INTO `c_product_images` VALUES ('956ef6a1-0a01-4855-96d6-14469b7b9dfc', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748667/devshop/product/hoodie/hoodie-xanh-duong_r4l2du.jpg', '095694a2-ab6c-4213-992b-b622cd0416e4');
INSERT INTO `c_product_images` VALUES ('956f08b6-cfac-4832-b4b5-92bbcd4232d3', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748669/devshop/product/hoodie/hoodie-cam_gqdgvb.jpg', '1c2f9ba5-38c6-4f42-a6dc-e1af5f846bb8');
INSERT INTO `c_product_images` VALUES ('a31de679-325d-4152-943a-5612d08e7eec', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748669/devshop/product/hoodie/night-hoodie_nmmu8o.jpg', 'ee2d0e15-ba13-4620-afeb-370d966b2b98');
INSERT INTO `c_product_images` VALUES ('a64e7474-e64e-4d8a-aba5-5d850b3bcb3a', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748668/devshop/product/hoodie/hoodie-da-cam_eq7nj6.jpg', 'a465e851-3e49-47ae-b61b-2c305ef8554c');
INSERT INTO `c_product_images` VALUES ('af01e760-d3c4-48bb-9a1b-c60352c522c3', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748667/devshop/product/sweater/dark-green_aehgbu.webp', '6b533a0c-7141-4f36-9261-fc5b97c95733');
INSERT INTO `c_product_images` VALUES ('b9fb3308-1928-4a94-b106-deb7170171e3', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748668/devshop/product/hoodie/black-hoodie_y1wydo.jpg', '344d18f8-9963-4cac-ab14-e65822e47406');
INSERT INTO `c_product_images` VALUES ('efcbb5be-adeb-4a58-b5f0-6f3d9270881f', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748669/devshop/product/hoodie/hoodie-xanh-reu_yjkgwf.jpg', 'a8f2c72e-21a9-4f97-a62c-eda13feff6f9');
INSERT INTO `c_product_images` VALUES ('f20528e1-330c-4799-b748-31e6cb1dcbb5', 'https://res.cloudinary.com/devshopcloud/image/upload/v1692748667/devshop/product/hoodie/hoodie-den-tron_m9o9l2.jpg', '68a6957f-bbd7-487e-91b1-a40aafea3f9a');

-- ----------------------------
-- Table structure for c_product_size
-- ----------------------------
DROP TABLE IF EXISTS `c_product_size`;
CREATE TABLE `c_product_size`  (
  `size_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`size_id`, `product_id`) USING BTREE,
  INDEX `product_id`(`product_id` ASC) USING BTREE,
  CONSTRAINT `c_product_size_ibfk_1` FOREIGN KEY (`size_id`) REFERENCES `c_size` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_product_size_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `c_product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_product_size
-- ----------------------------
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '002a218f-11c9-4792-8cc9-f730aedd6e10');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '002a218f-11c9-4792-8cc9-f730aedd6e10');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '002a218f-11c9-4792-8cc9-f730aedd6e10');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '002a218f-11c9-4792-8cc9-f730aedd6e10');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '095694a2-ab6c-4213-992b-b622cd0416e4');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '095694a2-ab6c-4213-992b-b622cd0416e4');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '095694a2-ab6c-4213-992b-b622cd0416e4');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '095694a2-ab6c-4213-992b-b622cd0416e4');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '1c2f9ba5-38c6-4f42-a6dc-e1af5f846bb8');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '1c2f9ba5-38c6-4f42-a6dc-e1af5f846bb8');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '1c2f9ba5-38c6-4f42-a6dc-e1af5f846bb8');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '1c2f9ba5-38c6-4f42-a6dc-e1af5f846bb8');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '3423283f-2154-4dff-826a-d8e6d8a32a9c');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '3423283f-2154-4dff-826a-d8e6d8a32a9c');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '3423283f-2154-4dff-826a-d8e6d8a32a9c');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '3423283f-2154-4dff-826a-d8e6d8a32a9c');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '344d18f8-9963-4cac-ab14-e65822e47406');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '344d18f8-9963-4cac-ab14-e65822e47406');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '344d18f8-9963-4cac-ab14-e65822e47406');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '344d18f8-9963-4cac-ab14-e65822e47406');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '3997ad1d-dc64-4c45-af58-2d4a935f5a98');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '3997ad1d-dc64-4c45-af58-2d4a935f5a98');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '3997ad1d-dc64-4c45-af58-2d4a935f5a98');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '3997ad1d-dc64-4c45-af58-2d4a935f5a98');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '459489c1-4989-4398-9918-8120123d7a0c');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '459489c1-4989-4398-9918-8120123d7a0c');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '459489c1-4989-4398-9918-8120123d7a0c');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '459489c1-4989-4398-9918-8120123d7a0c');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '5c6c622e-4060-4a74-97f1-2940c8d71124');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '5c6c622e-4060-4a74-97f1-2940c8d71124');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '5c6c622e-4060-4a74-97f1-2940c8d71124');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '5c6c622e-4060-4a74-97f1-2940c8d71124');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '5ca60c31-cb43-4972-94e7-ffbb9cafabc4');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '5ca60c31-cb43-4972-94e7-ffbb9cafabc4');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '5ca60c31-cb43-4972-94e7-ffbb9cafabc4');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '5ca60c31-cb43-4972-94e7-ffbb9cafabc4');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '616c611a-dc44-41d6-9b2f-8f45b5f4f244');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '616c611a-dc44-41d6-9b2f-8f45b5f4f244');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '616c611a-dc44-41d6-9b2f-8f45b5f4f244');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '616c611a-dc44-41d6-9b2f-8f45b5f4f244');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '68a6957f-bbd7-487e-91b1-a40aafea3f9a');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '68a6957f-bbd7-487e-91b1-a40aafea3f9a');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '68a6957f-bbd7-487e-91b1-a40aafea3f9a');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '68a6957f-bbd7-487e-91b1-a40aafea3f9a');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '6b533a0c-7141-4f36-9261-fc5b97c95733');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '6b533a0c-7141-4f36-9261-fc5b97c95733');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '6b533a0c-7141-4f36-9261-fc5b97c95733');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '6b533a0c-7141-4f36-9261-fc5b97c95733');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', '7d53bf09-b954-488b-8eda-3eefe9e3f0f6');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', '7d53bf09-b954-488b-8eda-3eefe9e3f0f6');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', '7d53bf09-b954-488b-8eda-3eefe9e3f0f6');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', '7d53bf09-b954-488b-8eda-3eefe9e3f0f6');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', 'a465e851-3e49-47ae-b61b-2c305ef8554c');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', 'a465e851-3e49-47ae-b61b-2c305ef8554c');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', 'a465e851-3e49-47ae-b61b-2c305ef8554c');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', 'a465e851-3e49-47ae-b61b-2c305ef8554c');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', 'a8f2c72e-21a9-4f97-a62c-eda13feff6f9');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', 'a8f2c72e-21a9-4f97-a62c-eda13feff6f9');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', 'a8f2c72e-21a9-4f97-a62c-eda13feff6f9');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', 'a8f2c72e-21a9-4f97-a62c-eda13feff6f9');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', 'a9444bfb-573f-4046-ad0d-223b75f0d681');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', 'a9444bfb-573f-4046-ad0d-223b75f0d681');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', 'a9444bfb-573f-4046-ad0d-223b75f0d681');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', 'a9444bfb-573f-4046-ad0d-223b75f0d681');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', 'aa86d9ad-1228-4dde-b872-cee5dead2aea');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', 'aa86d9ad-1228-4dde-b872-cee5dead2aea');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', 'aa86d9ad-1228-4dde-b872-cee5dead2aea');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', 'aa86d9ad-1228-4dde-b872-cee5dead2aea');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', 'c62d587c-88d4-4d16-867a-804b5c1f5574');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', 'c62d587c-88d4-4d16-867a-804b5c1f5574');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', 'c62d587c-88d4-4d16-867a-804b5c1f5574');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', 'c62d587c-88d4-4d16-867a-804b5c1f5574');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', 'ee2d0e15-ba13-4620-afeb-370d966b2b98');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', 'ee2d0e15-ba13-4620-afeb-370d966b2b98');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', 'ee2d0e15-ba13-4620-afeb-370d966b2b98');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', 'ee2d0e15-ba13-4620-afeb-370d966b2b98');
INSERT INTO `c_product_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', 'feedb0d5-ca01-4690-88d4-e2287e1dacff');
INSERT INTO `c_product_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', 'feedb0d5-ca01-4690-88d4-e2287e1dacff');
INSERT INTO `c_product_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', 'feedb0d5-ca01-4690-88d4-e2287e1dacff');
INSERT INTO `c_product_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', 'feedb0d5-ca01-4690-88d4-e2287e1dacff');

-- ----------------------------
-- Table structure for c_refresh_token
-- ----------------------------
DROP TABLE IF EXISTS `c_refresh_token`;
CREATE TABLE `c_refresh_token`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `refresh_token`(`refresh_token` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `c_refresh_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `c_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_refresh_token
-- ----------------------------
INSERT INTO `c_refresh_token` VALUES ('4b84df0f-e3d3-40e2-8ea9-84cbe776c999', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXZodXVuaGFuIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTcwMjM3NTA3OCwiZXhwIjoxNzAyNDgzMDc4fQ.u90vjHwBvW-kDerE-Rkp4pkf8XAMnmK9aoPMF5mmPpgfu9B34S6BawVMRBbIEGFRnQLIsipLKWiHfOmmfx-UJw', '436f7600-6b84-4736-b2fe-15f2185e094f');
INSERT INTO `c_refresh_token` VALUES ('84dc1b94-839f-4c74-9644-856f2f9f4292', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXZodXVuaGFuIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJpYXQiOjE3MDQ2NzQwNTgsImV4cCI6MTcwNDc4MjA1OH0.jXrUeOTJCHzZyOafC4ufcnLD4tFIHL7LZp2ELThG3RTZ7hBE5RQS4qmWL1W-ffi4CD5T0x_Cp-EpEgEWWxru7Q', '436f7600-6b84-4736-b2fe-15f2185e094f');

-- ----------------------------
-- Table structure for c_role
-- ----------------------------
DROP TABLE IF EXISTS `c_role`;
CREATE TABLE `c_role`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `VERSION` int NOT NULL,
  `code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_role
-- ----------------------------
INSERT INTO `c_role` VALUES ('027f82e4-a564-d19b-f257-94bed336d833', '2022-08-19 07:52:49', 'N6loHKZcRA', '2023-10-31 20:16:22', 'tranhuunhan', 1, 'ROLE_ADMIN', 'role admin');
INSERT INTO `c_role` VALUES ('3c3e8b49-33c0-97bb-952f-5380b26eb173', '2017-10-12 01:04:41', '5U8UOD5ZM4', '2011-12-29 22:24:42', 'zdeTlax2Rf', 0, 'ROLE_USER', 'T13nIH2wDH');

-- ----------------------------
-- Table structure for c_size
-- ----------------------------
DROP TABLE IF EXISTS `c_size`;
CREATE TABLE `c_size`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `size` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_size
-- ----------------------------
INSERT INTO `c_size` VALUES ('1b2c1632-7963-42d7-9ce5-57ac7470522e', 'XL');
INSERT INTO `c_size` VALUES ('5a31cae4-f710-4a8c-90ce-7c1840c23f9e', 'M');
INSERT INTO `c_size` VALUES ('68531e5d-41e4-4d10-9111-24f682411881', 'L');
INSERT INTO `c_size` VALUES ('d95e59c5-8dfb-414f-8b2a-554a373af593', 'S');

-- ----------------------------
-- Table structure for c_user
-- ----------------------------
DROP TABLE IF EXISTS `c_user`;
CREATE TABLE `c_user`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_modified_at` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `version` int NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `display_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cart_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE,
  INDEX `FK_user_cart`(`cart_id` ASC) USING BTREE,
  CONSTRAINT `FK_user_cart` FOREIGN KEY (`cart_id`) REFERENCES `c_cart` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_user
-- ----------------------------
INSERT INTO `c_user` VALUES ('436f7600-6b84-4736-b2fe-15f2185e094f', '2023-12-12 16:57:37', 'anonymousUser', '2023-12-12 17:07:25', 'devhuunhan', 2, 'devhuunhan', '$2a$10$Jh0r3rnG7kpO/MYFIctuQu9ytPfkMFLE33mWPrsKrGo8rQkt.ZLLW', 'Huu Nhan', NULL, NULL, '0376571235', 'devhuunhan@gmail.com', NULL, 'ACTIVE', 'cfcfc2b1-d8ea-4a85-88d6-99fe3aacb6a5');
INSERT INTO `c_user` VALUES ('5f337d2e-2d6e-4fcd-9e85-dd8bb5746796', '2023-11-18 19:44:37', 'anonymousUser', '2023-12-08 22:22:20', 'admin1', 1, 'admin1', '$2a$10$NKPzln.5YxXVxbFIYg1Ofe/4Cm1p4uBCL7pI0osscviDsRgJkSZzi', 'Admin 1', NULL, NULL, '09213213421', 'admin1@gmail.com', NULL, 'ACTIVE', 'bf5739d7-1fa3-4a28-aef4-d420b6544b85');
INSERT INTO `c_user` VALUES ('e628639f-289b-450c-baa0-cde2b90b8b7a', '2023-11-24 18:08:13', 'anonymousUser', '2023-12-10 13:18:00', 'tranhuunhan', 15, 'tranhuunhan', '$2a$10$QVAhXQlFk9uSxXu6kfZiwO8.NEf33yprhm/d6a1uZKnKB35ZP8FpK', 'Tran Huu Nhan', NULL, NULL, '0376578609', 'nhandeptrai137@gmail.com', NULL, 'ACTIVE', '370845db-471f-49b2-bd59-af8e7d741c00');

-- ----------------------------
-- Table structure for c_user_address
-- ----------------------------
DROP TABLE IF EXISTS `c_user_address`;
CREATE TABLE `c_user_address`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `district` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ward` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_default` bit(1) NULL DEFAULT b'0',
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `c_user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `c_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_user_address
-- ----------------------------
INSERT INTO `c_user_address` VALUES ('33c2ff66-2f19-40a9-aabd-912a4effa6e4', 'HA huy giap 2', 'phuong thanh loc', 'quan 12', 'Ho Chi Minh', b'1', '5f337d2e-2d6e-4fcd-9e85-dd8bb5746796');
INSERT INTO `c_user_address` VALUES ('fb3d1086-faff-4e2e-b2ab-bda03d8d6618', '133/14 hà huy giap', 'Quận Ba Đình', 'Phường Phúc Xá', 'Thành phố Hà Nội', b'1', 'e628639f-289b-450c-baa0-cde2b90b8b7a');
INSERT INTO `c_user_address` VALUES ('6d4f882e-b783-49ea-8f8b-858314c941ff', '12 Bình Dương', 'Huyện Pác Nặm', 'Xã Giáo Hiệu', 'Tỉnh Bắc Kạn', b'0', '436f7600-6b84-4736-b2fe-15f2185e094f');
INSERT INTO `c_user_address` VALUES ('ecde7b37-e6c3-4ac8-b647-76865e0f45fe', '111/111 Bẩy Chuồng', 'Quận Ba Đình', 'Phường Vĩnh Phúc', 'Thành phố Hà Nội', b'1', '436f7600-6b84-4736-b2fe-15f2185e094f');

-- ----------------------------
-- Table structure for c_user_role
-- ----------------------------
DROP TABLE IF EXISTS `c_user_role`;
CREATE TABLE `c_user_role`  (
  `role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`role_id`, `user_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `c_user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `c_role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `c_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of c_user_role
-- ----------------------------
INSERT INTO `c_user_role` VALUES ('027f82e4-a564-d19b-f257-94bed336d833', '436f7600-6b84-4736-b2fe-15f2185e094f');
INSERT INTO `c_user_role` VALUES ('3c3e8b49-33c0-97bb-952f-5380b26eb173', '436f7600-6b84-4736-b2fe-15f2185e094f');
INSERT INTO `c_user_role` VALUES ('027f82e4-a564-d19b-f257-94bed336d833', '5f337d2e-2d6e-4fcd-9e85-dd8bb5746796');
INSERT INTO `c_user_role` VALUES ('3c3e8b49-33c0-97bb-952f-5380b26eb173', 'e628639f-289b-450c-baa0-cde2b90b8b7a');

SET FOREIGN_KEY_CHECKS = 1;
