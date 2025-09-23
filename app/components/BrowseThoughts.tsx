"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import ThoughtCard from "@/app/components/ThoughtCard";
import { getThoughtByDay, getCurrentDayOfYear } from "@/app/data/motivationalThoughts";
import { BRAND_YELLOW, hexToRgba, lighten } from "@/app/theme";

interface BrowseThoughtsProps {
  favorites: Set<number>;
  onToggleFavorite: (thought: string, day: number) => void;
}

export default function BrowseThoughts({ favorites, onToggleFavorite }: BrowseThoughtsProps) {
  const [currentDay, setCurrentDay] = useState(getCurrentDayOfYear());
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleDayChange = (newDay: number) => {
    if (newDay === currentDay || isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentDay(newDay);
      setIsTransitioning(false);
    }, 200);
  };

  const goToPreviousDay = () => {
    const prevDay = currentDay > 1 ? currentDay - 1 : 365;
    handleDayChange(prevDay);
  };

  const goToNextDay = () => {
    const nextDay = currentDay < 365 ? currentDay + 1 : 1;
    handleDayChange(nextDay);
  };

  const goToToday = () => {
    handleDayChange(getCurrentDayOfYear());
  };

  const getDateFromDay = (day: number) => {
    const date = new Date(new Date().getFullYear(), 0, day);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="browse" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
            Browse All Thoughts
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
            Explore all 365 daily motivations. Find the perfect thought for any day of the year.
          </p>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0"
        >
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPreviousDay}
              className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 shadow-sm"
              style={{ border: `1px solid ${hexToRgba(BRAND_YELLOW, 0.35)}` }}
            >
              <Icon icon="mdi:chevron-left" className="text-xl" />
            </motion.button>

            <div className="text-center">
              <div className="text-sm text-gray-500 font-light">Day {currentDay}</div>
              <div className="text-lg font-medium text-gray-700">{getDateFromDay(currentDay)}</div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToNextDay}
              className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 shadow-sm"
              style={{ border: `1px solid ${hexToRgba(BRAND_YELLOW, 0.35)}` }}
            >
              <Icon icon="mdi:chevron-right" className="text-xl" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToToday}
            className="px-6 py-3 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
            style={{ background: `linear-gradient(to right, ${lighten(BRAND_YELLOW, 0.05)}, ${BRAND_YELLOW})` }}
          >
            <Icon icon="mdi:calendar-today" className="inline mr-2" />
            Today
          </motion.button>
        </motion.div>

        {/* Thought Display */}
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={currentDay}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <ThoughtCard
                thought={getThoughtByDay(currentDay)}
                dayNumber={currentDay}
                onFavorite={onToggleFavorite}
                isFavorited={favorites.has(currentDay)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="text-sm text-gray-500 font-light mb-4">Quick Navigation</div>
          <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
            {[1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335].map((day, index) => {
              const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDayChange(day)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                    currentDay >= day && currentDay < (index < 11 ? [32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366][index] : 366)
                      ? 'text-white shadow-md'
                      : 'bg-white/60 text-gray-600'
                  }`}
                  style={
                    currentDay >= day && currentDay < (index < 11 ? [32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366][index] : 366)
                      ? { backgroundColor: BRAND_YELLOW }
                      : { border: `1px solid ${hexToRgba(BRAND_YELLOW, 0.35)}` }
                  }
                >
                  {monthNames[index]}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}