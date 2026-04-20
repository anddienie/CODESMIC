import express from 'express';
import db from '../db.js';
import { getUserIdFromToken } from './auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const [users] = await db.query(
      'SELECT xp, level, challenges_completed, projects_completed FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    const [activities] = await db.query(
      'SELECT title, xp, type, created_at FROM activities WHERE user_id = ? ORDER BY created_at DESC LIMIT 8',
      [userId]
    );

    res.json({
      progress: {
        level: users[0].level,
        xp: users[0].xp,
        maxXp: 100,
        challengesCompleted: users[0].challenges_completed,
        projectsCompleted: users[0].projects_completed,
      },
      recentActivity: activities.map((activity) => ({
        title: activity.title,
        xp: activity.xp,
        type: activity.type,
        time: activity.created_at,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil data progress.' });
  }
});

export default router;
