"use client";
 
import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import ThoughtCard from "@/app/components/ThoughtCard";
import { getThoughtByDay } from "@/app/data/motivationalThoughts";
import { BRAND_YELLOW, hexToRgba, lighten } from "@/app/theme";
 
interface FavoritesViewProps {
  favorites: Set<number>;
  onToggleFavorite: (thought: string, day: number) => void;
}
 
export default function FavoritesView({ favorites, onToggleFavorite }: FavoritesViewProps) {
  const favoriteDays = Array.from(favorites).sort((a, b) => a - b);
 
  const getDateFromDay = (day: number) => {
    const date = new Date(new Date().getFullYear(), 0, day);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };
 
  if (favoriteDays.length === 0) {
    return (
      <section id="favorites" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
              Your Favorites
            </h2>
            <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
              Save your favorite motivational thoughts to revisit them anytime.
            </p>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-20"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: `linear-gradient(to bottom right, ${hexToRgba(BRAND_YELLOW, 0.12)}, ${hexToRgba(BRAND_YELLOW, 0.2)})` }}
            >
              <Icon icon="mdi:heart-outline" className="text-4xl" style={{ color: BRAND_YELLOW }} />
            </div>
            <h3 className="text-xl font-light text-gray-700 mb-4">No Favorites Yet</h3>
            <p className="text-gray-500 font-light max-w-md mx-auto mb-8">
              Start exploring daily thoughts and tap the heart icon to save your favorites.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#browse"
              className="inline-flex items-center px-6 py-3 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
              style={{ background: `linear-gradient(to right, ${lighten(BRAND_YELLOW, 0.05)}, ${BRAND_YELLOW})` }}
            >
              <Icon icon="mdi:compass" className="mr-2" />
              Explore Thoughts
            </motion.a>
          </motion.div>
        </div>
      </section>
    );
  }
 
  return (
    <section id="favorites" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-4">
            Your Favorites
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
            Your collection of inspiring thoughts to brighten any day.
          </p>
          <div className="mt-4">
            <span
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: hexToRgba(BRAND_YELLOW, 0.15), color: BRAND_YELLOW }}
            >
              <Icon icon="mdi:heart" className="mr-2" />
              {favoriteDays.length} {favoriteDays.length === 1 ? 'Favorite' : 'Favorites'}
            </span>
          </div>
        </motion.div>
 
        <div className="space-y-8">
          {favoriteDays.map((day, index) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Date badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="absolute -left-4 top-6 z-10"
              >
                <div
                  className="bg-white border-2 rounded-lg px-3 py-2 shadow-sm"
                  style={{ borderColor: hexToRgba(BRAND_YELLOW, 0.35) }}
                >
                  <div className="text-xs text-gray-500 font-light">Day</div>
                  <div className="text-sm font-medium text-gray-700">{day}</div>
                  <div className="text-xs text-gray-400">{getDateFromDay(day)}</div>
                </div>
              </motion.div>
 
              <div className="ml-12">
                <ThoughtCard
                  thought={getThoughtByDay(day)}
                  dayNumber={day}
                  onFavorite={onToggleFavorite}
                  isFavorited={true}
                />
              </div>
            </motion.div>
          ))}
        </div>
 
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#browse"
            className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full text-sm font-medium transition-all duration-300 shadow-sm"
            style={{ border: `1px solid ${hexToRgba(BRAND_YELLOW, 0.35)}` }}
          >
            <Icon icon="mdi:plus" className="mr-2" />
            Find More Favorites
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}