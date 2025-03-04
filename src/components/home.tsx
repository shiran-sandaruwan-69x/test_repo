import React from "react";
import { motion } from "framer-motion";
import Navbar from "./layout/Navbar";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import CodeExampleSection from "./sections/CodeExampleSection";
import Footer from "./layout/Footer";
import PageTransition from "./animations/PageTransition";

const Home = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <main>
          {/* Add padding to account for fixed navbar */}
          <div className="pt-20">
            <HeroSection />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              id="features"
            >
              <FeaturesSection />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              id="code-examples"
            >
              <CodeExampleSection />
            </motion.div>

            {/* Additional decorative elements */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-900/10 to-transparent opacity-50 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-t from-purple-900/10 to-transparent opacity-50 pointer-events-none" />
            </div>
          </div>
        </main>

        <Footer />

        {/* Background gradient orbs */}
        <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/20 filter blur-[120px] opacity-30 pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-900/20 filter blur-[100px] opacity-20 pointer-events-none" />
      </div>
    </PageTransition>
  );
};

export default Home;
