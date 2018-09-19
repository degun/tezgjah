-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2017 at 10:04 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tezgjah`
--

-- --------------------------------------------------------

--
-- Table structure for table `paragraf`
--

CREATE TABLE `paragraf` (
  `id` int(8) NOT NULL,
  `nofka` varchar(25) NOT NULL,
  `permbajtja` text NOT NULL,
  `aprovuar` tinyint(1) DEFAULT NULL,
  `idTregim` int(8) NOT NULL,
  `idParagraf` int(8) NOT NULL,
  `timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `paragraf`
--

INSERT INTO `paragraf` (`id`, `nofka`, `permbajtja`, `aprovuar`, `idTregim`, `idParagraf`, `timestamp`) VALUES
(63, 'ernest', 'Kur Koliqi botonte më 1958 shënimet e veta për artin e Martin Camajt, pohonte me admirim se "atij, edhe padashtas i shkon syni ke brumi njerzuer".', 1, 0, 1, '2017-02-27 17:57:47.692000'),
(64, 'ernest', 'Ja se po e vazhdoj.', 1, 0, 2, '2017-02-27 19:01:28.134032'),
(67, 'ernest', 'Ore do punosh apo si', 1, 1, 1, '2017-02-27 18:11:25.360000'),
(68, 'ernest', 'Ky është vazhdimi i dytë.', 1, 0, 3, '2017-02-27 18:17:55.723000'),
(69, 'ernest', 'Libri mund të porositet nga çdo vend i botës. Transporti në Shqipëri është falas, përsa i përket vendeve të tjera, vlera e transportit ndryshon në vartësi të vendit. Vlerën e saktë të transportit e mësoni në momentin që mbyllni porosinë.', 1, 2, 1, '2017-02-27 18:21:33.317000'),
(70, 'abaz', 'Hello there. Unë jam vagoni i parë dhe thërras vagonin e dytë, vagonin e dytë.', 1, 2, 1, '2017-02-27 18:59:56.161000'),
(91, 'edlir', 'Vagoni.', 1, 2, 4, '2017-02-27 19:48:58.842000'),
(92, 'edlir', 'ky është vazhdimi i katërt', 1, 0, 5, '2017-02-27 19:50:47.067000'),
(93, 'edlir', 'Jo, zdu.', 1, 1, 6, '2017-02-27 19:51:17.433000');

-- --------------------------------------------------------

--
-- Table structure for table `perdorues`
--

CREATE TABLE `perdorues` (
  `id` int(8) NOT NULL,
  `nofka` varchar(25) NOT NULL,
  `fjalekalimi` varchar(60) NOT NULL,
  `timestamp` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `perdorues`
--

INSERT INTO `perdorues` (`id`, `nofka`, `fjalekalimi`, `timestamp`) VALUES
(5, 'edlir', '$2a$10$nU.FQANJriHbABUXDWrUC.j9IP9CFTEZZWNumXkkl/pzR.SyPugJ6', '0000-00-00 00:00:00.000000'),
(6, 'abaz', '$2a$10$gpbv.RFCMeUN7lGpOzrulOwMvgeLcg20QB4.V9.Tw6pP9bTN0iGya', '2017-01-24 22:21:42.225319'),
(7, 'oromena', '$2a$10$x2jeE84C.r6ZI41ZfH89L.8YF3wqUiomWKyYEPxjoFB2e1O4iMeNm', '2017-02-10 16:12:51.740413'),
(8, 'greta', '$2a$10$KEGyyj0WAyGoOeHByTntr.MQbhL4BW5NEWoT0qepymYicvFC6TzyC', '2017-02-18 13:02:18.079975'),
(9, 'ernest', '$2a$10$02gUTtsnS12QZwTgPHzV0.lL.49sljOdUcHxSOly4/KBej7pek4Oy', '2017-02-27 12:52:33.968082'),
(10, 'edri', '$2a$10$BvRrCu.cz8wxuEry4XvBMuPs8Cr0xMlsIXkeWR0p1MS1e8aaRt4aO', '2017-02-27 16:23:37.973287');

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `paragraf`
--
ALTER TABLE `paragraf`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `perdorues`
--
ALTER TABLE `perdorues`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
