import React from 'react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';

const VoiceRecorder = ({ onTranscription, className = '' }) => {
  const {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    isSupported,
  } = useVoiceRecognition();

  React.useEffect(() => {
    if (transcript) {
      onTranscription(transcript);
    }
  }, [transcript, onTranscription]);

  if (!isSupported) {
    return (
      <div className="text-red-500 text-center p-4 rounded-xl bg-red-50 dark:bg-red-900/20">
        您的浏览器不支持语音识别功能。请使用 Chrome 浏览器。
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`
          group
          relative
          w-20 h-20
          rounded-full
          flex items-center justify-center
          transition-all duration-500
          ${isRecording 
            ? 'bg-red-500 hover:bg-red-600 scale-110' 
            : 'bg-blue-500 hover:bg-blue-600'
          }
        `}
      >
        {/* 录音动画 */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-20"></div>
        )}
        
        {/* 图标 */}
        <div className={`
          transition-transform duration-300
          ${isRecording ? 'scale-90' : 'group-hover:scale-110'}
        `}>
          {isRecording ? (
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </div>
      </button>
      
      <div className={`
        mt-4 text-sm
        transition-all duration-300
        ${isRecording 
          ? 'text-red-500 dark:text-red-400' 
          : 'text-gray-600 dark:text-gray-400'
        }
      `}>
        {isRecording ? '点击停止录音' : '点击开始录音'}
      </div>
    </div>
  );
};

export default VoiceRecorder;
