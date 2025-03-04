import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const HeroSection = ({
  title = "Build Beautiful UIs with Magic",
  subtitle = "A modern UI design system with smooth animations and transitions for creating stunning web experiences.",
  ctaText = "Get Started",
  ctaLink = "#features",
}: HeroSectionProps) => {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gray-950">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.5), rgba(0, 0, 0, 0) 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 30% 70%, rgba(192, 132, 252, 0.5), rgba(0, 0, 0, 0) 60%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Particle effect */}
      <ParticleEffect />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <a href={ctaLink}>
              {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
};

// Particle effect component
const ParticleEffect = () => {
  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, index) => {
    const size = Math.random() * 4 + 1;
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    return (
      <motion.div
        key={index}
        className="absolute rounded-full bg-purple-500/30"
        style={{
          width: size,
          height: size,
          left: `${xPos}%`,
          top: `${yPos}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
      />
    );
  });

  return <div className="absolute inset-0 overflow-hidden">{particles}</div>;
};

export default HeroSection;
