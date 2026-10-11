import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, ArrowLeft, Smile, MapPin, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const samplePresets = [
  { name: 'Tokyo Neon', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1080&q=80' },
  { name: 'Mountain Lake', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80' },
  { name: 'Clean Workspace', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1080&q=80' },
  { name: 'Abstract Art', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&q=80' }
];

const filters = [
  { name: 'Normal', filterClass: '' },
  { name: 'Clarendon', filterClass: 'contrast-125 saturate-125' },
  { name: 'Gingham', filterClass: 'brightness-105 contrast-90 hue-rotate-15' },
  { name: 'Moon', filterClass: 'grayscale contrast-110' },
  { name: 'Lark', filterClass: 'brightness-110 saturate-90' },
  { name: 'Valencia', filterClass: 'sepia-[0.35] contrast-110 brightness-105' },
];

export default function CreatePostModal({ isOpen, onClose, onPostCreated, currentUser }) {
  const [step, setStep] = useState(1); // 1: Select, 2: Filter/Caption
  const [imagePreview, setImagePreview] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url) => {
    setImagePreview(url);
    setStep(2);
  };

  const handlePublish = () => {
    if (!imagePreview) return;

    const newPost = {
      id: `post_${Date.now()}`,
      user: {
        username: currentUser.username,
        avatar: currentUser.avatar,
        isVerified: currentUser.isVerified,
        location: location.trim() || 'Global'
      },
      mediaUrl: imagePreview,
      caption: caption.trim() || '✨ Just shared a new moment!',
      tags: ['#insta', '#clone', '#vibes'],
      likesCount: 1,
      isLiked: true,
      isSaved: false,
      timestamp: 'JUST NOW',
      comments: []
    };

    onPostCreated(newPost);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 }
    });
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setStep(1);
    setImagePreview('');
    setSelectedFilter('');
    setCaption('');
    setLocation('');
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full"
      >
        <X className="w-7 h-7" />
      </button>

      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[780px] bg-[#262626] rounded-2xl overflow-hidden border border-[#363636] shadow-2xl flex flex-col max-h-[85vh] animate-slide-up"
      >
        {/* Header */}
        <div className="h-12 border-b border-[#363636] flex items-center justify-between px-4 text-white">
          {step === 2 ? (
            <button 
              onClick={() => setStep(1)} 
              className="text-white hover:text-neutral-400 p-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5" />
          )}

          <h3 className="font-semibold text-sm">
            {step === 1 ? 'Create new post' : 'Edit & Caption'}
          </h3>

          {step === 2 ? (
            <button 
              onClick={handlePublish}
              className="text-sm font-semibold text-[#0095f6] hover:text-white transition-colors"
            >
              Share
            </button>
          ) : (
            <div className="w-5" />
          )}
        </div>

        {/* Content Body */}
        {step === 1 ? (
          <div className="p-8 flex flex-col items-center justify-center min-h-[420px] text-center">
            <div className="w-20 h-20 rounded-full bg-[#1e1e1e] border border-[#333333] flex items-center justify-center mb-4 text-white">
              <ImageIcon className="w-10 h-10 stroke-1" />
            </div>

            <h4 className="text-xl font-light text-white mb-2">Drag photos and videos here</h4>
            <p className="text-sm text-neutral-400 mb-6">Or select from your computer</p>

            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2 bg-[#0095f6] hover:bg-[#1877f2] text-white text-sm font-semibold rounded-lg transition-colors mb-6"
            >
              Select from computer
            </button>

            {/* Quick preset selector */}
            <div className="w-full max-w-md pt-4 border-t border-[#363636]">
              <span className="text-xs text-neutral-400 block mb-3 font-medium uppercase tracking-wider">
                Or choose from sample images
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(preset.url)}
                    className="group relative aspect-square rounded-lg overflow-hidden border border-[#3a3a3a] hover:border-white transition-all"
                  >
                    <img 
                      src={preset.url} 
                      alt={preset.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-1 text-[10px] text-white font-medium truncate">
                      {preset.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row h-full min-h-[460px] overflow-hidden">
            {/* Left Image Preview */}
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative min-h-[300px]">
              <img 
                src={imagePreview} 
                alt="Upload preview" 
                className={`max-h-[460px] w-full object-contain ${selectedFilter}`}
              />
            </div>

            {/* Right Editing & Caption Pane */}
            <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-[#363636] p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                {/* User info */}
                <div className="flex items-center gap-3">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.username} 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                  <span className="font-semibold text-sm text-white">{currentUser.username}</span>
                </div>

                {/* Caption input */}
                <div className="relative">
                  <textarea
                    rows={4}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write a caption..."
                    className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none resize-none leading-relaxed"
                  />
                  <div className="flex justify-between items-center text-xs text-neutral-500 pt-1">
                    <Smile className="w-4 h-4 cursor-pointer hover:text-white" />
                    <span>{caption.length}/2,200</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 border-y border-[#363636] py-2.5">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <input 
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add location"
                    className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
                  />
                </div>

                {/* Filters preview */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Photo Filter</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {filters.map((f) => (
                      <button
                        key={f.name}
                        onClick={() => setSelectedFilter(f.filterClass)}
                        className={`p-1 rounded-lg border text-center transition-all ${
                          selectedFilter === f.filterClass 
                            ? 'border-[#0095f6] bg-[#0095f6]/10 text-white font-semibold' 
                            : 'border-[#363636] text-neutral-400 hover:border-neutral-500'
                        }`}
                      >
                        <span className="text-[11px] block">{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Submit */}
              <div className="pt-4 border-t border-[#363636] mt-4">
                <button
                  onClick={handlePublish}
                  className="w-full py-2.5 bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish to Instagram</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
