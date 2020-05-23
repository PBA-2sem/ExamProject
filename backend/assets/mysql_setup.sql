CREATE TABLE IF NOT EXISTS `biglers_biler`.`user` (
  `id` VARCHAR(36), -- Stored as UUID 
  `username` VARCHAR(16) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `age` INT NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))