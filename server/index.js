import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import progressRoutes from './routes/progress.js';
import questionRoutes from './routes/questions.js';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 4000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/questions', questionRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
