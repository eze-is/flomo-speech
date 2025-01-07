import express from 'express';
import { syncToFlomo } from '../services/flomoService.js';

const router = express.Router();

router.post('/sync-to-flomo', async (req, res) => {
  try {
    const { content } = req.body;
    const result = await syncToFlomo(content);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error syncing to Flomo:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to sync to Flomo' 
    });
  }
});

export default router;
