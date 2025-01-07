import React, { useState, useEffect } from 'react';

const Settings = ({ className = '', onClose }) => {
  const [settings, setSettings] = useState({
    arkApiKey: '',
    flomoApi: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 加载现有设置
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/settings`);
        if (response.ok) {
          const data = await response.json();
          setSettings(prevSettings => ({
            ...prevSettings,
            ...data,
          }));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      if (response.ok) {
        const updatedSettings = await response.json();
        setSettings(updatedSettings);
        alert('设置已保存');
        onClose();
      } else {
        throw new Error('保存失败');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('保存设置时出错，请重试。');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={className} onClick={onClose}>
        <div 
          className="bg-white/80 dark:bg-[#2D2D2F] backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className} onClick={onClose}>
      <div 
        className="bg-white/80 dark:bg-[#2D2D2F] backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            设置
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              豆包 API Key
            </label>
            <input
              type="password"
              value={settings.arkApiKey || ''}
              onChange={(e) => setSettings(prev => ({ ...prev, arkApiKey: e.target.value }))}
              className="
                w-full px-4 py-3
                bg-transparent
                border border-gray-200 dark:border-gray-700
                rounded-xl
                text-gray-800 dark:text-gray-200
                placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-300
              "
              placeholder="请输入您的豆包 API Key"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Flomo API
            </label>
            <input
              type="text"
              value={settings.flomoApi || ''}
              onChange={(e) => setSettings(prev => ({ ...prev, flomoApi: e.target.value }))}
              className="
                w-full px-4 py-3
                bg-transparent
                border border-gray-200 dark:border-gray-700
                rounded-xl
                text-gray-800 dark:text-gray-200
                placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-300
              "
              placeholder="请输入您的 Flomo API 地址"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              在 Flomo 中获取您的 API 地址
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="
                px-6 py-3 rounded-xl
                text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors duration-300
              "
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !settings.arkApiKey}
              className={`
                px-6 py-3 rounded-xl
                font-medium text-white
                transition-all duration-300
                ${isSaving || !settings.arkApiKey
                  ? 'bg-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg'
                }
              `}
            >
              {isSaving ? '保存中...' : '保存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
