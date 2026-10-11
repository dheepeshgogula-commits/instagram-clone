# 📸 Instagram Web Clone

An ultra-responsive, pixel-perfect Instagram Web clone built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**. Designed for seamless deployment to **Vercel** with zero configuration.

![Instagram Clone Preview](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- **📱 Pixel-Perfect Instagram UI**: Authentic dark & light theme modes with official Instagram typography, icons, and gradients.
- **⭕ Interactive Stories Tray**:
  - Unseen gradient story rings with transition states.
  - Full-screen story player modal with multi-segment timer progress bars, pause on hold, left/right cycling, and quick heart reactions.
- **📰 Dynamic Main Feed**:
  - Double-tap or heart button with bursting heart animation and live counter.
  - Bookmark & save posts directly to your profile.
  - Interactive comments feed with real-time comment submission.
  - Post options menu with simulated report, unfollow, and link copy.
- **➕ Create Post Modal**:
  - Image upload with live preview or sample presets.
  - Built-in photo filter effects (*Clarendon, Gingham, Moon, Lark, Valencia*).
  - Caption writing with character count, location tag, and instant feed publication.
- **🎬 Reels Player**:
  - Vertical 9:16 reels experience with video playback, mute/unmute audio control, and spinning audio disc.
  - Dedicated comments drawer and like counters.
- **🧭 Explore Grid**:
  - Dynamic masonry collage with hover stats (Likes and Comments count).
  - Category filter pills (*For you, Architecture, Coding, Photography, Travel, Art*).
  - Post detail inspection modal.
- **💬 Direct Messages (DMs)**:
  - Conversations list with online status indicators.
  - Interactive chat stream with real-time messaging, quick heart reactions, and simulated AI auto-responses.
- **👤 Profile Page**:
  - Editable profile with bio, avatar switcher, and website link.
  - Story highlights carousel.
  - Tabs for **Posts**, **Saved**, and **Tagged**.
- **🔍 Quick Search & 🔔 Notifications Drawer**:
  - Live filter search with recent searches history.
  - Activity feed with follow/following toggles.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/instagram-clone.git
   cd instagram-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚡ Deployment to Vercel

### Option 1: Automatic Deploy with Vercel Git Integration (Recommended)
1. Push your repository to GitHub (see instructions below).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New...** > **Project**.
4. Import your `instagram-clone` repository.
5. Vercel automatically detects **Vite** with the included `vercel.json`. Click **Deploy**!

### Option 2: Deploy via Vercel CLI
```bash
# Log in to Vercel
npx vercel login

# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Hosting**: Vercel

---

## 📄 License

MIT License. Built for educational and portfolio demonstration purposes.
