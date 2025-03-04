import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "../cards/FeatureCard";
import { Code, Zap, Palette, Layout } from "lucide-react";

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: Array<{
    icon: "code" | "zap" | "palette" | "layout";
    title: string;
    description: string;
    link: string;
  }>;
}

const FeaturesSection = ({
  title = "Powerful Features",
  subtitle = "Discover the magic behind our UI components with these powerful features that will transform your development workflow.",
  features = [
    {
      icon: "code",
      title: "Clean Code",
      description:
        "Write elegant, maintainable code with our intuitive component API and comprehensive documentation.",
      link: "#clean-code",
    },
    {
      icon: "zap",
      title: "Fast Performance",
      description:
        "Optimized components that deliver lightning-fast performance without sacrificing visual quality.",
      link: "#performance",
    },
    {
      icon: "palette",
      title: "Beautiful Design",
      description:
        "Stunning visual aesthetics with carefully crafted animations and transitions that delight users.",
      link: "#design",
    },
    {
      icon: "layout",
      title: "Responsive Layout",
      description:
        "Fully responsive components that adapt seamlessly to any screen size or device type.",
      link: "#responsive",
    },
    {
      icon: "code",
      title: "Developer Experience",
      description:
        "Built with developers in mind, offering an exceptional development experience with helpful tools.",
      link: "#developer-experience",
    },
    {
      icon: "zap",
      title: "Animation Library",
      description:
        "Extensive animation capabilities powered by Framer Motion for creating engaging user interactions.",
      link: "#animations",
    },
  ],
}: FeaturesSectionProps) => {
  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gray-950 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section header with animations */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">{subtitle}</p>
        </motion.div>

        {/* Features grid with staggered animations */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                link={feature.link}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative gradient element */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-900/20 blur-[100px] opacity-30 pointer-events-none" />
      </div>
    </section>
  );
};

export default FeaturesSection;
