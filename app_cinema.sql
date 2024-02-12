-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 11 fév. 2024 à 05:18
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `app_cinema`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_cat` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name_cat`) VALUES
(1, 'drame'),
(2, 'comédie'),
(3, 'thriller'),
(4, 'fantastique'),
(5, 'science-fiction'),
(6, 'film d\'animation');

-- --------------------------------------------------------

--
-- Structure de la table `categories_movies`
--

DROP TABLE IF EXISTS `categories_movies`;
CREATE TABLE IF NOT EXISTS `categories_movies` (
  `categories_id` int UNSIGNED NOT NULL,
  `movies_id` int UNSIGNED NOT NULL,
  KEY `fk_categories_movies_movies_idx` (`movies_id`),
  KEY `fk_categories_movies_categories1_idx` (`categories_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categories_movies`
--

INSERT INTO `categories_movies` (`categories_id`, `movies_id`) VALUES
(4, 1),
(2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `cinemas`
--

DROP TABLE IF EXISTS `cinemas`;
CREATE TABLE IF NOT EXISTS `cinemas` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_cinema` varchar(45) NOT NULL,
  `manager` varchar(45) NOT NULL,
  `address_cine` varchar(255) NOT NULL,
  `phone_cine` int UNSIGNED NOT NULL,
  `email_cine` varchar(50) NOT NULL,
  `infos_cine` text NOT NULL,
  `nbr_theater` int UNSIGNED NOT NULL,
  `disabled_access` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `cinemas`
--

INSERT INTO `cinemas` (`id`, `name_cinema`, `manager`, `address_cine`, `phone_cine`, `email_cine`, `infos_cine`, `nbr_theater`, `disabled_access`) VALUES
(1, 'Cinéma Fun', 'Mr Anastasio Rupert', '330 Avenue des Cyprès, \r\n13190 Aix en Provence', 4294967295, 'cinema.fun@gmail.fr', 'Les cinémas Fun sont une entreprise familiale. Cinéma de quartier depuis le tout début, nous évoluons sans cesse pour vous donner une meilleure expérience d\'immersion de votre séance de cinéma.\r\nAfin d\'apporter un plus à cette expérience, nous vous proposons ce tout nouveau site, qui répond à votre problématique de réservation et de sélection de film.\r\nMerci de nous être fidèle depuis toutes ses années.\r\nNous espérons qu\'ensemble, nous continuerons à faire évoluer notre entreprise.', 5, 'Accès handicapé, rampe de sécurité, sortie de secours, place parking handicapé devant le cinéma, ascenseur, toilettes handicapées, zone pour fauteuil roulant dans la salle.');

-- --------------------------------------------------------

--
-- Structure de la table `media`
--

DROP TABLE IF EXISTS `media`;
CREATE TABLE IF NOT EXISTS `media` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `src_media` varchar(150) NOT NULL,
  `alt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type_media` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `media`
--

INSERT INTO `media` (`id`, `src_media`, `alt`, `type_media`) VALUES
(1, 'pauvres-creatures.jpg', 'affiche du film pauvres créatures', 'img'),
(2, 'https://www.youtube.com/embed/32vmnIuURCo?si=HprNr7Hl_a8b0FyZ', 'bande-annonce de pauvre créature', 'video');

-- --------------------------------------------------------

--
-- Structure de la table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `release_date` year NOT NULL,
  `synopsis` text NOT NULL,
  `director` varchar(45) NOT NULL,
  `time` time NOT NULL,
  `actor` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `movies`
--

INSERT INTO `movies` (`id`, `title`, `release_date`, `synopsis`, `director`, `time`, `actor`) VALUES
(1, 'film 01', '1999', 'le film numéro 1 des salles obscures', 'réalisateur 01', '01:50:00', 'acteur 1, acteur 2, acteur 3');

-- --------------------------------------------------------

--
-- Structure de la table `movies_media`
--

DROP TABLE IF EXISTS `movies_media`;
CREATE TABLE IF NOT EXISTS `movies_media` (
  `movies_id` int UNSIGNED NOT NULL,
  `media_id` int UNSIGNED NOT NULL,
  KEY `fk_movies_media_movies1_idx` (`movies_id`),
  KEY `fk_movies_media_media1_idx` (`media_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `movies_media`
--

INSERT INTO `movies_media` (`movies_id`, `media_id`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `movie_theaters`
--

DROP TABLE IF EXISTS `movie_theaters`;
CREATE TABLE IF NOT EXISTS `movie_theaters` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_theater` varchar(45) NOT NULL,
  `nbr_seats` int UNSIGNED NOT NULL,
  `disabled_access` varchar(255) NOT NULL,
  `cinemas_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_movie_theaters_cinemas1_idx` (`cinemas_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `users_id` int UNSIGNED NOT NULL,
  `sessions_id` int UNSIGNED NOT NULL,
  `order_date` datetime NOT NULL,
  `price_order` decimal(6,2) UNSIGNED NOT NULL,
  `num_CB` int UNSIGNED NOT NULL,
  `cb_date` date NOT NULL,
  `cryptogramme` int UNSIGNED NOT NULL,
  KEY `fk_orders_sessions1_idx` (`sessions_id`),
  KEY `fk_orders_users1_idx` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name_role`) VALUES
(1, 'admin'),
(2, 'membre'),
(3, 'visiteur');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_date` datetime NOT NULL,
  `price` decimal(6,2) UNSIGNED NOT NULL,
  `language` varchar(45) NOT NULL,
  `version_2D_3D` varchar(10) NOT NULL,
  `movies_id` int UNSIGNED NOT NULL,
  `timetables_id` int UNSIGNED NOT NULL,
  `movie_theaters_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sessions_movies1_idx` (`movies_id`),
  KEY `fk_sessions_timetables1_idx` (`timetables_id`),
  KEY `fk_sessions_movie_theaters1_idx` (`movie_theaters_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `timetables`
--

DROP TABLE IF EXISTS `timetables`;
CREATE TABLE IF NOT EXISTS `timetables` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `hours_timetable` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `timetables`
--

INSERT INTO `timetables` (`id`, `hours_timetable`) VALUES
(1, '14:30:00'),
(2, '18:45:00'),
(3, '21:00:00'),
(4, '22:45:00');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `password` char(60) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `create_date` datetime NOT NULL,
  `last_connection_date` datetime NOT NULL,
  `roles_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_roles1_idx` (`roles_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `categories_movies`
--
ALTER TABLE `categories_movies`
  ADD CONSTRAINT `fk_categories_movies_categories1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fk_categories_movies_movies` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`);

--
-- Contraintes pour la table `movies_media`
--
ALTER TABLE `movies_media`
  ADD CONSTRAINT `fk_movies_media_media1` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`),
  ADD CONSTRAINT `fk_movies_media_movies1` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`);

--
-- Contraintes pour la table `movie_theaters`
--
ALTER TABLE `movie_theaters`
  ADD CONSTRAINT `fk_movie_theaters_cinemas1` FOREIGN KEY (`cinemas_id`) REFERENCES `cinemas` (`id`);

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_sessions1` FOREIGN KEY (`sessions_id`) REFERENCES `sessions` (`id`),
  ADD CONSTRAINT `fk_orders_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `fk_sessions_movie_theaters1` FOREIGN KEY (`movie_theaters_id`) REFERENCES `movie_theaters` (`id`),
  ADD CONSTRAINT `fk_sessions_movies1` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`),
  ADD CONSTRAINT `fk_sessions_timetables1` FOREIGN KEY (`timetables_id`) REFERENCES `timetables` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
