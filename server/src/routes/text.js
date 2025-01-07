import express from 'express';
import { optimizeText } from '../services/textService.js';

const router = express.Router();

router.post('/optimize-text', async (req, res) => {
  try {
    const { text, mode } = req.body;
    const optimizedText = await optimizeText(text, mode);
    res.json({ text: optimizedText });
  } catch (error) {
    console.error('Error optimizing text:', error);
    res.status(500).json({ error: 'Failed to optimize text' });
  }
});

export default router;
