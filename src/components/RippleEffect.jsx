import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

let uid = 0;

/**
 * RippleEffect — global click / tap ripple overlay.
 * Renders an expanding semi-transparent circle at every pointerdown position.
 * Add <RippleEffect /> once at the root (App.jsx).
 */
export default function RippleEffect() {
  const [ripples, setRipples] = useState([]);

  const onPointerDown = useCallback((e) => {
    const id = ++uid;
    setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    /* Auto-remove after animation completes */
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 750);
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [onPointerDown]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] select-none overflow-hidden"
    >
      <AnimatePresence>
        {ripples.map(({ id, x, y }) => (
          <motion.span
            key={id}
            initial={{ scale: 0, opacity: 0.65 }}
            animate={{ scale: 18, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.4, 1] }}
            style={{
              position: 'absolute',
              left: x - 14,
              top:  y - 14,
              width:  28,
              height: 28,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(74,222,128,0.55) 0%, rgba(74,222,128,0.15) 45%, transparent 70%)',
              transformOrigin: 'center center',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
