import fs from 'fs/promises';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'settings.json');

export async function getSettings() {
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

export async function saveSettings(settings) {
  const existingSettings = await getSettings();
  const newSettings = { ...existingSettings, ...settings };
  
  try {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(newSettings, null, 2));
    return newSettings;
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
}
