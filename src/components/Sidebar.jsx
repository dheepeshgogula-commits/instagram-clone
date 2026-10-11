import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Compass, 
  Film, 
  MessageCircle, 
  Heart, 
  PlusSquare, 
  Menu, 
  Moon, 
  Sun, 
  Bookmark, 
  Settings, 
  LogOut
} from 'lucide-react';

function InstagramIcon({ className = "w-6 h-6" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  onOpenCreate, 
  onToggleSearch, 
  onToggleNotifications, 
  unreadMessagesCount, 
  hasUnreadNotifs,
  currentUser,
  isDarkMode,
  setIsDarkMode
}) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, action: () => setCurrentTab('home') },
    { id: 'search', label: 'Search', icon: Search, action: onToggleSearch },
    { id: 'explore', label: 'Explore', icon: Compass, action: () => setCurrentTab('explore') },
    { id: 'reels', label: 'Reels', icon: Film, action: () => setCurrentTab('reels') },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: MessageCircle, 
      action: () => setCurrentTab('messages'),
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null 
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Heart, 
      action: onToggleNotifications,
      hasDot: hasUnreadNotifs 
    },
    { id: 'create', label: 'Create', icon: PlusSquare, action: onOpenCreate },
    { 
      id: 'profile', 
      label: 'Profile', 
      isProfile: true, 
      action: () => setCurrentTab('profile') 
    },
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-18 xl:w-64 border-r border-[#262626] bg-black text-white px-3 py-6 z-40 transition-all duration-300">
        {/* Instagram Brand Logo */}
        <div 
          onClick={() => setCurrentTab('home')} 
          className="cursor-pointer mb-8 px-3 flex items-center h-10 select-none group"
        >
          <div className="xl:hidden flex items-center justify-center w-full">
            <InstagramIcon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          </div>
          <div className="hidden xl:block">
            <span className="font-['Grand_Hotel'] text-3xl font-semibold tracking-wide text-white hover:opacity-90">
              Instagram
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group text-left relative ${
                  isActive ? 'font-bold bg-[#1a1a1a]' : 'hover:bg-[#121212] font-normal text-neutral-300 hover:text-white'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  {item.isProfile ? (
                    <div className={`w-7 h-7 rounded-full p-[2px] ${isActive ? 'ring-2 ring-white' : 'group-hover:ring-1 group-hover:ring-neutral-400'}`}>
                      <img 
                        src={currentUser.avatar} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover" 
                      />
                    </div>
                  ) : (
                    <Icon className={`w-6 h-6 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'stroke-[2.5px] text-white' : 'stroke-[1.75px]'}`} />
                  )}

                  {/* Badges */}
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 bg-[#ff3040] text-white text-[11px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center ring-2 ring-black">
                      {item.badge}
                    </span>
                  )}
                  {item.hasDot && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#ff3040] rounded-full ring-2 ring-black animate-pulse" />
                  )}
                </div>

                <span className="hidden xl:inline-block text-[15px] truncate">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom More Button */}
        <div className="relative mt-auto">
          {showMoreMenu && (
            <div className="absolute bottom-14 left-0 w-56 bg-[#1e1e1e] border border-[#333333] rounded-2xl p-2 shadow-2xl z-50 text-sm animate-slide-up">
              <button
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  setShowMoreMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2c2c2c] transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
                <span>Switch appearance</span>
              </button>
              <button
                onClick={() => {
                  setCurrentTab('profile');
                  setShowMoreMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2c2c2c] transition-colors"
              >
                <Bookmark className="w-5 h-5 text-neutral-400" />
                <span>Saved posts</span>
              </button>
              <button
                onClick={() => {
                  setShowMoreMenu(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2c2c2c] transition-colors"
              >
                <Settings className="w-5 h-5 text-neutral-400" />
                <span>Settings</span>
              </button>
              <div className="my-1 border-t border-[#333333]" />
              <button
                onClick={() => setShowMoreMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2c2c2c] text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </button>
            </div>
          )}

          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-[#121212] transition-colors group"
          >
            <Menu className="w-6 h-6 stroke-[1.75px] group-hover:scale-105 transition-transform" />
            <span className="hidden xl:inline-block text-[15px]">More</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-black/95 backdrop-blur-md border-b border-[#262626] flex items-center justify-between px-4 z-40">
        <span 
          onClick={() => setCurrentTab('home')}
          className="font-['Grand_Hotel'] text-2xl font-semibold tracking-wide cursor-pointer"
        >
          Instagram
        </span>

        <div className="flex items-center gap-4">
          <button onClick={onToggleNotifications} className="relative p-1">
            <Heart className="w-6 h-6" />
            {hasUnreadNotifs && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff3040] rounded-full ring-2 ring-black" />
            )}
          </button>
          <button onClick={() => setCurrentTab('messages')} className="relative p-1">
            <MessageCircle className="w-6 h-6" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff3040] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {unreadMessagesCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-black/95 backdrop-blur-md border-t border-[#262626] flex items-center justify-around px-2 z-40">
        <button 
          onClick={() => setCurrentTab('home')} 
          className={`p-2 ${currentTab === 'home' ? 'text-white' : 'text-neutral-400'}`}
        >
          <Home className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setCurrentTab('explore')} 
          className={`p-2 ${currentTab === 'explore' ? 'text-white' : 'text-neutral-400'}`}
        >
          <Compass className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setCurrentTab('reels')} 
          className={`p-2 ${currentTab === 'reels' ? 'text-white' : 'text-neutral-400'}`}
        >
          <Film className="w-6 h-6" />
        </button>

        <button 
          onClick={onOpenCreate} 
          className="p-2 text-neutral-400 hover:text-white"
        >
          <PlusSquare className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setCurrentTab('profile')} 
          className="p-2"
        >
          <img 
            src={currentUser.avatar} 
            alt="Profile" 
            className={`w-6 h-6 rounded-full object-cover ${currentTab === 'profile' ? 'ring-2 ring-white' : ''}`} 
          />
        </button>
      </nav>
    </>
  );
}
