# Momentum - Modern Habit Tracking App

A fully responsive, modern habit-tracking application built with **React**, **Tailwind CSS**, **Framer Motion**, and **React Three Fiber**. Features smooth animations, 3D elements, and a beautiful dark mode.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, professional design with smooth transitions
- 🌓 **Dark Mode** - Fully functional theme toggle with persistent state
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎭 **Smooth Animations** - Beautiful animations using Framer Motion
- 🎮 **3D Elements** - Interactive 3D sphere on landing page
- 🚀 **Fast Performance** - Built with Vite for lightning-fast development
- 🎯 **Multiple Pages**:
  - Landing Page with 3D effects
  - Authentication with avatar selection
  - User Dashboard with task tracking
  - Challenges Explorer
  - Community Feed
  - User Profile

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **React Three Fiber** - 3D graphics
- **@react-three/drei** - 3D helpers

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📂 Project Structure

```
stitch/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Header.jsx
│   │   ├── MobileNav.jsx
│   │   └── Scene3D.jsx
│   ├── context/        # React context providers
│   │   └── ThemeContext.jsx
│   ├── pages/          # Page components
│   │   ├── Landing.jsx
│   │   ├── Authentication.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Challenges.jsx
│   │   ├── Community.jsx
│   │   └── Profile.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Key Features Explained

### Smooth Animations
All interactions are animated using Framer Motion for butter-smooth transitions:
- Page transitions
- Hover effects
- Interactive elements
- Scroll animations

### 3D Elements
The landing page features an interactive 3D sphere built with React Three Fiber that responds to user interaction.

### Dark Mode
Theme preference is saved to localStorage and persists across sessions. Toggle with the theme button in the header.

### Mobile Navigation
Custom bottom navigation bar appears on mobile devices for easy thumb-friendly navigation.

## 🎯 Pages Overview

1. **Landing** (`/`) - Hero section with 3D effects, features, and CTA
2. **Authentication** (`/auth`) - Login/signup with avatar selection
3. **Dashboard** (`/dashboard`) - Daily tasks and habit streaks
4. **Challenges** (`/challenges`) - Browse and join challenges
5. **Community** (`/community`) - Social feed with posts
6. **Profile** (`/profile`) - User stats and achievements

## 🎨 Color Palette

- **Primary**: `#4ade80` (Green)
- **Background Light**: `#f6f8f7`
- **Background Dark**: `#122017`

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Google Material Symbols
- Design inspiration from modern productivity apps

---

Built with ❤️ using React and Tailwind CSS
