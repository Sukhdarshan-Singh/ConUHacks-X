
import React, { useState, useEffect, useRef } from 'react';
import { Message } from './types';
import { getKevinResponse } from './services/geminiService';
import { IT_DATA } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        id: 'initial',
        sender: 'kevin',
        text: "I'm currently dealing with Susan's BIOS lockdown. This better be quick.",
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const responseText = await getKevinResponse(userText);
    
    const kevinMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'kevin',
      text: responseText,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, kevinMessage]);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f3f2f1]">
      {/* Sidebar Rail (Purple) */}
      <div className="w-16 bg-[#464775] flex flex-col items-center py-4 space-y-6 text-white/70">
        <div className="p-2 hover:bg-white/10 rounded cursor-pointer"><IconActivity /></div>
        <div className="p-2 bg-white/20 text-white rounded cursor-pointer"><IconChat /></div>
        <div className="p-2 hover:bg-white/10 rounded cursor-pointer"><IconTeams /></div>
        <div className="p-2 hover:bg-white/10 rounded cursor-pointer"><IconCalendar /></div>
        <div className="mt-auto p-2 hover:bg-white/10 rounded cursor-pointer"><IconSettings /></div>
      </div>

      {/* Chat List Sidebar */}
      <div className="w-64 md:w-80 bg-[#edebe9] border-r border-[#e1dfdd] flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <h1 className="font-bold text-xl">Chat</h1>
          <IconNewChat />
        </div>
        <div className="flex-grow overflow-y-auto">
          {/* Active Chat: Kevin */}
          <div className="px-4 py-3 bg-white border-l-4 border-[#464775] flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#464775] text-white flex items-center justify-center font-bold">K</div>
            <div className="flex-grow overflow-hidden">
              <div className="flex justify-between">
                <span className="font-semibold text-sm truncate">Kevin (IT Manager)</span>
                <span className="text-[10px] text-gray-500">10:42 AM</span>
              </div>
              <p className="text-xs text-gray-500 truncate">I'm currently dealing with...</p>
            </div>
          </div>
          {/* Mock Chats */}
          {IT_DATA.employees.filter(e => e.name !== 'Kevin').map(emp => (
            <div key={emp.name} className="px-4 py-3 hover:bg-[#e1dfdd] flex items-center space-x-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold uppercase">
                {emp.name.charAt(0)}
              </div>
              <div className="flex-grow overflow-hidden">
                <div className="flex justify-between">
                  <span className="font-medium text-sm truncate">{emp.name} ({emp.role})</span>
                </div>
                <p className="text-xs text-gray-500 truncate">Seen at 9:15 AM</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-grow flex flex-col bg-white">
        {/* Chat Header */}
        <div className="h-16 border-b border-[#edebe9] flex items-center px-6 justify-between">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-full bg-[#464775] text-white flex items-center justify-center text-xs font-bold">K</div>
             <div>
               <h2 className="font-bold text-sm">Kevin (IT Manager)</h2>
               <div className="flex items-center space-x-1">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 <span className="text-[10px] text-gray-500">Busy - Working on BIOS</span>
               </div>
             </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-500">
            <IconVideo />
            <IconCall />
            <IconScreenShare />
          </div>
        </div>

        {/* Messages Content */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#f5f5f5]">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-1 ${
                  m.sender === 'user' ? 'bg-[#464775] text-white ml-2' : 'bg-gray-300 text-gray-600 mr-2'
                }`}>
                  {m.sender === 'user' ? 'ME' : 'K'}
                </div>
                <div className={`shadow-sm rounded-lg p-3 ${
                  m.sender === 'user' ? 'bg-[#e7eaf7] text-[#242424]' : 'bg-white text-[#242424]'
                }`}>
                  <div className="flex justify-between items-baseline mb-1 space-x-4">
                    <span className="font-bold text-[12px]">{m.sender === 'user' ? 'You' : 'Kevin'}</span>
                    <span className="text-[10px] text-gray-400 font-normal">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start items-center space-x-2 text-gray-400 text-xs italic">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold mr-2 text-gray-400">K</div>
              <span>Kevin is typing...</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[#edebe9]">
          <form onSubmit={handleSubmit} className="bg-white border border-[#c8c6c4] rounded shadow-inner">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a new message"
              className="w-full p-3 text-sm border-none outline-none focus:ring-0"
              disabled={isTyping}
            />
            <div className="flex items-center justify-between px-2 pb-2 text-gray-500">
              <div className="flex space-x-3 scale-90">
                <IconFormat />
                <IconAttach />
                <IconEmoji />
                <IconGif />
              </div>
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                className="text-[#464775] hover:bg-gray-100 p-1 rounded disabled:opacity-30"
              >
                <IconSend />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Simple Icons ---
const IconActivity = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const IconChat = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const IconTeams = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconCalendar = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconSettings = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconNewChat = () => <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const IconVideo = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const IconCall = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const IconScreenShare = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconFormat = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const IconAttach = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>;
const IconEmoji = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconGif = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconSend = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;

export default App;
