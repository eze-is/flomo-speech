import React from 'react';

const TextEditor = ({ 
  text, 
  onTextChange, 
  readOnly = false, 
  placeholder = '',
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      <textarea
        value={text}
        onChange={(e) => !readOnly && onTextChange?.(e.target.value)}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`
          w-full min-h-[200px] p-6
          bg-transparent
          border border-gray-200 dark:border-gray-700
          rounded-xl
          text-gray-800 dark:text-gray-200
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-all duration-300
          ${readOnly ? 'cursor-default' : 'cursor-text'}
        `}
        style={{
          fontSize: '16px',
          lineHeight: '1.6',
          resize: 'vertical',
        }}
      />
    </div>
  );
};

export default TextEditor;
