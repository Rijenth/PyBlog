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


DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `admin` tinyint(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT into `Users` (`id`, `username`, `password`, `firstName`, `lastName`, `email`, `admin`) VALUES 
    (1, 'admin', '$2b$12$tv73iMZ1gQZZC4f/bXLPpO7Jxt6GcYFcjExnX7P7YNktpzHJ4X4A2', 'Admin', 'Admin', 'admin@admin.fr', 1);

-- 2022-11-15 20:28:58
