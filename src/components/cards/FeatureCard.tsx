import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight, Code, Zap, Palette, Layout } from "lucide-react";

interface FeatureCardProps {
  icon?: "code" | "zap" | "palette" | "layout";
  title?: string;
  description?: string;
  link?: string;
  onClick?: () => void;
}

const FeatureCard = ({
  icon = "code",
  title = "Feature Title",
  description = "This is a description of the feature. It explains what the feature does and why it's useful.",
  link = "#",
  onClick,
}: FeatureCardProps) => {
  const iconMap = {
    code: <Code className="h-8 w-8 text-purple-400" />,
    zap: <Zap className="h-8 w-8 text-purple-400" />,
    palette: <Palette className="h-8 w-8 text-purple-400" />,
    layout: <Layout className="h-8 w-8 text-purple-400" />,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card
        className="h-full bg-gray-900 border-gray-800 overflow-hidden cursor-pointer relative group"
        onClick={onClick}
      >
        {/* Gradient overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader>
          <div className="rounded-full bg-gray-800 w-14 h-14 flex items-center justify-center mb-4">
            {iconMap[icon]}
          </div>
          <CardTitle className="text-xl text-white mb-2">{title}</CardTitle>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <motion.a
            href={link}
            className="text-purple-400 flex items-center text-sm font-medium hover:text-purple-300 transition-colors"
            whileHover={{ x: 5 }}
          >
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </motion.a>
        </CardFooter>

        {/* Subtle border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-purple-500/0 group-hover:border-purple-500/50 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
