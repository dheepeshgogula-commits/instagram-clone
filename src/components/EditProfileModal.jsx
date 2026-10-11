import React, { useState } from 'react';
import { X, Check, Camera } from 'lucide-react';

export default function EditProfileModal({ isOpen, onClose, currentUser, onUpdateProfile }) {
  const [formData, setFormData] = useState({
    fullName: currentUser.fullName,
    username: currentUser.username,
    bio: currentUser.bio,
    website: currentUser.website,
    avatar: currentUser.avatar
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    onClose();
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
  ];

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[500px] bg-[#262626] rounded-2xl border border-[#363636] p-6 text-white shadow-2xl animate-slide-up"
      >
        <div className="flex items-center justify-between border-b border-[#363636] pb-4 mb-6">
          <h3 className="font-bold text-lg">Edit profile</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Avatar Switcher */}
          <div className="flex items-center gap-4 bg-[#1a1a1a] p-3 rounded-xl border border-[#333333]">
            <img 
              src={formData.avatar} 
              alt="Avatar preview" 
              className="w-14 h-14 rounded-full object-cover ring-2 ring-neutral-700" 
            />
            <div>
              <span className="font-semibold block text-white text-xs mb-1">Choose Photo</span>
              <div className="flex gap-2">
                {sampleAvatars.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: url })}
                    className="w-7 h-7 rounded-full overflow-hidden border border-neutral-600 hover:border-white"
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">Name</label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#363636] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">Username</label>
            <input 
              type="text" 
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#363636] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">Website</label>
            <input 
              type="text" 
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#363636] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-1">Bio</label>
            <textarea 
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-[#363636] rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-neutral-400 resize-none leading-relaxed"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-[#0095f6] hover:bg-[#1877f2] font-semibold text-white rounded-xl transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
