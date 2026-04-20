import express from 'express';
import db from '../db.js';
import { getUserIdFromToken } from './auth.js';

const router = express.Router();

router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const [rows] = await db.query(
      'SELECT id, name, email, role, institution, join_date, xp, level, challenges_completed, projects_completed, rank FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    const user = rows[0];
    res.json({
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
    res.status(500).json({ message: 'Gagal mengambil profil pengguna.' });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, institution } = req.body;

    // Validate and trim inputs
    const trimmedName = name?.trim();
    const trimmedInstitution = institution?.trim();

    if (!trimmedName || trimmedName.length === 0) {
      return res.status(400).json({ message: 'Nama tidak boleh kosong.' });
    }

    if (!trimmedInstitution || trimmedInstitution.length === 0) {
      return res.status(400).json({ message: 'Institusi tidak boleh kosong.' });
    }

    // Update user data
    await db.query(
      'UPDATE users SET name = ?, institution = ? WHERE id = ?',
      [trimmedName, trimmedInstitution, userId]
    );

    // Fetch updated user data
    const [rows] = await db.query(
      'SELECT id, name, email, role, institution, join_date, xp, level, challenges_completed, projects_completed, rank FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    const user = rows[0];
    res.json({
      message: 'Profil berhasil diperbarui.',
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
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Gagal memperbarui profil pengguna.' });
  }
});

export default router;
