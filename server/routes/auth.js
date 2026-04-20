import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db.js';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'codesmic_secret_key_2026_keep_it_safe';

function createToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nama, email, dan password diperlukan.' });
    }

    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'Email sudah terdaftar.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const joinDate = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

    const [result] = await db.query(
      'INSERT INTO users (name, email, password_hash, role, institution, join_date, xp, level, challenges_completed, projects_completed, rank) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, passwordHash, 'Pelajar', 'SMK Negeri 1 Tech', joinDate, 0, 1, 0, 0, 'Rookie Star']
    );

    const token = createToken(result.insertId);
    res.json({
      token,
      user: {
        id: result.insertId,
        name,
        email,
        role: 'Pelajar',
        institution: 'SMK Negeri 1 Tech',
        joinDate,
        xp: 0,
        level: 1,
        maxXp: 100,
        challengesCompleted: 0,
        projectsCompleted: 0,
        rank: 'Rookie Star',
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mendaftar pengguna.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password diperlukan.' });
    }

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const user = users[0];
    const validPassword = bcrypt.compareSync(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const token = createToken(user.id);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution,
        joinDate: user.join_date,
        xp: user.xp,
        level: user.level,
        maxXp: 100,
        challengesCompleted: user.challenges_completed,
        projectsCompleted: user.projects_completed,
        rank: user.rank,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal melakukan login.' });
  }
});

export default router;
