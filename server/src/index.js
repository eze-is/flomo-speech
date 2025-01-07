import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import textRoutes from './routes/text.js';
import settingsRoutes from './routes/settings.js';
import flomoRoutes from './routes/flomo.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', textRoutes);
app.use('/api', settingsRoutes);
app.use('/api', flomoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
