import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useTheme } from "../ThemeProvider";

interface PageTransitionProps {
  children?: ReactNode;
  mode?: "fade" | "slide" | "scale" | "none";
  duration?: number;
}

const PageTransition = ({
  children,
  mode = "fade",
  duration = 0.5,
}: PageTransitionProps) => {
  const location = useLocation();
  const { theme } = useTheme();

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: 300, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -300, opacity: 0 },
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
    },
  };

  return (
    <div
      className={`w-full h-full ${theme === "dark" ? "bg-gray-950" : "bg-white"}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={variants[mode].initial}
          animate={variants[mode].animate}
          exit={variants[mode].exit}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: duration,
          }}
          className="w-full h-full"
        >
          {children || (
            <div
              className={`flex items-center justify-center h-full w-full ${theme === "dark" ? "bg-gray-950 text-white" : "bg-white text-gray-900"}`}
            >
              <div className="text-center">
                <div
                  className={`inline-block p-4 rounded-full mb-4 ${theme === "dark" ? "bg-purple-900/20" : "bg-purple-100"}`}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-8 h-8 border-t-2 border-l-2 border-purple-500 rounded-full"
                  />
                </div>
                <h3 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                  Loading Content
                </h3>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
