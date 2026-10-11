import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StoriesTray from './components/StoriesTray';
import PostCard from './components/PostCard';
import SuggestionsSidebar from './components/SuggestionsSidebar';
import StoryModal from './components/StoryModal';
import CreatePostModal from './components/CreatePostModal';
import ReelsView from './components/ReelsView';
import ExploreView from './components/ExploreView';
import DirectMessagesView from './components/DirectMessagesView';
import ProfileView from './components/ProfileView';
import SearchDrawer from './components/SearchDrawer';
import NotificationsDrawer from './components/NotificationsDrawer';
import PostDetailModal from './components/PostDetailModal';
import EditProfileModal from './components/EditProfileModal';
import { 
  currentUser as initialCurrentUser, 
  initialStories, 
  initialPosts, 
  initialReels 
} from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [user, setUser] = useState(initialCurrentUser);
  const [posts, setPosts] = useState(initialPosts);
  const [stories, setStories] = useState(initialStories);
  const [reels, setReels] = useState(initialReels);

  // Modals & Drawers
  const [activeStoryIdx, setActiveStoryIdx] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [detailPost, setDetailPost] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toast, setToast] = useState('');

  // Handle dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // Like Toggle
  const handleLikeToggle = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1
          };
        }
        return post;
      })
    );

    if (detailPost && detailPost.id === postId) {
      const isLiked = !detailPost.isLiked;
      setDetailPost({
        ...detailPost,
        isLiked,
        likesCount: isLiked ? (detailPost.likesCount || 0) + 1 : (detailPost.likesCount || 1) - 1
      });
    }
  };

  // Save/Bookmark Toggle
  const handleSaveToggle = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isSaved = !post.isSaved;
          showToast(isSaved ? 'Saved to collection' : 'Removed from saved');
          return { ...post, isSaved };
        }
        return post;
      })
    );
  };

  // Add Comment
  const handleAddComment = (postId, text) => {
    const newComment = {
      id: `c_${Date.now()}`,
      username: user.username,
      text,
      timestamp: 'Just now'
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );

    if (detailPost && detailPost.id === postId) {
      setDetailPost({
        ...detailPost,
        comments: [...(detailPost.comments || []), newComment]
      });
    }
  };

  // New Post published
  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setCurrentTab('home');
    showToast('Post shared successfully ✨');
  };

  // Saved posts filtered for profile
  const savedPosts = posts.filter((p) => p.isSaved);
  const userPosts = posts.filter((p) => p.user?.username === user.username);

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] flex justify-center selection:bg-[#0095f6] selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#262626] border border-[#3e3e3e] text-white px-5 py-2.5 rounded-2xl shadow-2xl text-sm font-medium animate-slide-up">
          {toast}
        </div>
      )}

      {/* Main Sidebar (Desktop left / Mobile top & bottom) */}
      <Sidebar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenCreate={() => setIsCreateOpen(true)}
        onToggleSearch={() => setIsSearchOpen(true)}
        onToggleNotifications={() => setIsNotifsOpen(true)}
        unreadMessagesCount={1}
        hasUnreadNotifs={true}
        currentUser={user}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Area */}
      <main className="w-full md:pl-18 xl:pl-64 pt-14 md:pt-4 pb-16 md:pb-4 flex justify-center">
        {currentTab === 'home' && (
          <div className="w-full flex justify-center gap-8 px-2 md:px-6">
            {/* Center Feed Column */}
            <div className="w-full max-w-[630px] flex flex-col items-center">
              {/* Stories Tray */}
              <StoriesTray 
                stories={stories}
                onSelectStory={(idx) => setActiveStoryIdx(idx)}
                onAddStory={() => setIsCreateOpen(true)}
              />

              {/* Feed Posts */}
              <div className="w-full space-y-2">
                {posts.map((post) => (
                  <PostCard 
                    key={post.id}
                    post={post}
                    onLikeToggle={handleLikeToggle}
                    onSaveToggle={handleSaveToggle}
                    onAddComment={handleAddComment}
                    onShare={() => showToast('Share link copied to clipboard!')}
                  />
                ))}
              </div>
            </div>

            {/* Right Desktop Suggestions Sidebar */}
            <SuggestionsSidebar 
              currentUser={user} 
              onSwitchProfile={() => setIsEditProfileOpen(true)}
            />
          </div>
        )}

        {currentTab === 'explore' && (
          <ExploreView 
            onSelectPost={(post) => setDetailPost(post)}
          />
        )}

        {currentTab === 'reels' && (
          <ReelsView 
            reels={reels} 
            onShare={() => showToast('Reel link copied to clipboard!')}
          />
        )}

        {currentTab === 'messages' && (
          <DirectMessagesView 
            currentUser={user}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView 
            currentUser={user}
            userPosts={userPosts.length > 0 ? userPosts : posts.slice(0, 3)}
            savedPosts={savedPosts}
            onEditProfile={() => setIsEditProfileOpen(true)}
            onSelectPost={(post) => setDetailPost(post)}
          />
        )}
      </main>

      {/* Story Viewer Modal */}
      {activeStoryIdx !== null && (
        <StoryModal 
          stories={stories}
          initialStoryIndex={activeStoryIdx}
          onClose={() => setActiveStoryIdx(null)}
          onSendReply={(username, reply) => showToast(`Reply sent to @${username}`)}
        />
      )}

      {/* Create New Post Modal */}
      <CreatePostModal 
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPostCreated={handlePostCreated}
        currentUser={user}
      />

      {/* Search Drawer */}
      <SearchDrawer 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectUser={() => setCurrentTab('profile')}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer 
        isOpen={isNotifsOpen}
        onClose={() => setIsNotifsOpen(false)}
      />

      {/* Post Detail Modal */}
      <PostDetailModal 
        post={detailPost}
        onClose={() => setDetailPost(null)}
        onLikeToggle={handleLikeToggle}
        onAddComment={handleAddComment}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentUser={user}
        onUpdateProfile={(updated) => {
          setUser({ ...user, ...updated });
          showToast('Profile updated!');
        }}
      />
    </div>
  );
}
