import OpenAI from 'openai';
import { getSettings } from './settingsService.js';

export async function optimizeText(text, mode) {
  const settings = await getSettings();
  
  if (!settings.arkApiKey) {
    throw new Error('API key not configured');
  }

  const openai = new OpenAI({
    apiKey: settings.arkApiKey,
    baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
  });

  const systemPrompt = `场景：备忘录语音转文字时的听写稿自动纠错 
任务：阅读全文，只修复听写错误，并按说话主题换行，其他保持原始语音细节不变 
要求：
- 绝对不修改句式，不删减内容 
流程： 
- 修复同音字、近音字、断句的听写错误 
- 修复专业术语和专有名词的听写错误`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      model: 'ep-20250106162436-rq79c',
    });

    return completion.choices[0]?.message?.content || text;
  } catch (error) {
    console.error('Error calling Doubao API:', error);
    throw error;
  }
}
