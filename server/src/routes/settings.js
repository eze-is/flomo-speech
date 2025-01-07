import express from 'express';
import { saveSettings, getSettings } from '../services/settingsService.js';

const router = express.Router();

// 获取设置
router.get('/settings', async (req, res) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ error: 'Failed to get settings' });
  }
});

// 保存设置
router.post('/settings', async (req, res) => {
  try {
    const { arkApiKey, flomoApi } = req.body;
    const settings = await saveSettings({ arkApiKey, flomoApi });
    res.json(settings);
  } catch (error) {
    console.error('Error saving settings:', error);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

export default router;
