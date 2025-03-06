import React from "react";
import { motion } from "framer-motion";

// This is a fallback component that will be shown if 3D rendering fails
const FallbackRocket: React.FC = () => {
  return (
    <motion.div
      className="fixed bottom-10 right-10 z-10 w-20 h-20 flex items-center justify-center"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      whileHover={{ y: -20, transition: { duration: 0.3 } }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-16 bg-gradient-to-b from-purple-500 to-purple-700 rounded-t-full relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-red-500 clip-path-triangle" />
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full" />
            <div className="absolute bottom-0 left-0 w-3 h-6 bg-purple-800 rounded-bl-full" />
            <div className="absolute bottom-0 right-0 w-3 h-6 bg-purple-800 rounded-br-full" />
            <div className="absolute top-3 left-3 w-2 h-2 bg-white rounded-full opacity-70" />
          </div>
        </div>
      </motion.div>

      {/* Flame effect */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-b-full"
        animate={{ height: [6, 10, 6], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />

      {/* Particle effects */}
      <motion.div
        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0], y: [0, 10, 20], x: [-5, 0, 5] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      >
        <div className="w-1 h-1 bg-yellow-300 rounded-full" />
      </motion.div>
      <motion.div
        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0], y: [0, 15, 30], x: [5, 0, -5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.5,
        }}
      >
        <div className="w-1 h-1 bg-orange-400 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default FallbackRocket;

// Add this to your global CSS
const globalStyles = `
.clip-path-triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
`;

// Add the style tag to the document
if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.textContent = globalStyles;
  document.head.appendChild(styleTag);
}
