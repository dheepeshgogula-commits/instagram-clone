import React, { useState } from 'react';
import { userSuggestions } from '../data/mockData';

export default function SuggestionsSidebar({ currentUser, onSwitchProfile }) {
  const [suggestions, setSuggestions] = useState(userSuggestions);

  const toggleFollow = (id) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFollowing: !s.isFollowing } : s))
    );
  };

  return (
    <aside className="hidden lg:block w-[320px] pl-6 pt-4 text-white">
      {/* Current user switch profile banner */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.username} 
            className="w-11 h-11 rounded-full object-cover ring-1 ring-neutral-700" 
          />
          <div>
            <span className="font-semibold text-sm hover:underline cursor-pointer block leading-tight text-white">
              {currentUser.username}
            </span>
            <span className="text-neutral-400 text-xs block leading-tight">
              {currentUser.fullName}
            </span>
          </div>
        </div>

        <button 
          onClick={onSwitchProfile}
          className="text-xs font-semibold text-[#0095f6] hover:text-white transition-colors"
        >
          Switch
        </button>
      </div>

      {/* Suggested for you header */}
      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="text-neutral-400 font-semibold text-xs">
          Suggested for you
        </span>
        <button className="text-xs font-semibold text-white hover:text-neutral-400">
          See All
        </button>
      </div>

      {/* Suggestions list */}
      <div className="space-y-3.5 mb-8">
        {suggestions.map((sugg) => (
          <div key={sugg.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={sugg.avatar} 
                alt={sugg.username} 
                className="w-9 h-9 rounded-full object-cover" 
              />
              <div>
                <span className="font-semibold text-xs hover:underline cursor-pointer block leading-tight text-white">
                  {sugg.username}
                </span>
                <span className="text-[11px] text-neutral-500 block leading-tight w-36 truncate">
                  {sugg.relation}
                </span>
              </div>
            </div>

            <button 
              onClick={() => toggleFollow(sugg.id)}
              className={`text-xs font-semibold transition-colors ${
                sugg.isFollowing 
                  ? 'text-neutral-400 hover:text-white' 
                  : 'text-[#0095f6] hover:text-white'
              }`}
            >
              {sugg.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      {/* Meta Footer links */}
      <div className="text-[11px] text-neutral-500 space-y-3 leading-relaxed">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language', 'Meta Verified'].map((link) => (
            <span key={link} className="hover:underline cursor-pointer">{link}</span>
          ))}
        </div>
        <p className="text-neutral-600 uppercase tracking-wider text-[10px]">
          © 2026 INSTAGRAM FROM META • CLONE
        </p>
      </div>
    </aside>
  );
}
