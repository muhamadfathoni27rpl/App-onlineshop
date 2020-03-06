-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Mar 2020 pada 13.06
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `login2020`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `uuid` int(200) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `pw` varchar(200) NOT NULL,
  `status_data` int(200) NOT NULL,
  `datapc_user` varchar(200) NOT NULL,
  `pp` varchar(200) NOT NULL,
  `saldo` int(200) NOT NULL,
  `hp` varchar(200) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `web` varchar(200) NOT NULL,
  `verif_auth2` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`uuid`, `nama`, `email`, `pw`, `status_data`, `datapc_user`, `pp`, `saldo`, `hp`, `alamat`, `web`, `verif_auth2`) VALUES
(1, 'Muhamad Fathoni', 'mojokertociber.1@gmail.com', 'sha1$a39ba09c$1$895f9c2afca75bd361e614ecd36915a6c26799dc', 1, 'J3N0CV10E79113D', 'gambar-1582588148400.jpg', 0, '087715111965', 'Jalan Danau ranau XI G7G Malang', 'muhamadfathoni27rpl.rf.gd', ''),
(2, 'Toni user', 'muhamad_fathoni_27rpl@student.smktelkom-mlg.sch.id', 'sha1$708e4f34$1$decfe44335d84358d848f5552aa683bd16effc5d', 1, 'J3N0CV10E79113D', 'gambar-1582523520072.jpg', 99229833, '085739210852', 'Dusun Ploso desa segunung Dlanggu', 'muhamadfathoni27rpl.rf.gd', 'ok'),
(3, 'inot', 'mojokertociber.3@gmail.com', 'sha1$1796a2df$1$d6d550e84304f5ab21c99e6a07aee003e3ea1d34', 1, 'J3N0CV10E79113D', '0', 0, '', '', '', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_barangs`
--

CREATE TABLE `user_barangs` (
  `uuid_barang` int(200) NOT NULL,
  `barang` varchar(200) NOT NULL,
  `desk` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `uuid_pemilik` varchar(200) NOT NULL,
  `harga` varchar(200) NOT NULL,
  `uuid_kategori` int(200) NOT NULL,
  `stok` int(200) NOT NULL,
  `foto` varchar(200) NOT NULL,
  `rating` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_barangs`
--

INSERT INTO `user_barangs` (`uuid_barang`, `barang`, `desk`, `uuid_pemilik`, `harga`, `uuid_kategori`, `stok`, `foto`, `rating`) VALUES
(23, 'Laptop', 'asdadasdadad', '1', '10000', 1, 96, 'gbr_brg-1582523283725.jpeg', 88),
(988561, 'Bom Atom', 'iki jenenge bom atom\r\nWapik JOS GANDOS pokok e :v\r\naowkdaowdkwo', '1', '1000', 2, 100, 'gbr_brg-1582986234115.jpg', 425459),
(988562, 'shitmen', 'deskpripsine barang bos', '1', '5000', 3, 50, 'gbr_brg-1582988406530.jpg', 973418),
(988563, 'Jarjit', 'hindi', '1', '500', 4, 1, 'gbr_brg-1582988470590.jpg', 769215),
(988564, 'Sniper L15A41', 'tryrtyryy', '1', '2019012', 2, 2, 'gbr_brg-1583072913297.jpg', 510745),
(988565, 'Pisau', 'awokdawodkwaodwdok', '1', '5000', 4, 6, 'gbr_brg-1583073156138.jpg', 244256);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_favorits`
--

CREATE TABLE `user_favorits` (
  `id_love` int(200) NOT NULL,
  `uuid_barang` int(200) NOT NULL,
  `nama_barang` varchar(200) NOT NULL,
  `harga_barang` int(200) NOT NULL,
  `id_user` int(200) NOT NULL,
  `gambar` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_favorits`
--

INSERT INTO `user_favorits` (`id_love`, `uuid_barang`, `nama_barang`, `harga_barang`, `id_user`, `gambar`) VALUES
(13, 25, 'Sniper L15A41', 1212, 2, 'gbr_brg-1582523352790.jpg'),
(14, 24, 'Bom Atom', 123, 2, 'gbr_brg-1582523322470.jpg'),
(15, 23, 'Laptop', 10000, 2, 'gbr_brg-1582523283725.jpeg'),
(16, 29, 'BARANGE INOT', 123231, 2, 'gbr_brg-1582784789833.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_kategoris`
--

CREATE TABLE `user_kategoris` (
  `uuid_kategori` int(200) NOT NULL,
  `kategori` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_kategoris`
--

INSERT INTO `user_kategoris` (`uuid_kategori`, `kategori`) VALUES
(1, 'elektronik'),
(2, 'militer'),
(3, 'olahraga'),
(4, 'rumah tangga');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_keranjangs`
--

CREATE TABLE `user_keranjangs` (
  `id_cart` int(200) NOT NULL,
  `uuid_barang` int(200) NOT NULL,
  `nama_barang` varchar(200) NOT NULL,
  `total_barang` int(200) NOT NULL,
  `harga_total` int(200) NOT NULL,
  `nama_pembeli` varchar(200) NOT NULL,
  `gambar` varchar(200) NOT NULL,
  `harga` int(200) NOT NULL,
  `admin` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_pesans`
--

CREATE TABLE `user_pesans` (
  `id_pesan` int(200) NOT NULL,
  `pemilik` varchar(200) NOT NULL,
  `pembeli` varchar(200) NOT NULL,
  `id_pembeli` int(200) NOT NULL,
  `barang` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`barang`)),
  `total` varchar(200) NOT NULL,
  `status` int(200) NOT NULL,
  `kirim` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_pesans`
--

INSERT INTO `user_pesans` (`id_pesan`, `pemilik`, `pembeli`, `id_pembeli`, `barang`, `total`, `status`, `kirim`) VALUES
(29, 'Muhamad Fathoni', 'Toni user', 2, '\"[{\\\"idBarang\\\":23,\\\"namaBarang\\\":\\\"Laptop\\\",\\\"totalBarang\\\":2,\\\"hargaBarang\\\":20000}]\"', '20000', 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_rates`
--

CREATE TABLE `user_rates` (
  `id_rate` int(200) NOT NULL,
  `id_barang` int(200) NOT NULL,
  `b1` int(200) NOT NULL,
  `b2` int(200) NOT NULL,
  `b3` int(200) NOT NULL,
  `b4` int(200) NOT NULL,
  `b5` int(200) NOT NULL,
  `total_rate` varchar(200) NOT NULL,
  `total_rateWong` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_rates`
--

INSERT INTO `user_rates` (`id_rate`, `id_barang`, `b1`, `b2`, `b3`, `b4`, `b5`, `total_rate`, `total_rateWong`) VALUES
(1, 88, 1, 10, 100, 2, 1, '2.9', '114 Orang Menilai'),
(2, 737963, 1, 1, 1, 50, 100, '4.6', '153 Orang Menilai'),
(3, 425459, 0, 0, 0, 0, 0, 'NaN', '0 Orang Menilai'),
(4, 973418, 0, 0, 0, 0, 0, 'NaN', '0 Orang Menilai'),
(5, 769215, 0, 0, 0, 0, 0, 'NaN', '0 Orang Menilai'),
(6, 510745, 0, 0, 0, 0, 0, 'NaN', '0 Orang Menilai'),
(7, 244256, 0, 0, 0, 0, 0, 'NaN', '0 Orang Menilai');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uuid`);

--
-- Indeks untuk tabel `user_barangs`
--
ALTER TABLE `user_barangs`
  ADD PRIMARY KEY (`uuid_barang`);

--
-- Indeks untuk tabel `user_favorits`
--
ALTER TABLE `user_favorits`
  ADD PRIMARY KEY (`id_love`);

--
-- Indeks untuk tabel `user_kategoris`
--
ALTER TABLE `user_kategoris`
  ADD PRIMARY KEY (`uuid_kategori`);

--
-- Indeks untuk tabel `user_keranjangs`
--
ALTER TABLE `user_keranjangs`
  ADD PRIMARY KEY (`id_cart`);

--
-- Indeks untuk tabel `user_pesans`
--
ALTER TABLE `user_pesans`
  ADD PRIMARY KEY (`id_pesan`);

--
-- Indeks untuk tabel `user_rates`
--
ALTER TABLE `user_rates`
  ADD PRIMARY KEY (`id_rate`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `uuid` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `user_barangs`
--
ALTER TABLE `user_barangs`
  MODIFY `uuid_barang` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=988566;

--
-- AUTO_INCREMENT untuk tabel `user_favorits`
--
ALTER TABLE `user_favorits`
  MODIFY `id_love` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `user_kategoris`
--
ALTER TABLE `user_kategoris`
  MODIFY `uuid_kategori` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `user_keranjangs`
--
ALTER TABLE `user_keranjangs`
  MODIFY `id_cart` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT untuk tabel `user_pesans`
--
ALTER TABLE `user_pesans`
  MODIFY `id_pesan` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT untuk tabel `user_rates`
--
ALTER TABLE `user_rates`
  MODIFY `id_rate` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
