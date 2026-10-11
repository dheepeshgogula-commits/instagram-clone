import React, { useState } from 'react';
import { Search, X, CheckCircle2 } from 'lucide-react';
import { userSuggestions } from '../data/mockData';

export default function SearchDrawer({ isOpen, onClose, onSelectUser }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'sarah_travels',
    'alex_frontend',
    '#webdesign',
    'elena_design'
  ]);

  if (!isOpen) return null;

  const filteredUsers = userSuggestions.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase()) ||
    u.fullName.toLowerCase().includes(query.toLowerCase())
  );

  const removeRecent = (item) => {
    setRecentSearches((prev) => prev.filter((s) => s !== item));
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
          <h2 className="text-2xl font-bold">Search</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search input */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            autoFocus
            className="w-full bg-[#262626] rounded-lg pl-10 pr-9 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto">
          {!query.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">Recent</span>
                <button 
                  onClick={() => setRecentSearches([])}
                  className="text-xs font-semibold text-[#0095f6] hover:text-white"
                >
                  Clear all
                </button>
              </div>

              {recentSearches.length > 0 ? (
                <div className="space-y-1">
                  {recentSearches.map((item) => (
                    <div 
                      key={item}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1e1e1e] cursor-pointer"
                    >
                      <span className="text-sm text-neutral-200">{item}</span>
                      <button 
                        onClick={() => removeRecent(item)}
                        className="text-neutral-500 hover:text-white p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm py-8 text-center">No recent searches.</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => {
                      onSelectUser && onSelectUser(user);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#1e1e1e] cursor-pointer transition-colors"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.username} 
                      className="w-11 h-11 rounded-full object-cover" 
                    />
                    <div>
                      <div className="flex items-center gap-1 font-semibold text-sm text-white">
                        <span>{user.username}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 fill-[#0095f6] text-black" />
                      </div>
                      <span className="text-xs text-neutral-400">{user.fullName}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500 text-sm py-8 text-center">No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
