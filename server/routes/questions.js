import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, title, xp, subject, subtopic, difficulty, type FROM questions ORDER BY id'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memuat daftar soal.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const questionId = Number(req.params.id);
    const [rows] = await db.query('SELECT * FROM questions WHERE id = ?', [questionId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Soal tidak ditemukan.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memuat data soal.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      title,
      xp,
      subject,
      subtopic,
      difficulty,
      type,
      mini_materi,
      code_html,
      code_css,
      code_js,
      task,
      validation_js,
      hint1,
      hint2,
      hint3,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO questions (title, xp, subject, subtopic, difficulty, type, mini_materi, code_html, code_css, code_js, task, validation_js, hint1, hint2, hint3)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        xp,
        subject,
        subtopic,
        difficulty,
        type,
        mini_materi,
        code_html,
        code_css,
        code_js,
        task,
        validation_js,
        hint1,
        hint2,
        hint3,
      ]
    );

    const [rows] = await db.query('SELECT * FROM questions WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menambahkan soal.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const questionId = Number(req.params.id);
    const {
      title,
      xp,
      subject,
      subtopic,
      difficulty,
      type,
      mini_materi,
      code_html,
      code_css,
      code_js,
      task,
      validation_js,
      hint1,
      hint2,
      hint3,
    } = req.body;

    await db.query(
      `UPDATE questions SET title = ?, xp = ?, subject = ?, subtopic = ?, difficulty = ?, type = ?, mini_materi = ?, code_html = ?, code_css = ?, code_js = ?, task = ?, validation_js = ?, hint1 = ?, hint2 = ?, hint3 = ?
       WHERE id = ?`,
      [
        title,
        xp,
        subject,
        subtopic,
        difficulty,
        type,
        mini_materi,
        code_html,
        code_css,
        code_js,
        task,
        validation_js,
        hint1,
        hint2,
        hint3,
        questionId,
      ]
    );

    const [rows] = await db.query('SELECT * FROM questions WHERE id = ?', [questionId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Soal tidak ditemukan.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memperbarui soal.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const questionId = Number(req.params.id);
    const [result] = await db.query('DELETE FROM questions WHERE id = ?', [questionId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Soal tidak ditemukan.' });
    }
    res.json({ message: 'Soal berhasil dihapus.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menghapus soal.' });
  }
});

export default router;
