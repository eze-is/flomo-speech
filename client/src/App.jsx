import React, { useState, useEffect } from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import TextEditor from './components/TextEditor';
import Settings from './components/Settings';

function App() {
  const [transcribedText, setTranscribedText] = useState('');
  const [optimizedText, setOptimizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleTranscription = (text) => {
    setTranscribedText(text);
  };

  const handleOptimize = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/optimize-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: transcribedText,
          mode: 'correct',
        }),
      });
      const data = await response.json();
      setOptimizedText(data.text);
    } catch (error) {
      console.error('Error optimizing text:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSyncToFlomo = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/sync-to-flomo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: optimizedText || transcribedText,
        }),
      });
      
      if (!response.ok) {
        throw new Error('同步失败');
      }
      
      alert('已成功同步到 Flomo！');
    } catch (error) {
      console.error('Error syncing to Flomo:', error);
      alert('同步到 Flomo 时出错，请确保已配置 Flomo API');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#1D1D1F] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            语音笔记助手
          </h1>
        </header>
        
        <div className="space-y-8">
          <div className="bg-white/80 dark:bg-[#2D2D2F] backdrop-blur-lg rounded-2xl shadow-lg p-8 transition-all duration-300">
            <VoiceRecorder 
              onTranscription={handleTranscription}
              className="mb-6"
            />
            <TextEditor 
              text={transcribedText}
              onTextChange={setTranscribedText}
              placeholder="开始说话后，文字会显示在这里..."
              className="transition-all duration-300"
            />
          </div>
          
          <div className="bg-white/80 dark:bg-[#2D2D2F] backdrop-blur-lg rounded-2xl shadow-lg p-8 transition-all duration-300">
            <button
              onClick={handleOptimize}
              disabled={isProcessing || !transcribedText}
              className={`
                w-full mb-6 py-3 px-6 rounded-xl font-medium text-white
                transition-all duration-300 transform
                ${isProcessing || !transcribedText
                  ? 'bg-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg'
                }
              `}
            >
              {isProcessing ? '优化中...' : 'AI 优化'}
            </button>
            <TextEditor 
              text={optimizedText}
              readOnly
              placeholder="优化后的文本将显示在这里..."
              className="transition-all duration-300"
            />
          </div>
          
          <div className="bg-white/80 dark:bg-[#2D2D2F] backdrop-blur-lg rounded-2xl shadow-lg p-8 transition-all duration-300">
            <button
              onClick={handleSyncToFlomo}
              disabled={isProcessing || (!transcribedText && !optimizedText)}
              className={`
                w-full py-3 px-6 rounded-xl font-medium
                transition-all duration-300 transform
                ${isProcessing || (!transcribedText && !optimizedText)
                  ? 'bg-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg'
                }
              `}
            >
              {isProcessing ? '同步中...' : '同步到 Flomo'}
            </button>
          </div>
        </div>

        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-4 rounded-full bg-white/80 dark:bg-[#2D2D2F] shadow-lg backdrop-blur-lg
                     hover:scale-[1.05] active:scale-[0.98] transition-all duration-300"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {showSettings && (
          <Settings 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
