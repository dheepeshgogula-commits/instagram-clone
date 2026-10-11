import React, { useState } from 'react';
import { X, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { initialNotifications } from '../data/mockData';

export default function NotificationsDrawer({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  if (!isOpen) return null;

  const toggleFollow = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isFollowing: !n.isFollowing } : n))
    );
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[397px] h-full bg-[#121212] border-r border-[#262626] p-6 text-white flex flex-col shadow-2xl ml-0 md:ml-18 xl:ml-64 animate-slide-up"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
            This week
          </span>

          {notifications.map((notif) => (
            <div 
              key={notif.id}
              className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-[#1a1a1a] transition-colors"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={notif.user.avatar} 
                  alt={notif.user.username} 
                  className="w-11 h-11 rounded-full object-cover" 
                />
                <div className="text-xs leading-snug">
                  <span className="font-semibold text-white mr-1">
                    {notif.user.username}
                  </span>
                  <span className="text-neutral-300">{notif.content}</span>
                  <span className="text-neutral-500 block text-[11px] mt-0.5">
                    {notif.timestamp}
                  </span>
                </div>
              </div>

              {notif.type === 'follow' ? (
                <button
                  onClick={() => toggleFollow(notif.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    notif.isFollowing 
                      ? 'bg-[#262626] text-white hover:bg-[#333333]' 
                      : 'bg-[#0095f6] text-white hover:bg-[#1877f2]'
                  }`}
                >
                  {notif.isFollowing ? 'Following' : 'Follow'}
                </button>
              ) : notif.postThumbnail ? (
                <img 
                  src={notif.postThumbnail} 
                  alt="Post preview" 
                  className="w-10 h-10 rounded-md object-cover flex-shrink-0 border border-[#333333]" 
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
