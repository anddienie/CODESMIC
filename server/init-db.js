import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedData = [
  // Fix & Run Lab (3 soal)
  {
    title: 'Judul Halaman Dasar',
    xp: 10,
    subject: 'HTML',
    subtopic: 'Struktur Dasar HTML',
    difficulty: 'Mudah',
    type: 'Fix & Run Lab',
    mini_materi: 'HTML halaman dasar memerlukan DOCTYPE, elemen html, head, title, dan body.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title></title>\n</head>\n<body>\n  \n</body>\n</html>',
    code_css: '',
    code_js: '',
    task: 'Lengkapi tag <title> sehingga teks halaman menjadi "Belajar Web".',
    validation_js: 'const title = document.querySelector("title");\nreturn !!title && title.innerText.trim() === "Belajar Web";',
    hint1: 'Cek tag <title> di dalam elemen <head>.',
    hint2: 'Nama halaman biasanya ditulis di dalam <title>.',
    hint3: 'Gunakan document.querySelector("title").innerText untuk mengisi nama halaman.'
  },
  {
    title: 'Buat Tombol CTA',
    xp: 10,
    subject: 'HTML',
    subtopic: 'Struktur Layout & Semantic',
    difficulty: 'Mudah',
    type: 'Fix & Run Lab',
    mini_materi: 'Belajar membuat tombol call-to-action sederhana menggunakan HTML dan kelas.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>CTA Demo</title>\n</head>\n<body>\n  <div class="cta-container">\n    <button id="cta-button"></button>\n  </div>\n</body>\n</html>',
    code_css: '',
    code_js: '',
    task: 'Isi teks tombol dengan "Mulai Belajar" dan pastikan tombol memiliki id cta-button.',
    validation_js: 'const button = document.querySelector("#cta-button");\nreturn !!button && button.innerText.trim() === "Mulai Belajar";',
    hint1: 'Cari elemen dengan id cta-button.',
    hint2: 'Periksa innerText tombol.',
    hint3: 'Gunakan document.querySelector("#cta-button").innerText untuk mengecek teks tombol.'
  },
  {
    title: 'Style Form Input',
    xp: 15,
    subject: 'CSS',
    subtopic: 'Form Styling',
    difficulty: 'Mudah',
    type: 'Fix & Run Lab',
    mini_materi: 'Styling form input dengan border, padding, dan font size yang sesuai.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Form</title>\n</head>\n<body>\n  <form>\n    <input type="text" class="form-input" placeholder="Nama">\n  </form>\n</body>\n</html>',
    code_css: '.form-input {\n  /* Tambahkan styling di sini */\n}',
    code_js: '',
    task: 'Tambahkan border 2px solid #333, padding 10px, dan font-size 16px ke class form-input.',
    validation_js: 'const input = document.querySelector(".form-input");\nconst styles = window.getComputedStyle(input);\nreturn styles.borderWidth === "2px" && styles.padding === "10px";',
    hint1: 'Gunakan border property untuk membuat border.',
    hint2: 'Padding adalah space di dalam elemen.',
    hint3: 'Cek computed styles dengan window.getComputedStyle().'
  },
  // Code Challenge Arena (4 soal)
  {
    title: 'Buat Card Layout',
    xp: 20,
    subject: 'HTML/CSS',
    subtopic: 'Grid & Flexbox',
    difficulty: 'Sedang',
    type: 'Code Challenge Arena',
    mini_materi: 'Membuat layout card responsif menggunakan CSS Grid atau Flexbox.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Card Layout</title>\n</head>\n<body>\n  <div class="card-container">\n    <div class="card">Card 1</div>\n    <div class="card">Card 2</div>\n    <div class="card">Card 3</div>\n  </div>\n</body>\n</html>',
    code_css: '.card-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n}\n\n.card {\n  background: #f0f0f0;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n}',
    code_js: '',
    task: 'Buat layout card yang responsif menggunakan CSS Grid dengan minimal 3 kartu.',
    validation_js: 'const container = document.querySelector(".card-container");\nconst cards = container.querySelectorAll(".card");\nreturn cards.length >= 3;',
    hint1: 'Gunakan CSS Grid untuk membuat layout.',
    hint2: 'grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) membuat layout responsif.',
    hint3: 'Setiap card harus memiliki class .card.'
  },
  {
    title: 'Navbar dengan Navigation',
    xp: 25,
    subject: 'HTML/CSS',
    subtopic: 'Navigation Patterns',
    difficulty: 'Sedang',
    type: 'Code Challenge Arena',
    mini_materi: 'Membuat navbar dengan link navigasi dan styling yang menarik.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Navbar</title>\n</head>\n<body>\n  <nav class="navbar">\n    <div class="logo">MyApp</div>\n    <ul class="nav-links">\n      <li><a href="#">Home</a></li>\n      <li><a href="#">About</a></li>\n      <li><a href="#">Contact</a></li>\n    </ul>\n  </nav>\n  <main>Content</main>\n</body>\n</html>',
    code_css: '.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #333;\n  padding: 1rem 2rem;\n}\n\n.logo {\n  color: white;\n  font-weight: bold;\n  font-size: 1.5rem;\n}\n\n.nav-links {\n  display: flex;\n  list-style: none;\n  gap: 2rem;\n}\n\n.nav-links a {\n  color: white;\n  text-decoration: none;\n}',
    code_js: '',
    task: 'Buat navbar dengan logo dan navigation links yang tersusun horizontal.',
    validation_js: 'const navbar = document.querySelector(".navbar");\nconst logo = navbar.querySelector(".logo");\nconst links = navbar.querySelectorAll(".nav-links a");\nreturn !!logo && links.length >= 3;',
    hint1: 'Gunakan flexbox untuk layout navbar.',
    hint2: 'Logo harus ada di kiri dan links di kanan.',
    hint3: 'Gunakan justify-content: space-between untuk memisahkan logo dan links.'
  },
  {
    title: 'Tombol dengan Hover Effect',
    xp: 20,
    subject: 'CSS',
    subtopic: 'Interactive Elements',
    difficulty: 'Sedang',
    type: 'Code Challenge Arena',
    mini_materi: 'Membuat tombol dengan efek hover yang halus dan menarik.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Buttons</title>\n</head>\n<body>\n  <button class="btn">Klik Saya</button>\n</body>\n</html>',
    code_css: '.btn {\n  padding: 12px 24px;\n  font-size: 16px;\n  background: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n\n.btn:hover {\n  background: #0056b3;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0,86,179,0.4);\n}',
    code_js: '',
    task: 'Tambahkan efek hover dengan perubahan warna, shadow, dan transform.',
    validation_js: 'const btn = document.querySelector(".btn");\nconst styles = window.getComputedStyle(btn);\nreturn styles.transition.includes("all");',
    hint1: 'Gunakan :hover pseudo-class untuk efek mouse over.',
    hint2: 'Gunakan transition untuk membuat perubahan smooth.',
    hint3: 'transform: translateY(-2px) membuat tombol naik saat hover.'
  },
  {
    title: 'Modal Dialog',
    xp: 30,
    subject: 'HTML/CSS/JS',
    subtopic: 'Modal Components',
    difficulty: 'Sulit',
    type: 'Code Challenge Arena',
    mini_materi: 'Membuat modal dialog yang bisa dibuka dan ditutup dengan JavaScript.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Modal</title>\n</head>\n<body>\n  <button class="open-modal">Buka Modal</button>\n  \n  <div class="modal" style="display: none;">\n    <div class="modal-content">\n      <span class="close">&times;</span>\n      <p>Ini adalah modal dialog!</p>\n    </div>\n  </div>\n</body>\n</html>',
    code_css: '.modal {\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0,0,0,0.4);\n}\n\n.modal-content {\n  background-color: #fefefe;\n  margin: 15% auto;\n  padding: 20px;\n  border: 1px solid #888;\n  width: 80%;\n  max-width: 500px;\n}\n\n.close {\n  color: #aaa;\n  float: right;\n  font-size: 28px;\n  font-weight: bold;\n  cursor: pointer;\n}',
    code_js: 'const openBtn = document.querySelector(".open-modal");\nconst modal = document.querySelector(".modal");\nconst closeBtn = document.querySelector(".close");\n\nopenBtn.addEventListener("click", () => {\n  modal.style.display = "block";\n});\n\ncloseBtn.addEventListener("click", () => {\n  modal.style.display = "none";\n});',
    task: 'Implementasikan modal yang bisa dibuka dengan tombol dan ditutup dengan X.',
    validation_js: 'const modal = document.querySelector(".modal");\nreturn modal !== null && modal.style.display !== "none" || modal.style.display === "block";',
    hint1: 'Gunakan display: none/block untuk show/hide modal.',
    hint2: 'Tambahkan click event listener ke tombol.',
    hint3: 'Modal-content harus di tengah dengan margin: 15% auto.'
  },
  // Debugging Zone (3 soal)
  {
    title: 'Fix Layout Broken',
    xp: 25,
    subject: 'CSS',
    subtopic: 'Flexbox Debugging',
    difficulty: 'Sedang',
    type: 'Debugging Zone',
    mini_materi: 'Identifikasi dan perbaiki layout yang rusak akibat CSS error.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Broken Layout</title>\n</head>\n<body>\n  <div class="container">\n    <div class="item">Item 1</div>\n    <div class="item">Item 2</div>\n    <div class="item">Item 3</div>\n  </div>\n</body>\n</html>',
    code_css: '.container {\n  display: flex;\n  flex-direction: column;\n  /* ERROR: gap tidak ada, items tertumpuk */\n}\n\n.item {\n  background: #e0e0e0;\n  padding: 10px;\n}',
    code_js: '',
    task: 'Identifikasi error CSS yang menyebabkan layout tertumpuk. Tambahkan gap: 10px ke container.',
    validation_js: 'const container = document.querySelector(".container");\nconst styles = window.getComputedStyle(container);\nreturn styles.gap === "10px";',
    hint1: 'Layout items tertumpuk berarti ada yang kurang dari flexbox.',
    hint2: 'Cek apakah ada gap property.',
    hint3: 'Gunakan getComputedStyle untuk cek CSS yang applied.'
  },
  {
    title: 'Debug Console Error',
    xp: 20,
    subject: 'JavaScript',
    subtopic: 'Error Handling',
    difficulty: 'Mudah',
    type: 'Debugging Zone',
    mini_materi: 'Cari dan perbaiki error di console JavaScript.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Debug</title>\n</head>\n<body>\n  <p id="text">Hello</p>\n  <button id="btn">Click</button>\n</body>\n</html>',
    code_css: '',
    code_js: 'const btn = document.querySelector("#butn"); // TYPO: "butn" instead of "btn"\nbtn.addEventListener("click", () => {\n  document.querySelector("#text").innerText = "Clicked";\n});',
    task: 'Cari error: element dengan id "butn" tidak ada (harusnya "btn"). Perbaiki typo tersebut.',
    validation_js: 'const btn = document.querySelector("#btn");\nreturn btn !== null && btn.id === "btn";',
    hint1: 'Error biasanya di console browser.',
    hint2: 'Periksa apakah ID selector sesuai dengan HTML.',
    hint3: 'Gunakan querySelector dengan ID yang benar.'
  },
  {
    title: 'Fix Event Listener',
    xp: 25,
    subject: 'JavaScript',
    subtopic: 'Event Handling',
    difficulty: 'Sedang',
    type: 'Debugging Zone',
    mini_materi: 'Perbaiki event listener yang tidak bekerja dengan benar.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Event Debug</title>\n</head>\n<body>\n  <input type="text" class="input-field">\n  <p class="output">Result: </p>\n</body>\n</html>',
    code_css: '',
    code_js: 'const input = document.querySelector(".input-field");\nconst output = document.querySelector(".output");\n\n// ERROR: addEventListener dijalankan pada elemen yang tidak ada\ninput.addEventListener("input", (e) => {\n  output.innerText = "Result: " + e.target.value;\n});',
    task: 'Pastikan event listener diberikan pada elemen yang tepat dan event type benar (input untuk text field).',
    validation_js: 'const input = document.querySelector(".input-field");\nreturn input !== null && input instanceof HTMLInputElement;',
    hint1: 'Cek apakah elemen dengan class input-field ada.',
    hint2: 'Event "input" adalah event untuk perubahan nilai input.',
    hint3: 'Gunakan console.log untuk debug event listener.'
  },
  // Mini Project Builder (3 soal)
  {
    title: 'Portfolio Landing Page Part 1: Header',
    xp: 50,
    subject: 'HTML/CSS',
    subtopic: 'Portfolio Projects',
    difficulty: 'Sedang',
    type: 'Mini Project Builder',
    mini_materi: 'Bangun portfolio landing page step by step. Bagian 1: Buat header dengan hero section.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Portfolio</title>\n</head>\n<body>\n  <!-- Buat header dengan logo dan navigation di sini -->\n  <!-- Buat hero section dengan judul dan deskripsi -->\n</body>\n</html>',
    code_css: 'body {\n  margin: 0;\n  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;\n}\n\nheader {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 2rem;\n}\n\nheader h1 {\n  margin: 0;\n  font-size: 2.5rem;\n}\n\n.hero {\n  padding: 4rem 2rem;\n  text-align: center;\n}',
    code_js: '',
    task: 'Buat header dengan logo/nama dan navigation bar. Tambahkan hero section dengan judul "Welcome to My Portfolio" dan deskripsi singkat.',
    validation_js: 'const header = document.querySelector("header");\nconst hero = document.querySelector(".hero");\nreturn !!header && !!hero;',
    hint1: 'Header harus ada dengan background color yang menarik.',
    hint2: 'Hero section harus memiliki class .hero dan text "Welcome".',
    hint3: 'Gunakan semantic HTML: <header>, <nav>, <h1>.'
  },
  {
    title: 'Portfolio Landing Page Part 2: Projects Section',
    xp: 50,
    subject: 'HTML/CSS',
    subtopic: 'Portfolio Projects',
    difficulty: 'Sedang',
    type: 'Mini Project Builder',
    mini_materi: 'Lanjutkan portfolio. Bagian 2: Buat projects showcase dengan card grid.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Portfolio</title>\n</head>\n<body>\n  <!-- Header dari part 1 -->\n  \n  <!-- Buat section projects dengan grid layout -->\n  <!-- Setiap project adalah card dengan gambar, judul, deskripsi -->\n</body>\n</html>',
    code_css: '/* Style dari part 1 */\n\n.projects-section {\n  padding: 4rem 2rem;\n  background: #f8f9fa;\n}\n\n.projects-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.project-card {\n  background: white;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n  transition: transform 0.3s;\n}\n\n.project-card:hover {\n  transform: translateY(-8px);\n}',
    code_js: '',
    task: 'Buat section projects dengan minimal 3 project cards di grid layout. Setiap card harus punya judul dan deskripsi project.',
    validation_js: 'const section = document.querySelector(".projects-section");\nconst cards = document.querySelectorAll(".project-card");\nreturn !!section && cards.length >= 3;',
    hint1: 'Gunakan grid-template-columns untuk responsive layout.',
    hint2: 'Setiap project card harus memiliki class .project-card.',
    hint3: 'Tambahkan hover effect dengan transform: translateY().'
  },
  {
    title: 'Portfolio Landing Page Part 3: Contact & Footer',
    xp: 50,
    subject: 'HTML/CSS/JS',
    subtopic: 'Portfolio Projects',
    difficulty: 'Sulit',
    type: 'Mini Project Builder',
    mini_materi: 'Selesaikan portfolio. Bagian 3: Buat contact form dan footer.',
    code_html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Portfolio</title>\n</head>\n<body>\n  <!-- Header dan Projects dari part 1 & 2 -->\n  \n  <!-- Buat contact section dengan form -->\n  <!-- Buat footer dengan links dan copyright -->\n</body>\n</html>',
    code_css: '/* Style dari part 1 & 2 */\n\n.contact-section {\n  padding: 4rem 2rem;\n  max-width: 600px;\n  margin: 0 auto;\n}\n\n.contact-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.contact-form input,\n.contact-form textarea {\n  padding: 0.75rem;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-family: inherit;\n}\n\nfooter {\n  background: #333;\n  color: white;\n  text-align: center;\n  padding: 2rem;\n}',
    code_js: 'const form = document.querySelector(".contact-form");\nconst input = form.querySelector("input");\nconst textarea = form.querySelector("textarea");\ninput.value = "Test";\nreturn input.value === "Test" && !!textarea;',
    task: 'Buat contact form dengan input fields: nama, email, pesan.',
    validation_js: 'const form = document.querySelector(".contact-form");\nconst input = form.querySelector("input");\nconst textarea = form.querySelector("textarea");\ninput.value = "Test";\nreturn input.value === "Test" && !!textarea;',
    hint1: 'Contact form harus ada dengan input dan textarea.',
    hint2: 'Footer harus memiliki copyright text dan social media links.',
    hint3: 'Gunakan flexbox untuk contact form layout.'
  },
];

async function initDatabase() {
  try {
    // Connect to MySQL without specifying database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST ?? '127.0.0.1',
      user: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASSWORD ?? '',
    });

    console.log('Connected to MySQL server');

    // Create database
    await connection.execute('CREATE DATABASE IF NOT EXISTS codesmic CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    console.log('Database created/verified');

    // Close and reconnect to specific database
    await connection.end();

    // Connect to codesmic database
    const dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST ?? '127.0.0.1',
      user: process.env.DB_USER ?? 'root',
      password: process.env.DB_PASSWORD ?? '',
      database: 'codesmic'
    });

    console.log('Connected to codesmic database');

    // Create users table
    await dbConnection.execute(`
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
      )
    `);
    console.log('Users table created/verified');

    // Create activities table
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        xp INT NOT NULL DEFAULT 0,
        type VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Activities table created/verified');

    // Create questions table
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        xp INT NOT NULL DEFAULT 10,
        subject VARCHAR(100) NOT NULL,
        subtopic VARCHAR(100) NOT NULL,
        difficulty VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'Fix & Run Lab',
        mini_materi LONGTEXT NOT NULL,
        code_html LONGTEXT NOT NULL,
        code_css LONGTEXT NOT NULL,
        code_js LONGTEXT NOT NULL,
        task LONGTEXT NOT NULL,
        validation_js LONGTEXT NOT NULL,
        hint1 TEXT NOT NULL,
        hint2 TEXT NOT NULL,
        hint3 TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Questions table created/verified');

    // Clear existing data
    await dbConnection.execute('DELETE FROM questions');
    
    // Insert seed data using parameterized queries
    for (const question of seedData) {
      await dbConnection.execute(
        'INSERT INTO questions (title, xp, subject, subtopic, difficulty, type, mini_materi, code_html, code_css, code_js, task, validation_js, hint1, hint2, hint3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          question.title,
          question.xp,
          question.subject,
          question.subtopic,
          question.difficulty,
          question.type,
          question.mini_materi,
          question.code_html,
          question.code_css,
          question.code_js,
          question.task,
          question.validation_js,
          question.hint1,
          question.hint2,
          question.hint3
        ]
      );
    }
    console.log('Seed data inserted successfully - 14 questions total');

    console.log('Database initialized successfully');

    await dbConnection.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDatabase();