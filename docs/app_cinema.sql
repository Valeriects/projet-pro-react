-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 18 avr. 2024 à 10:30
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name_cat`) VALUES
(1, 'drame'),
(2, 'comédie'),
(3, 'thriller'),
(4, 'fantastique'),
(5, 'science-fiction'),
(6, 'film d\'animation'),
(9, 'theatre'),
(10, 'Aventure');

-- --------------------------------------------------------

--
-- Structure de la table `categories_movies`
--

DROP TABLE IF EXISTS `categories_movies`;
CREATE TABLE IF NOT EXISTS `categories_movies` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `categories_id` int UNSIGNED NOT NULL,
  `movies_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categories_movies_movies_idx` (`movies_id`),
  KEY `fk_categories_movies_categories1_idx` (`categories_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories_movies`
--

INSERT INTO `categories_movies` (`id`, `categories_id`, `movies_id`) VALUES
(1, 2, 1),
(3, 1, 1),
(5, 4, 1),
(6, 6, 2),
(7, 10, 8),
(10, 1, 5),
(11, 4, 7),
(12, 5, 6);

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
  `city` varchar(100) NOT NULL,
  `phone_cine` int UNSIGNED NOT NULL,
  `email_cine` varchar(50) NOT NULL,
  `infos_cine` text NOT NULL,
  `nbr_theater` int UNSIGNED NOT NULL,
  `disabled_access` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cinemas`
--

INSERT INTO `cinemas` (`id`, `name_cinema`, `manager`, `address_cine`, `city`, `phone_cine`, `email_cine`, `infos_cine`, `nbr_theater`, `disabled_access`) VALUES
(1, 'Cinéma Fun', 'Mr Anastasio Rupert', '330 Avenue des Cyprès', '13190 Aix en Provence', 4294967295, 'cinema.fun@gmail.fr', 'Les cinémas Fun sont une entreprise familiale. Cinéma de quartier depuis le tout début, nous évoluons sans cesse pour vous donner une meilleure expérience d\'immersion de votre séance de cinéma.\r\nAfin d\'apporter un plus à cette expérience, nous vous proposons ce tout nouveau site, qui répond à votre problématique de réservation et de sélection de film.\r\nMerci de nous être fidèle depuis toutes ses années.\r\nNous espérons qu\'ensemble, nous continuerons à faire évoluer notre entreprise.', 5, 'Accès handicapé, rampe de sécurité, sortie de secours, place parking handicapé devant le cinéma, ascenseur, toilettes handicapées, zone pour fauteuil roulant dans la salle.'),
(2, 'Cinéma Unicorn', 'général', 'Rue de la lune', 'MoonCity', 111111111, 'cinema.pathe@gmail.fr', 'Les cinémas Fun sont une entreprise familiale. Cinéma de quartier depuis le tout début, nous évoluons sans cesse pour vous donner une meilleure expérience d\'immersion de votre séance de cinéma.\r\nAfin d\'apporter un plus à cette expérience, nous vous proposons ce tout nouveau site, qui répond à votre problématique de réservation et de sélection de film.\r\nMerci de nous être fidèle depuis toutes ses années.\r\nNous espérons qu\'ensemble, nous continuerons à faire évoluer notre entreprise.', 6, 'Accès handicapé, rampe de sécurité, sortie de secours, place parking handicapé devant le cinéma, ascenseur, toilettes handicapées, zone pour fauteuil roulant dans la salle.'),
(4, 'Cinéma Triplette', 'Mr criquet', '255, avenur du pain perdu', '', 825255454, 'triplette@gmail.com', 'bla bla bla', 3, 'Rampe'),
(6, 'cinéma belleville', 'Pompidou', '330 Avenue des Cyprès', 'hyières', 2012101210, 'belleville@hotmail.fr', 'blabla', 2, 'oui');

-- --------------------------------------------------------

--
-- Structure de la table `media`
--

DROP TABLE IF EXISTS `media`;
CREATE TABLE IF NOT EXISTS `media` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `src_img` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alt_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alt_video` varchar(100) NOT NULL,
  `src_video` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `media`
--

INSERT INTO `media` (`id`, `src_img`, `alt_img`, `alt_video`, `src_video`) VALUES
(1, 'pauvres-creatures.jpg', 'affiche du film pauvres créatures', 'bande-annonce de pauvre créature', 'https://www.youtube.com/embed/32vmnIuURCo?si=HprNr7Hl_a8b0FyZ'),
(2, 'borderlands-2024.jpg', 'affiche de borderlands 2024', 'BA de borderlands', 'https://www.youtube.com/embed/IF5Fq9wB-fQ?si=x7BEHJLJqQL-TevP'),
(4, 'Dune2.jpg', 'affiche de dune 2', 'Bande annonce dune 2', 'https://www.youtube.com/embed/kF1WyiTZFTk?si=KDfssPom0lCJBNio'),
(5, 'Madame-Web.jpg', 'affiche madame web', 'bande annonce madame web', 'https://www.youtube.com/embed/mZLJfwcP_pM?si=agpl3EoXwkFwuytm'),
(23, '18-04-2024_08H13_horizon.jpg', 'affiche horizon', 'lien bande annonce Horizon', 'https://www.youtube.com/embed/YYsReoZMj1k?si=xMg3PzuphEHgvmS5'),
(26, '18-04-2024_08H35_kung-fu-panda-4.jpg', 'affiche de kung-fu panda 4', 'lien bande annonce kung fu panda 4', 'https://www.youtube.com/embed/-5qyM5TSWuY?si=tFQrXpqYbFx7CwGb'),
(33, '17-04-2024_18H09_dernier-jaguar.jpg', 'affiche le dernierjaguar', 'Lien vidéo le dernier jaguar', 'https://www.youtube.com/embed/G9AgInuQ2KI?si=zB4z9FYxIXK1iIox');

-- --------------------------------------------------------

--
-- Structure de la table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `release_date` date NOT NULL,
  `synopsis` text NOT NULL,
  `director` varchar(45) NOT NULL,
  `time` time NOT NULL,
  `actor` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `movies`
--

INSERT INTO `movies` (`id`, `title`, `release_date`, `synopsis`, `director`, `time`, `actor`) VALUES
(1, 'Pauvres Créatures', '0000-00-00', 'Bella est une jeune femme ramenée à la vie par le brillant et peu orthodoxe Dr Godwin Baxter. Sous sa protection, elle a soif d\'apprendre. Avide de découvrir le monde dont elle ignore tout, elle s\'enfuit avec Duncan Wedderburn, un avocat habile et débauché, et embarque pour une odyssée étourdissante à travers les continents. Imperméable aux préjugés de son époque, Bella est résolue à ne rien céder sur les principes d\'égalité et de libération.', ' Yorgos Lanthimos', '02:21:00', 'Emma Stone, Mark Ruffalo, Willem Dafoe'),
(2, 'Kung Fu Panda 4', '2024-03-26', 'Après trois aventures dans lesquelles le guerrier dragon Po a combattu les maîtres du mal les plus redoutables grâce à un courage et des compétences en arts martiaux inégalés, le destin va de nouveau frapper à sa porte pour… L’inviter à enfin se reposer. Plus précisément, pour être nommé chef spirituel de la vallée de la Paix. Cela pose quelques problèmes évidents.', 'Mike Mitchell (V), Stephanie Stine', '01:34:00', 'acteur 1, acteur 2, acteur 3'),
(5, 'Horizon: An American Saga Chapter 1', '2024-10-18', 'Sur une période de 15 ans avant et après la Guerre de Sécession. L\'expansion vers l\'Ouest est semée d\'embûches qu\'il s\'agisse des éléments naturels, des interactions avec les peuples indigènes qui vivaient sur ces terres et de la détermination impitoyable de ceux qui cherchaient à les coloniser...', 'Horizon: An American Saga Chapter 1', '02:50:00', 'Kevin Costner, Sienna Miller, Sam Worthington'),
(6, 'Dune 2', '2024-02-17', 'Dans DUNE : DEUXIÈME PARTIE, Paul Atreides s’unit à Chani et aux Fremen pour mener la révolte contre ceux qui ont anéanti sa famille. Hanté par de sombres prémonitions, il se trouve confronté au plus grand des dilemmes : choisir entre l’amour de sa vie et le destin de l’univers.', 'Denis Villeneuve ', '02:46:00', '321'),
(7, 'Madame Web', '2024-02-14', 'Cassandra Web est une ambulancière de Manhattan qui serait capable de voir dans le futur. Forcée de faire face à des révélations sur son passé, elle noue une relation avec trois jeunes femmes destinées à un avenir hors du commun... si toutefois elles parviennent à survivre à un présent mortel.', 'S.J. Clarkson', '01:40:00', '222222'),
(8, 'Le dernier jaguar', '0000-00-00', 'Autumn grandit dans la forêt amazonienne aux côtes de Hope, un adorable bébé jaguar femelle qu’elle a recueilli. Mais l’année de ses six ans, un drame familial contraint Autumn et son père à retourner vivre à New York. Huit années passent, et Autumn, devenue adolescente, n’a jamais oublié son amie jaguar. Quand elle apprend que Hope est en danger de mort, Autumn décide de retourner dans la jungle pour la sauver !', 'Gilles de Maistre ', '01:40:00', 'Lumi Pollack, Emily Bett Rickards, Wayne Charles Baker'),
(9, 'Borderlands', '2024-08-07', 'Lilith, une chasseuse de primes au passé trouble, revient à contrecœur sur sa planète natale, Pandore, la planète la plus chaotique de la galaxie… Sa mission est de retrouver la fille disparue d\'Atlas, l’homme le plus puissant (et le plus méprisable) de l’univers. Pour y arriver Lilith va devoir former une alliance inattendue avec une joyeuse équipe de marginaux : Roland, un mercenaire chevronné ; Tiny Tina, une pré-ado avec un gros penchant pour la démolition ; Krieg, le protecteur musclé de Tina ; Tannis , une scientifique fantasque ; et Claptrap, un robot très bavard. Ensemble, ces héros improbables vont devoir affronter les pires espèces extraterrestres et de dangereux bandits pour découvrir les secrets les plus explosifs de Pandore. Basé sur l\'une des franchises de jeux vidéo les plus vendues de tous les temps, bienvenue à BORDERLANDS !', 'Eli Roth ', '02:00:00', 'Cate Blanchett, Kevin Hart, Jack Black');

-- --------------------------------------------------------

--
-- Structure de la table `movies_media`
--

DROP TABLE IF EXISTS `movies_media`;
CREATE TABLE IF NOT EXISTS `movies_media` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `movies_id` int UNSIGNED NOT NULL,
  `media_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_movies_media_movies1_idx` (`movies_id`),
  KEY `fk_movies_media_media1_idx` (`media_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `movies_media`
--

INSERT INTO `movies_media` (`id`, `movies_id`, `media_id`) VALUES
(1, 1, 1),
(9, 6, 4),
(11, 7, 5),
(12, 8, 33),
(13, 9, 2),
(15, 2, 26),
(16, 5, 23);

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `movie_theaters`
--

INSERT INTO `movie_theaters` (`id`, `name_theater`, `nbr_seats`, `disabled_access`, `cinemas_id`) VALUES
(1, '01', 325, 'Rampe, zone handicapée', 1),
(2, '02', 300, 'Rampe d\'accès, zone handicapée', 1),
(3, '11', 650, 'Rampe, zone handicapée', 1),
(5, 'Mercure', 250, 'Rampe, zone handicapée', 1),
(8, 'Lune', 250, 'blabla', 1),
(9, 'Pluton', 230, 'Accès handicapé, rampe de sécurité, sortie de secours, place parking handicapé devant le cinéma, ascenseur, toilettes handicapées, zone pour fauteuil roulant dans la salle.', 1),
(10, 'Saturne', 340, 'Accès handicapé, rampe de sécurité, sortie de secours, place parking handicapé devant le cinéma, ascenseur, toilettes handicapées, zone pour fauteuil roulant dans la salle.', 1);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `users_id` int UNSIGNED NOT NULL,
  `sessions_id` int UNSIGNED NOT NULL,
  `order_date` datetime NOT NULL,
  `price_order` decimal(6,2) UNSIGNED NOT NULL,
  `num_CB` int UNSIGNED NOT NULL,
  `cb_date` date NOT NULL,
  `cryptogramme` int UNSIGNED NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `name_cb` varchar(45) NOT NULL,
  `nbr_seats_payed` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orders_sessions1_idx` (`sessions_id`),
  KEY `fk_orders_users1_idx` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `users_id`, `sessions_id`, `order_date`, `price_order`, `num_CB`, `cb_date`, `cryptogramme`, `lastname`, `firstname`, `email`, `name_cb`, `nbr_seats_payed`) VALUES
(2, 30, 2, '2024-04-14 00:52:09', 12.50, 4294967295, '0000-00-00', 321, 'Grande orange', 'pomme', 'pomme@hotmail.com', 'orange', 1),
(3, 28, 2, '2024-04-14 01:47:20', 25.00, 4294967295, '0000-00-00', 123, 'perne', 'origine', 'pomme@hotmail.com', 'perne', 2),
(4, 27, 2, '2024-04-14 01:48:06', 12.50, 4294967295, '0000-00-00', 521, 'rune', 'lila', 'lila@hotmail.fr', 'rune', 1);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name_role`) VALUES
(1, 'admin'),
(2, 'membre'),
(5, 'manager');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `session_date` date NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `session_date`, `price`, `language`, `version_2D_3D`, `movies_id`, `timetables_id`, `movie_theaters_id`) VALUES
(2, '2024-02-12', 12.50, 'vf', '2D', 1, 3, 1),
(5, '2024-04-01', 12.50, 'vf', '2D', 6, 1, 8),
(6, '2024-04-18', 12.50, 'vf', '2D', 2, 3, 2),
(9, '2024-04-19', 12.50, 'vf', '2D', 6, 2, 3),
(10, '2024-04-18', 12.50, 'vf', '2D', 7, 3, 5),
(11, '2024-04-19', 12.50, 'vf', '2D', 5, 1, 2),
(12, '2024-04-19', 12.50, 'vf', '2D', 5, 2, 2),
(13, '2024-04-19', 12.50, 'vf', '2D', 5, 4, 2),
(14, '2024-04-22', 12.50, 'vf', '2D', 8, 2, 3),
(17, '2024-02-12', 12.50, 'vf', '2D', 1, 1, 1),
(18, '2024-02-12', 12.50, 'vf', '2D', 1, 2, 1),
(19, '2024-02-12', 12.50, 'vf', '2D', 1, 4, 1),
(20, '2024-04-23', 12.50, 'vf', '2D', 9, 2, 5),
(21, '2024-04-23', 12.50, 'vf', '2D', 9, 4, 5);

-- --------------------------------------------------------

--
-- Structure de la table `timetables`
--

DROP TABLE IF EXISTS `timetables`;
CREATE TABLE IF NOT EXISTS `timetables` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `hours_timetable` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `phone` int DEFAULT NULL,
  `birthday` date NOT NULL,
  `created_date` datetime NOT NULL,
  `last_connection_date` datetime DEFAULT NULL,
  `roles_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_roles1_idx` (`roles_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `password`, `address`, `email`, `phone`, `birthday`, `created_date`, `last_connection_date`, `roles_id`) VALUES
(3, 'christian', 'pierre', '0000', '55, avenue du tortionnaire 30000 Nîmes', 'violette@gmail.com', 600728552, '1960-02-24', '2024-02-11 17:38:29', NULL, 2),
(10, 'admin', 'Administrator', '$2b$10$ArrX9WFp3I03L4LDPpm.OeUEbHoJQxxSU8PyHMMoYIEbhdqTrrNQS', '22, avenue des admin 34000 Montpellier', 'admin2@gmail.com', 750869522, '1980-04-22', '2024-02-11 19:55:48', '2024-04-18 11:06:51', 1),
(12, 'Gégé', 'Géannissime', '$2b$10$qT8ePjdWDzXkJifof1Vc0.CoMaFfveSXzfOU.UMy1.4lAGK7m5ZX.', '110, route de grans 13450 Grans', 'geant@hotmail.fr', 45087695, '1970-08-14', '2024-02-26 15:03:33', '2024-03-16 20:13:44', 2),
(13, 'Pierre', 'Amarillys', '$2b$10$RpHNdAXKL6b98zC9XNLj6e1muHShjne0GkMM0/X5mDK0rHQJiZ9be', '85, Impasse montagnette 84000 Avignon', 'admin@gmail.com', 590855665, '1990-12-14', '2024-03-05 02:54:57', '2024-03-27 14:56:57', 2),
(17, 'Hib', 'Grand-duc', '$2b$10$V4/wpI3jWhsq5fOne..KH.UCy.t8g5Twuqk.ig4vlg2QjnKPCS3FW', '552, avenue de la prairie 13100aix en provence', '', 9, '0000-00-00', '2024-03-16 21:37:30', '2024-03-16 21:37:37', 2),
(18, 'Aurore', 'Boreal', '$2b$10$dpHtNoch./UWop912xVN8.0xwFrdlDFHsgHUHOt/8X3M8xQqH1goS', '', 'boreal@gmail.com', 0, '0000-00-00', '2024-03-16 21:56:00', '2024-03-16 21:58:48', 2),
(20, NULL, NULL, '$2b$10$9cbbSl6IZ0LfLdfbQ.bqkeumayzBPrJdT5gCCbb1Ohu6XFoO0Y82S', NULL, 'lilou@hotmail.fr', 0, '0000-00-00', '2024-03-16 23:22:38', NULL, 2),
(21, 'VertFeuille', 'vermeille', '$2b$10$i4X42L1VwMgQTyrEtWaGweEhRDPHudo4YxxudDBz3MjAe2t6DlJsm', '255 impasse des feuilles 30000 nimes', '', 5, '0000-00-00', '2024-03-27 12:57:28', '2024-03-27 12:57:37', 2),
(22, 'Premier', 'One', '$2b$10$mjsejivogKBu.BMBmmMfSOw2m3HlmlVszU94nzukFlOb04QwVpLSu', '122 boulevard', '', 1, '0000-00-00', '2024-03-27 15:03:12', '2024-03-27 15:03:21', 2),
(24, '', 'trois', '$2b$10$TwOioFbLngBSG2MNyOwReu2ktjeej.QsBXyP7NF3P2Q8Uej0DwYeu', '', '3@gmail.com', 0, '0000-00-00', '2024-03-27 14:52:52', '2024-03-27 14:53:00', 2),
(27, NULL, 'six', '$2b$10$z6RKYkdLtD7ydiBKcOtTL.xm8jBlWZ/QYvElkGWeEOPZckbpwWZai', NULL, '6@gmail.com', 600728552, '0000-00-00', '2024-03-27 13:51:46', '2024-03-27 14:28:15', 2),
(28, NULL, 'Sept', '$2b$10$uLnXQYg.L8.lGiySePcx9uSCeR9TLsVnUpNhkTVtkiQA2Y9rSfUzW', NULL, '7@gmail.com', NULL, '0000-00-00', '2024-03-27 14:32:56', '2024-03-27 14:35:30', 2),
(30, 'Pomme', 'Neuf', '$2b$10$X64i4Avidu6pm4DhjedWvOdhQ27gmILc2Ak9tp/ANwsGjC1PRVbTW', '475858857575277', '9@gmail.com', 215412541, '2010-06-09', '2024-03-27 18:27:40', '2024-04-18 11:06:44', 2),
(31, 'Dix', 'TEN', '$2b$10$aIz2ua16J1K1RSG.YNAj7OP09w16hoDnRubPUFbqUi7wv74/NaeGm', '123 bd de la gandonne', '10@gmail.com', 232152412, '2004-06-09', '2024-04-16 10:17:43', '2024-04-16 10:17:49', 2);

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
  ADD CONSTRAINT `fk_movie_theaters_cinemas1` FOREIGN KEY (`cinemas_id`) REFERENCES `cinemas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
