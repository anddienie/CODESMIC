import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import db from '../db.js';

const router = express.Router();
const tokens = new Map();

function createToken(userId) {
  const token = crypto.randomUUID();
  tokens.set(token, userId);
  return token;
}

export function getUserIdFromToken(token) {
  return tokens.get(token);
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
