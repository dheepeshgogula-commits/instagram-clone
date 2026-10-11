import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Smile, 
  Image as ImageIcon, 
  Heart, 
  Phone, 
  Video, 
  Info, 
  Search, 
  Edit, 
  CheckCircle2 
} from 'lucide-react';
import { initialConversations } from '../data/mockData';

const autoResponses = [
  'That sounds amazing! Let me take a look right away.',
  'Haha totally agreed! Let us connect later tonight 🙌',
  'Just saw this! Awesome work on the update 🚀',
  'Love it! Definitely adding that to my design inspiration board 🎨'
];

export default function DirectMessagesView({ currentUser }) {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConv?.messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'currentUser',
      text: inputText.trim(),
      timestamp: 'Just now'
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    const userText = inputText;
    setInputText('');

    // Trigger realistic AI-bot reply after 1.2s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
      const botMsg = {
        id: `bot_${Date.now()}`,
        sender: activeConv.user.username,
        text: randomResponse,
        timestamp: 'Just now'
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConvId) {
            return {
              ...c,
              messages: [...c.messages, botMsg]
            };
          }
          return c;
        })
      );
    }, 1200);
  };

  const sendQuickHeart = () => {
    if (!activeConv) return;
    const heartMsg = {
      id: `heart_${Date.now()}`,
      sender: 'currentUser',
      text: '❤️',
      timestamp: 'Just now'
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            messages: [...c.messages, heartMsg]
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="w-full max-w-[940px] mx-auto h-[calc(100vh-80px)] md:h-[calc(100vh-40px)] my-2 bg-black border border-[#262626] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
      {/* Left Chat List Panel */}
      <div className="w-full md:w-[350px] border-r border-[#262626] flex flex-col bg-black">
        {/* User DM Header */}
        <div className="h-16 px-4 border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-white">{currentUser.username}</span>
          </div>
          <button className="text-neutral-400 hover:text-white p-1">
            <Edit className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Search */}
        <div className="p-3 border-b border-[#262626]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search direct messages" 
              className="w-full bg-[#161616] border border-[#262626] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#1e1e1e]/40">
          {conversations.map((conv) => {
            const isSelected = conv.id === activeConvId;
            const lastMessage = conv.messages[conv.messages.length - 1];

            return (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`flex items-center gap-3 p-3.5 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#1a1a1a]' : 'hover:bg-[#121212]'
                }`}
              >
                <div className="relative">
                  <img 
                    src={conv.user.avatar} 
                    alt={conv.user.username} 
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  {conv.user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-black" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white truncate">
                      {conv.user.username}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {lastMessage?.timestamp || '1h'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 truncate mt-0.5">
                    {lastMessage?.sender === 'currentUser' ? 'You: ' : ''}
                    {lastMessage?.text || 'Sent an attachment'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Thread Window */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-black">
          {/* Active Chat Header */}
          <div className="h-16 px-4 border-b border-[#262626] flex items-center justify-between bg-black">
            <div className="flex items-center gap-3">
              <img 
                src={activeConv.user.avatar} 
                alt={activeConv.user.username} 
                className="w-9 h-9 rounded-full object-cover" 
              />
              <div>
                <span className="font-semibold text-sm text-white block leading-tight">
                  {activeConv.user.username}
                </span>
                <span className="text-[11px] text-neutral-400 block leading-tight">
                  {activeConv.user.lastActive}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-neutral-400">
              <button className="hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="hover:text-white transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="hover:text-white transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Top Recipient Card */}
            <div className="flex flex-col items-center py-6 text-center border-b border-[#222222] mb-4">
              <img 
                src={activeConv.user.avatar} 
                alt={activeConv.user.username} 
                className="w-20 h-20 rounded-full object-cover mb-2 ring-2 ring-neutral-800" 
              />
              <h4 className="font-bold text-base text-white">{activeConv.user.fullName}</h4>
              <p className="text-xs text-neutral-400">@{activeConv.user.username} • Instagram</p>
            </div>

            {/* Bubble list */}
            {activeConv.messages.map((m) => {
              const isMe = m.sender === 'currentUser';

              return (
                <div 
                  key={m.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img 
                      src={activeConv.user.avatar} 
                      alt="" 
                      className="w-7 h-7 rounded-full object-cover mr-2 self-end mb-1" 
                    />
                  )}
                  <div 
                    className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMe 
                        ? 'bg-[#3797f0] text-white rounded-br-xs' 
                        : 'bg-[#262626] text-neutral-100 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs py-1">
                <img 
                  src={activeConv.user.avatar} 
                  alt="" 
                  className="w-6 h-6 rounded-full object-cover" 
                />
                <span className="bg-[#262626] px-3 py-1.5 rounded-full animate-pulse">
                  typing...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Footer */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3 border-t border-[#262626] flex items-center gap-2 bg-black"
          >
            <div className="flex-1 flex items-center bg-[#1e1e1e] border border-[#2e2e2e] focus-within:border-neutral-500 rounded-full px-4 py-2 text-sm">
              <Smile className="w-5 h-5 text-neutral-400 cursor-pointer hover:text-white mr-2" />
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message..."
                className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
              />
              <ImageIcon className="w-5 h-5 text-neutral-400 cursor-pointer hover:text-white ml-2" />
            </div>

            {inputText.trim() ? (
              <button 
                type="submit"
                className="text-[#0095f6] font-semibold text-sm px-3 hover:text-white transition-colors"
              >
                Send
              </button>
            ) : (
              <button 
                type="button"
                onClick={sendQuickHeart}
                className="p-2 text-[#ff3040] hover:scale-110 active:scale-95 transition-transform"
              >
                <Heart className="w-6 h-6 fill-[#ff3040]" />
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-neutral-500 text-sm">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
}
