import fetch from 'node-fetch';
import { getSettings } from './settingsService.js';

export async function syncToFlomo(content) {
  const settings = await getSettings();
  const flomoApi = settings.flomoApi;

  if (!flomoApi) {
    throw new Error('Flomo API not configured');
  }

  try {
    const response = await fetch(flomoApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to sync to Flomo: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error syncing to Flomo:', error);
    throw error;
  }
}
