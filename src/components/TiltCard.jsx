import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltCard — wraps children in a 3D perspective container that
 * rotates to follow the mouse cursor, giving a premium "bulging"
 * or depth-of-field card effect.
 *
 * Props:
 *   className  — additional class names for the outer wrapper
 *   intensity  — how much tilt (degrees). Default: 10
 *   scale      — scale on hover. Default: 1.03
 *   children   — card contents
 */
const TiltCard = ({ children, className = '', intensity = 10, scale = 1.03 }) => {
    const cardRef = useRef(null);

    // Raw motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Springy smoothing
    const springConfig = { damping: 20, stiffness: 250 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), springConfig);
    const scaleSpring = useSpring(1, springConfig);

    const handleMouseMove = (e) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseEnter = () => {
        scaleSpring.set(scale);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        scaleSpring.set(1);
    };

    return (
        <motion.div
            ref={cardRef}
            className={`cursor-pointer ${className}`}
            style={{
                perspective: '800px',
                rotateX,
                rotateY,
                scale: scaleSpring,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Subtle highlight layer that shifts with tilt */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
                    mixBlendMode: 'overlay',
                }} />
            {children}
        </motion.div>
    );
};

export default TiltCard;
