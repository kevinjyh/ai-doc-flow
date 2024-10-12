import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const initialMessages: Message[] = [
  { id: 1, text: "請選擇本採購屬下列哪個情形：\n(1)公告金額十分之一以下之採購。\n(2)逾公告金額十分之一未達公告金額之採購。\n(3)公告金額以上未達查核金額之採購。\n(4)查核金額以上未達巨額之採購。\n(5)巨額採購。", sender: 'ai' },
  { id: 2, text: "第3個", sender: 'user' },
  { id: 3, text: "本採購屬共同供應契約嗎？", sender: 'ai' },
  { id: 4, text: "不是", sender: 'user' },
  { id: 5, text: "本採購招標方式為下列哪一種：\n(1)公開招標\n(2)選擇性招標\n(3)限制性招標", sender: 'ai' },
  { id: 6, text: "1", sender: 'user' },
  { id: 7, text: "本採購是否允許廠商於開標前補正非契約必要之點之件？", sender: 'ai' },
  { id: 8, text: "不允許。", sender: 'user' },
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInput('');
      // 在這裡，您可以添加模擬AI回應的邏輯
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[70%] p-3 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <div className="flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="輸入您的訊息... (Shift + Enter 發送)"
            rows={3}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-full"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;