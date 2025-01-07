import { useState, useEffect, useCallback } from 'react';

export const useVoiceRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [lastSpeechTime, setLastSpeechTime] = useState(Date.now());
  const [currentSegment, setCurrentSegment] = useState('');
  const PAUSE_THRESHOLD = 5000; // 5秒的停顿阈值

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'zh-CN';

      recognition.onresult = (event) => {
        const currentTime = Date.now();
        const result = event.results[event.results.length - 1];
        const transcriptText = result[0].transcript;

        if (result.isFinal) {
          // 检查是否需要换行（超过停顿阈值）
          if (currentTime - lastSpeechTime > PAUSE_THRESHOLD) {
            setTranscript(prev => prev + (prev ? '\n' : '') + transcriptText);
          } else {
            setTranscript(prev => prev + transcriptText);
          }
          setCurrentSegment('');
          setLastSpeechTime(currentTime);
        } else {
          setCurrentSegment(transcriptText);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setCurrentSegment('');
      };

      setRecognition(recognition);
    }
  }, [lastSpeechTime]);

  const startRecording = useCallback(() => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
      setTranscript('');
      setCurrentSegment('');
      setLastSpeechTime(Date.now());
    }
  }, [recognition]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
      setCurrentSegment('');
    }
  }, [recognition]);

  return {
    isRecording,
    transcript: transcript + (currentSegment ? '\n' + currentSegment : ''),
    startRecording,
    stopRecording,
    isSupported: !!recognition,
  };
};
