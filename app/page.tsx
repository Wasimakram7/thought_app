"use client";
 
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Navbar from "@/app/components/Navbar";
import ThoughtCard from "@/app/components/ThoughtCard";
import BrowseThoughts from "@/app/components/BrowseThoughts";
import FavoritesView from "@/app/components/FavoritesView";
import MobileTabBar from "@/app/components/MobileTabBar";
import { getTodaysThought, getCurrentDayOfYear } from "@/app/data/motivationalThoughts";
import { BRAND_WHITE, BRAND_YELLOW, hexToRgba, lighten } from "@/app/theme";
 
export default function Home() {
   const [favorites, setFavorites] = useState<Set<number>>(new Set());
   const [mounted, setMounted] = useState(false);
 
   // Load favorites from localStorage
   useEffect(() => {
     setMounted(true);
     const savedFavorites = localStorage.getItem('daily-spark-favorites');
     if (savedFavorites) {
       try {
         const favoritesArray = JSON.parse(savedFavorites);
         setFavorites(new Set(favoritesArray));
       } catch (error) {
         console.error('Error loading favorites:', error);
       }
     }
   }, []);
 
   // Save favorites to localStorage
   useEffect(() => {
     if (mounted) {
       localStorage.setItem('daily-spark-favorites', JSON.stringify(Array.from(favorites)));
     }
   }, [favorites, mounted]);
 
   const toggleFavorite = (thought: string, day: number) => {
     setFavorites(prev => {
       const newFavorites = new Set(prev);
       if (newFavorites.has(day)) {
         newFavorites.delete(day);
       } else {
         newFavorites.add(day);
       }
       return newFavorites;
     });
   };
 
   const currentDay = getCurrentDayOfYear();
   const todaysThought = getTodaysThought();
 
   if (!mounted) {
     return null; // Prevent hydration mismatch
   }
 
   return (
     <div
       className="min-h-[100dvh]"
       style={{
         background: `linear-gradient(to bottom, ${hexToRgba(BRAND_YELLOW, 0.08)}, ${BRAND_WHITE})`
       }}
     >
        
        <Navbar />
        <MobileTabBar />
 
        {/* Hero Section */}
        <section id="today" className="relative pt-24 pb-24 px-4 min-h-[calc(100dvh-80px)] flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium mb-8 shadow-sm"
                style={{ border: `1px solid ${hexToRgba(BRAND_YELLOW, 0.35)}`, color: BRAND_YELLOW }}
              >
                <Icon icon="mdi:calendar-today" className="mr-2" />
                Day {currentDay} of 365
              </motion.div>
 
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-6 leading-tight"
              >
                Your Daily
                <motion.span
                  animate={{
                   background: [
                     `linear-gradient(45deg, ${lighten(BRAND_YELLOW, 0.05)}, ${BRAND_YELLOW})`,
                     `linear-gradient(45deg, ${BRAND_YELLOW}, ${lighten(BRAND_YELLOW, 0.05)})`,
                   ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-clip-text text-transparent ml-4"
                >
                  Spark
                </motion.span>
              </motion.h1>
 
              <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.6 }}
                 className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed"
               >
                 365 unique thoughts to illuminate your journey, one day at a time.
               </motion.p>
             </motion.div>
 
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, delay: 0.8 }}
             >
               <ThoughtCard
                 thought={todaysThought}
                 dayNumber={currentDay}
                 onFavorite={toggleFavorite}
                 isFavorited={favorites.has(currentDay)}
               />
             </motion.div>
 
             {/* Floating Action Buttons */}
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 1 }}
               className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12"
             >
               <motion.a
                 whileHover={{ scale: 1.05, y: -2 }}
                 whileTap={{ scale: 0.95 }}
                 href="#browse"
                 className="inline-flex items-center px-8 py-4 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
                 style={{
                   background: `linear-gradient(to right, ${lighten(BRAND_YELLOW, 0.05)}, ${BRAND_YELLOW})`
                 }}
               >
                 <Icon icon="mdi:compass" className="mr-2 text-lg" />
                 Explore All Thoughts
               </motion.a>
 
               <motion.a
                 whileHover={{ scale: 1.05, y: -2 }}
                 whileTap={{ scale: 0.95 }}
                 href="#favorites"
                 className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full font-medium transition-all duration-300 shadow-sm"
                 style={{ border: `1px solid ${hexToRgba(BRAND_YELLOW, 0.35)}` }}
               >
                 <Icon icon="mdi:heart-outline" className="mr-2 text-lg" />
                 My Favorites
                 {favorites.size > 0 && (
                 <span
                   className="ml-2 px-2 py-1 text-white text-xs rounded-full"
                   style={{ backgroundColor: BRAND_YELLOW }}
                 >
                   {favorites.size}
                 </span>
                )}
               </motion.a>
             </motion.div>
           </div>
 
           {/* Scroll Indicator */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 1.2 }}
             className="absolute bottom-20 left-1/2 transform -translate-x-1/2 md:bottom-8"
           >
             <motion.div
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="flex flex-col items-center text-gray-400"
             >
               <span className="text-sm font-light mb-2">Explore more</span>
               <Icon icon="mdi:chevron-down" className="text-2xl" />
             </motion.div>
           </motion.div>
         </section>
 
         {/* Browse Thoughts Section */}
         <BrowseThoughts favorites={favorites} onToggleFavorite={toggleFavorite} />
 
         {/* Favorites Section */}
         <FavoritesView favorites={favorites} onToggleFavorite={toggleFavorite} />
 
         {/* Stats Section */}
         <section className="py-20 px-4">
           <div className="max-w-4xl mx-auto">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="text-center"
             >
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.1 }}
                   viewport={{ once: true }}
                   className="text-center"
                 >
                   <div className="text-4xl md:text-5xl font-light mb-2" style={{ color: BRAND_YELLOW }}>365</div>
                   <div className="text-gray-600 font-light">Unique Thoughts</div>
                 </motion.div>
 
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                   viewport={{ once: true }}
                   className="text-center"
                 >
                   <div className="text-4xl md:text-5xl font-light mb-2" style={{ color: BRAND_YELLOW }}>{currentDay}</div>
                   <div className="text-gray-600 font-light">Days This Year</div>
                 </motion.div>
 
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.3 }}
                   viewport={{ once: true }}
                   className="text-center"
                 >
                   <div className="text-4xl md:text-5xl font-light mb-2" style={{ color: BRAND_YELLOW }}>{favorites.size}</div>
                   <div className="text-gray-600 font-light">Your Favorites</div>
                 </motion.div>
               </div>
             </motion.div>
           </div>
         </section>
 
         {/* Footer */}
         <footer
           className="relative py-12 px-4"
           style={{
             background: `linear-gradient(to top, ${hexToRgba(BRAND_YELLOW, 0.06)}, transparent)`
           }}
         >
           <div className="max-w-4xl mx-auto text-center">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
             >
               <div className="flex items-center justify-center space-x-2 mb-4">
                 <div
                   className="w-8 h-8 rounded-full flex items-center justify-center"
                   style={{ background: `linear-gradient(to bottom right, ${lighten(BRAND_YELLOW, 0.05)}, ${BRAND_YELLOW})` }}
                 >
                   <Icon icon="mdi:lightbulb" className="text-white text-lg" />
                 </div>
                 <span className="text-xl font-medium text-gray-700">Daily Spark</span>
               </div>
               <p className="text-gray-500 font-light">
                 Igniting potential, one thought at a time.
               </p>
               <div className="mt-6 text-sm text-gray-400">
                 Made with ❤️ for daily inspiration
               </div>
             </motion.div>
           </div>
         </footer>
       </div>
    );
 }
