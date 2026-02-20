import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import MobileNav from './MobileNav';

// Page transition variants
const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
        opacity: 0,
        y: -12,
        transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
    },
};

/**
 * Layout wraps all inner app pages (Dashboard, Challenges, Community, Profile).
 * It provides:
 *  - The shared sticky Header (with active-route highlighting, theme toggle, auth state)
 *  - Smooth page-enter/exit animation via Framer Motion
 *  - The bottom MobileNav bar for small screens
 */
const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex flex-col">
            <Header />
            <motion.main
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 pb-20 lg:pb-0"
            >
                {children}
            </motion.main>
            <MobileNav />
        </div>
    );
};

export default Layout;
