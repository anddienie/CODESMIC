CREATE DATABASE IF NOT EXISTS codesmic CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE codesmic;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  institution VARCHAR(100) NOT NULL,
  join_date VARCHAR(50) NOT NULL,
  xp INT NOT NULL DEFAULT 0,
  level INT NOT NULL DEFAULT 1,
  challenges_completed INT NOT NULL DEFAULT 0,
  projects_completed INT NOT NULL DEFAULT 0,
  rank VARCHAR(100) NOT NULL DEFAULT 'Rookie Star'
);

CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  xp INT NOT NULL DEFAULT 0,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  xp INT NOT NULL DEFAULT 10,
  subject VARCHAR(100) NOT NULL,
  subtopic VARCHAR(100) NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'Fix & Run Lab',
  mini_materi TEXT NOT NULL,
  code_html TEXT NOT NULL,
  code_css TEXT NOT NULL,
  code_js TEXT NOT NULL,
  task TEXT NOT NULL,
  validation_js TEXT NOT NULL,
  hint1 TEXT NOT NULL,
  hint2 TEXT NOT NULL,
  hint3 TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO questions (title, xp, subject, subtopic, difficulty, type, mini_materi, code_html, code_css, code_js, task, validation_js, hint1, hint2, hint3)
VALUES
  (
    'Judul Halaman Dasar',
    10,
    'HTML',
    'Struktur Dasar HTML',
    'Mudah',
    'Fix & Run Lab',
    'HTML halaman dasar memerlukan DOCTYPE, elemen html, head, title, dan body.',
    '<!DOCTYPE html>\n<html>\n<head>\n  <title></title>\n</head>\n<body>\n  \n</body>\n</html>',
    '',
    '',
    'Lengkapi tag <title> sehingga teks halaman menjadi "Belajar Web".',
    'const title = document.querySelector("title");\nreturn !!title && title.innerText.trim() === "Belajar Web";',
    'Cek tag <title> di dalam elemen <head>.',
    'Nama halaman biasanya ditulis di dalam <title>.',
    'Gunakan document.querySelector("title").innerText untuk mengisi nama halaman.'
  ),
  (
    'Buat Tombol CTA',
    10,
    'HTML',
    'Struktur Layout & Semantic',
    'Mudah',
    'Fix & Run Lab',
    'Belajar membuat tombol call-to-action sederhana menggunakan HTML dan kelas.',
    '<!DOCTYPE html>\n<html>\n<head>\n  <title>CTA Demo</title>\n</head>\n<body>\n  <div class="cta-container">\n    <button id="cta-button"></button>\n  </div>\n</body>\n</html>',
    '',
    '',
    'Isi teks tombol dengan "Mulai Belajar" dan pastikan tombol memiliki id cta-button.',
    'const button = document.querySelector("#cta-button");\nreturn !!button && button.innerText.trim() === "Mulai Belajar";',
    'Cari elemen dengan id cta-button.',
    'Periksa innerText tombol.',
    'Gunakan document.querySelector("#cta-button").innerText untuk mengecek teks tombol.'
  );
