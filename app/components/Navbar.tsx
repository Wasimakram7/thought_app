"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import InstallButton from "@/app/components/InstallButton";
import { BRAND_YELLOW, hexToRgba, lighten } from "@/app/theme";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b"
      style={{ borderColor: hexToRgba(BRAND_YELLOW, 0.3) }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(to bottom right, ${lighten(BRAND_YELLOW, 0.05)}, ${BRAND_YELLOW})` }}
            >
              <Icon icon="mdi:lightbulb" className="text-white text-lg" />
            </div>
            <span className="text-lg font-medium text-gray-800">Daily Spark</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#today"
              className="text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium"
            >
              Today&apos;s Thought
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#browse"
              className="text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium"
            >
              Browse All
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#favorites"
              className="text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium"
            >
              Favorites
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#calendar"
              className="text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium"
            >
              Calendar
            </motion.a>
            <InstallButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <InstallButton />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <Icon 
                icon={isMenuOpen ? "mdi:close" : "mdi:menu"} 
                className="text-2xl" 
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white/90 rounded-lg mt-2"
        >
          <div className="px-4 py-4 space-y-3">
            <a
              href="#today"
              className="block text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Today&apos;s Thought
            </a>
            <a
              href="#browse"
              className="block text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse All
            </a>
            <a
              href="#favorites"
              className="block text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </a>
            <a
              href="#calendar"
              className="block text-gray-600 hover:text-yellow-600 transition-colors text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Calendar
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}