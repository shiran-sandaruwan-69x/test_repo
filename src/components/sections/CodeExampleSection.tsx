import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Button } from "../ui/button";
import { Copy, Check, Code, Zap, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "../ThemeProvider";

interface CodeExampleSectionProps {
  title?: string;
  description?: string;
  examples?: {
    name: string;
    language: string;
    code: string;
    icon?: React.ReactNode;
  }[];
}

const CodeExampleSection = ({
  title = "Code Examples",
  description = "Check out these code snippets to see how easy it is to implement Magic UI components in your project.",
  examples = [
    {
      name: "Button Component",
      language: "tsx",
      icon: <Code className="h-4 w-4" />,
      code: `import { Button } from "@magic-ui/react";

export default function Example() {
  return (
    <Button variant="gradient">
      Get Started
    </Button>
  );
}`,
    },
    {
      name: "Animation Example",
      language: "tsx",
      icon: <Zap className="h-4 w-4" />,
      code: `import { motion } from "framer-motion";

export default function AnimatedCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring" }}
      className="card">
      <h3>Hover me!</h3>
    </motion.div>
  );
}`,
    },
    {
      name: "Theme Configuration",
      language: "js",
      icon: <Palette className="h-4 w-4" />,
      code: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        magic: {
          purple: '#8B5CF6',
          dark: '#0F0F13',
          accent: '#3F3F46',
        },
      },
    },
  },
  plugins: [require('@magic-ui/plugin')],
}`,
    },
  ],
}: CodeExampleSectionProps) => {
  const [activeTab, setActiveTab] = useState(examples[0]?.name || "");
  const [copied, setCopied] = useState<string | null>(null);
  const { theme } = useTheme();

  const copyToClipboard = (code: string, name: string) => {
    navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      className={`w-full py-16 px-4 md:px-8 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            {title}
          </h2>
          <p
            className={`max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={`rounded-xl overflow-hidden shadow-xl ${theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
        >
          <Tabs defaultValue={examples[0]?.name} className="w-full">
            <div
              className={`border-b px-4 py-3 ${theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-100/50"}`}
            >
              <TabsList
                className={`h-10 ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-200/50"}`}
              >
                {examples.map((example) => (
                  <TabsTrigger
                    key={example.name}
                    value={example.name}
                    onClick={() => setActiveTab(example.name)}
                    className={cn(
                      theme === "dark"
                        ? "data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300 data-[state=active]:shadow-none text-gray-400 hover:text-gray-300 transition-colors"
                        : "data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 data-[state=active]:shadow-none text-gray-600 hover:text-gray-800 transition-colors",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {example.icon}
                      {example.name}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {examples.map((example) => (
              <TabsContent
                key={example.name}
                value={example.name}
                className="p-0"
              >
                <div className="relative">
                  <div className="absolute right-4 top-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(example.code, example.name)
                      }
                      className={`h-8 px-2 ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-gray-700/50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"}`}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied === example.name ? (
                          <motion.span
                            key="check"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Copied
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                  <pre
                    className={`p-4 pt-12 pb-6 overflow-x-auto rounded-b-xl ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
                  >
                    <code
                      className={`text-sm font-mono ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
                    >
                      {example.code.split("\n").map((line, i) => (
                        <div key={i} className="line">
                          {line}
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            size="lg"
          >
            View All Examples
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeExampleSection;
