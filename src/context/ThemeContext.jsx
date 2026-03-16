import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });
  const [reveal, setReveal] = useState(null);
  const timersRef = useRef([]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const getOrigin = (source) => {
    if (source?.clientX != null && source?.clientY != null) {
      return { x: source.clientX, y: source.clientY };
    }
    if (source?.currentTarget?.getBoundingClientRect) {
      const rect = source.currentTarget.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  };

  const toggleTheme = (source) => {
    const nextIsDark = !isDark;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsDark(nextIsDark);
      return;
    }

    const origin = getOrigin(source);
    const maxX = Math.max(origin.x, window.innerWidth - origin.x);
    const maxY = Math.max(origin.y, window.innerHeight - origin.y);
    const radius = Math.hypot(maxX, maxY);

    setReveal({
      ...origin,
      radius,
      nextIsDark,
      active: false,
    });

    const activateId = window.setTimeout(() => {
      setReveal((prev) => (prev ? { ...prev, active: true } : prev));
    }, 10);

    const swapThemeId = window.setTimeout(() => {
      setIsDark(nextIsDark);
    }, 260);

    const cleanupId = window.setTimeout(() => {
      setReveal(null);
    }, 760);

    timersRef.current.push(activateId, swapThemeId, cleanupId);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
      {reveal && (
        <span
          aria-hidden="true"
          className="theme-reveal-overlay"
          style={{
            left: reveal.x,
            top: reveal.y,
            width: reveal.radius * 2,
            height: reveal.radius * 2,
            transform: `translate(-50%, -50%) scale(${reveal.active ? 1 : 0})`,
            background: reveal.nextIsDark ? '#122017' : '#f6f8f7',
          }}
        />
      )}
    </ThemeContext.Provider>
  );
};
