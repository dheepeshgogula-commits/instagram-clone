export const currentUser = {
  id: 'user_curr',
  username: 'dheeraj_dev',
  fullName: 'Dheeraj Kumar',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  bio: 'Building clean web apps & full-stack experiences ⚡\nTech enthusiast 🚀 | Coffee & Code ☕',
  website: 'https://github.com',
  followers: 1420,
  following: 512,
  postsCount: 9,
  isVerified: true
};

export const initialStories = [
  {
    id: 'story_0',
    username: 'Your Story',
    isUser: true,
    avatar: currentUser.avatar,
    hasUnseen: false,
    items: [
      {
        id: 's0_1',
        mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1080&q=80',
        timestamp: '1h ago',
        caption: 'Late night coding session 💻✨'
      }
    ]
  },
  {
    id: 'story_1',
    username: 'sarah_travels',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    hasUnseen: true,
    items: [
      {
        id: 's1_1',
        mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&q=80',
        timestamp: '2h ago',
        caption: 'Sunset in Bali 🌅 Incredible waves today!'
      },
      {
        id: 's1_2',
        mediaUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1080&q=80',
        timestamp: '1h ago',
        caption: 'Tropical paradise vibes 🌴'
      }
    ]
  },
  {
    id: 'story_2',
    username: 'alex_frontend',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
    hasUnseen: true,
    items: [
      {
        id: 's2_1',
        mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1080&q=80',
        timestamp: '3h ago',
        caption: 'TypeScript 5.5 is out and the type inference is mindblowing! 🚀'
      }
    ]
  },
  {
    id: 'story_3',
    username: 'elena_design',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    hasUnseen: true,
    items: [
      {
        id: 's3_1',
        mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1080&q=80',
        timestamp: '4h ago',
        caption: 'Abstract 3D aesthetics exploration in Blender 🎨'
      }
    ]
  },
  {
    id: 'story_4',
    username: 'marcus_fit',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    hasUnseen: true,
    items: [
      {
        id: 's4_1',
        mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1080&q=80',
        timestamp: '5h ago',
        caption: 'Morning 5AM workout routine completed 💪'
      }
    ]
  },
  {
    id: 'story_5',
    username: 'nordic_nature',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
    hasUnseen: true,
    items: [
      {
        id: 's5_1',
        mediaUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80',
        timestamp: '7h ago',
        caption: 'Foggy mountain peaks of Norway 🏔️'
      }
    ]
  },
  {
    id: 'story_6',
    username: 'tokyo_vibes',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    hasUnseen: false,
    items: [
      {
        id: 's6_1',
        mediaUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1080&q=80',
        timestamp: '9h ago',
        caption: 'Neon lights in Shibuya crossing at midnight 🏮'
      }
    ]
  }
];

export const initialPosts = [
  {
    id: 'post_1',
    user: {
      username: 'elena_design',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      location: 'Milan, Italy'
    },
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    caption: 'Fluid gradient geometry experiment. Exploring generative forms and smooth chromatic distortions for our new design system 🔮✨ Drop your thoughts in the comments!',
    tags: ['#design', '#generativeart', '#creative', '#uiux'],
    likesCount: 3842,
    isLiked: false,
    isSaved: false,
    timestamp: '2 HOURS AGO',
    comments: [
      { id: 'c1', username: 'alex_frontend', text: 'This looks incredibly sleek! What tool did you render this in?', timestamp: '1h ago', likes: 14 },
      { id: 'c2', username: 'dheeraj_dev', text: 'The depth and specular reflections are top tier 🔥', timestamp: '45m ago', likes: 8 }
    ]
  },
  {
    id: 'post_2',
    user: {
      username: 'sarah_travels',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      location: 'Santorini, Greece'
    },
    mediaUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    caption: 'Waking up to this breathtaking Aegean view never gets old 🇬🇷💙 Have you ever visited Greece? Let me know your favorite island!',
    tags: ['#santorini', '#greece', '#wanderlust', '#travelgram'],
    likesCount: 8920,
    isLiked: true,
    isSaved: true,
    timestamp: '4 HOURS AGO',
    comments: [
      { id: 'c3', username: 'marcus_fit', text: 'Stunning picture Sarah! Hope you have an awesome vacation 🙌', timestamp: '3h ago', likes: 21 },
      { id: 'c4', username: 'nordic_nature', text: 'The contrast of white and deep blue is unmatched!', timestamp: '2h ago', likes: 5 }
    ]
  },
  {
    id: 'post_3',
    user: {
      username: 'alex_frontend',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
      isVerified: false,
      location: 'San Francisco, CA'
    },
    mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Refactored 4,000 lines of legacy code into clean modern micro-components today. Zero runtime errors and 60fps animations. A developer\'s sweetest dream 💻⚡',
    tags: ['#code', '#react', '#javascript', '#cleancode', '#developer'],
    likesCount: 1450,
    isLiked: false,
    isSaved: false,
    timestamp: '6 HOURS AGO',
    comments: [
      { id: 'c5', username: 'dheeraj_dev', text: 'Clean architecture always pays off! Great work Alex 🚀', timestamp: '5h ago', likes: 12 }
    ]
  },
  {
    id: 'post_4',
    user: {
      username: 'nordic_nature',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      location: 'Lofoten Islands, Norway'
    },
    mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    caption: 'The golden hour light kissing the mirrored alpine waters. Nature in its purest, most tranquil essence 🌲🍂 Keep wild places wild.',
    tags: ['#nature', '#norway', '#earthpix', '#adventure'],
    likesCount: 12380,
    isLiked: false,
    isSaved: false,
    timestamp: '12 HOURS AGO',
    comments: [
      { id: 'c6', username: 'sarah_travels', text: 'Adding Lofoten to my travel bucket list immediately!', timestamp: '10h ago', likes: 33 }
    ]
  }
];

export const initialReels = [
  {
    id: 'reel_1',
    creator: {
      username: 'drone_cinematics',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isVerified: true
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&q=80',
    caption: 'Crystal clear turquoise waves captured from 400ft above 🌊 What does this make you feel? #drone #nature #ocean',
    audioTitle: 'Original Audio - Waves & Synth Lo-fi',
    likesCount: 45200,
    isLiked: false,
    commentsCount: 1240,
    sharesCount: 3820
  },
  {
    id: 'reel_2',
    creator: {
      username: 'tech_minimalist',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
      isVerified: true
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-keyboard-typing-slow-motion-42562-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1080&q=80',
    caption: 'Mechanical switches acoustic test ⌨️ Custom tactile lubed build. Headphones recommended 🎧 #setup #keebs #coding',
    audioTitle: 'Bespoke Keeb ASMR • Sound Lab',
    likesCount: 28900,
    isLiked: true,
    commentsCount: 680,
    sharesCount: 1420
  },
  {
    id: 'reel_3',
    creator: {
      username: 'tokyo_streetlife',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
      isVerified: true
    },
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-night-traffic-in-the-city-43407-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1080&q=80',
    caption: 'Rainy cyber night reflections in Akihabara 🏮 Cyberpunk vibes in real life #tokyo #japan #nightwalk',
    audioTitle: 'Kavinsky - Nightcall (Slowed & Reverb)',
    likesCount: 61400,
    isLiked: false,
    commentsCount: 2310,
    sharesCount: 9400
  }
];

export const explorePosts = [
  { id: 'exp_1', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80', likes: 1240, comments: 85, isBig: true },
  { id: 'exp_2', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', likes: 890, comments: 42 },
  { id: 'exp_3', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80', likes: 3200, comments: 198 },
  { id: 'exp_4', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', likes: 4500, comments: 310 },
  { id: 'exp_5', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80', likes: 1820, comments: 92 },
  { id: 'exp_6', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1515260268569-9271009adfdb?auto=format&fit=crop&w=600&q=80', likes: 780, comments: 34 },
  { id: 'exp_7', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', likes: 6200, comments: 412, isBig: true },
  { id: 'exp_8', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80', likes: 980, comments: 64 },
  { id: 'exp_9', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', likes: 5120, comments: 330 },
  { id: 'exp_10', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80', likes: 2300, comments: 145 },
  { id: 'exp_11', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80', likes: 4120, comments: 280 },
  { id: 'exp_12', type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', likes: 8900, comments: 510 }
];

export const initialConversations = [
  {
    id: 'conv_1',
    user: {
      username: 'elena_design',
      fullName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isOnline: true,
      lastActive: 'Active now'
    },
    messages: [
      { id: 'm1', sender: 'elena_design', text: 'Hey Dheeraj! Checked out your latest React component project, it looks super clean!', timestamp: '10:30 AM' },
      { id: 'm2', sender: 'currentUser', text: 'Thanks Elena! Really appreciate that. How is the 3D redesign going?', timestamp: '10:32 AM' },
      { id: 'm3', sender: 'elena_design', text: 'Just rendered the final lighting pass! Will send a preview in a bit 🚀', timestamp: '10:35 AM' }
    ],
    unreadCount: 1
  },
  {
    id: 'conv_2',
    user: {
      username: 'sarah_travels',
      fullName: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      isOnline: false,
      lastActive: 'Active 2h ago'
    },
    messages: [
      { id: 'm4', sender: 'sarah_travels', text: 'You definitely need to visit Greece next summer! The sunset in Oia was pure magic.', timestamp: 'Yesterday' },
      { id: 'm5', sender: 'currentUser', text: 'Putting it on top of my list! Any hotel recommendations?', timestamp: 'Yesterday' }
    ],
    unreadCount: 0
  },
  {
    id: 'conv_3',
    user: {
      username: 'alex_frontend',
      fullName: 'Alex Vance',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
      isOnline: true,
      lastActive: 'Active now'
    },
    messages: [
      { id: 'm6', sender: 'alex_frontend', text: 'Did you test the new Vite 6 compiler speeds yet?', timestamp: 'Oct 8' },
      { id: 'm7', sender: 'currentUser', text: 'Yeah, build time dropped by almost 40%, it is wild!', timestamp: 'Oct 8' }
    ],
    unreadCount: 0
  }
];

export const initialNotifications = [
  {
    id: 'notif_1',
    type: 'like',
    user: { username: 'elena_design', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    content: 'liked your photo.',
    postThumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=150&q=80',
    timestamp: '2h ago'
  },
  {
    id: 'notif_2',
    type: 'follow',
    user: { username: 'marcus_fit', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    content: 'started following you.',
    isFollowing: false,
    timestamp: '5h ago'
  },
  {
    id: 'notif_3',
    type: 'comment',
    user: { username: 'alex_frontend', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80' },
    content: 'commented: "Clean architecture always pays off! Great work Alex 🚀"',
    postThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=150&q=80',
    timestamp: '1d ago'
  },
  {
    id: 'notif_4',
    type: 'like',
    user: { username: 'nordic_nature', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80' },
    content: 'liked your reel.',
    postThumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80',
    timestamp: '2d ago'
  }
];

export const userSuggestions = [
  {
    id: 'sugg_1',
    username: 'cristiano',
    fullName: 'Cristiano Ronaldo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    relation: 'Followed by sarah_travels + 12 more',
    isFollowing: false
  },
  {
    id: 'sugg_2',
    username: 'nasa',
    fullName: 'NASA',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    relation: 'Popular • Verified',
    isFollowing: false
  },
  {
    id: 'sugg_3',
    username: 'google',
    fullName: 'Google',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
    relation: 'Suggested for you',
    isFollowing: false
  },
  {
    id: 'sugg_4',
    username: 'nationalgeographic',
    fullName: 'National Geographic',
    avatar: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80',
    relation: 'Followed by nordic_nature',
    isFollowing: false
  }
];
