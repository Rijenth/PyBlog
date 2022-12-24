-- Adminer 4.8.1 MySQL 5.7.24 dump

SET NAMES utf8;

SET time_zone = '+00:00';

SET foreign_key_checks = 0;

SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `Articles`;

CREATE TABLE `Articles` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `body` text NOT NULL, 
    `author` varchar(255) NOT NULL,
    `date` date NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `Articles` (`id`, `title`, `body`, `author`, `date`) VALUES 
    (1, 'Article 1', 'This is the body of article 1', 'John Doe', '2021-11-15 20:28:58'),
    (2, 'Article 2', 'This is the body of article 2', 'Jane Doe', '2021-11-15 20:28:58'),
    (3, 'Article 3', 'This is the body of article 3', 'Jacob Doe', '2021-11-15 20:28:58');

-- 2022-11-15 20:28:58
