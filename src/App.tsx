import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import DocumentViewer from './components/DocumentViewer';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<{ url: string; type: string } | null>(null);
  const [chatWidth, setChatWidth] = useState(50); // Chat component width percentage

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    setChatWidth(Math.max(20, Math.min(80, newWidth))); // Limit width between 20% and 80%
  }, []);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex">
        <div style={{ width: `${chatWidth}%` }} className="border-r">
          <ChatInterface />
        </div>
        <div
          className="w-1 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors"
          onMouseDown={handleMouseDown}
        />
        <div style={{ width: `${100 - chatWidth}%` }}>
          {selectedFile ? (
            <DocumentViewer fileUrl={selectedFile.url} fileType={selectedFile.type} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              請從左側選擇一個文件以查看
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;