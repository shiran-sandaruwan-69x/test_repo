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
import { useTheme } from "../ThemeProvider";

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
  const { theme } = useTheme();
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
        className={`h-full overflow-hidden cursor-pointer relative group ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-md"}`}
        onClick={onClick}
      >
        {/* Gradient overlay that appears on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === "dark" ? "from-purple-900/20 to-transparent" : "from-purple-100/50 to-transparent"}`}
        />

        <CardHeader>
          <div
            className={`rounded-full w-14 h-14 flex items-center justify-center mb-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
          >
            {iconMap[icon]}
          </div>
          <CardTitle
            className={`text-xl mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            {title}
          </CardTitle>
          <CardDescription
            className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
          >
            {description}
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <motion.a
            href={link}
            className={`flex items-center text-sm font-medium transition-colors ${theme === "dark" ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}
            whileHover={{ x: 5 }}
          >
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </motion.a>
        </CardFooter>

        {/* Subtle border glow on hover */}
        <motion.div
          className={`absolute inset-0 rounded-xl border border-purple-500/0 group-hover:border-purple-500/50 pointer-events-none ${theme === "dark" ? "group-hover:border-purple-500/50" : "group-hover:border-purple-400/50"}`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
