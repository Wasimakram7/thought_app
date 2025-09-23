"use client";
 
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { BRAND_YELLOW, hexToRgba, lighten } from "@/app/theme";
 
interface ThoughtCardProps {
   thought: string;
   dayNumber: number;
   onFavorite?: (thought: string, day: number) => void;
   onShare?: (thought: string) => void;
   isFavorited?: boolean;
 }
 
 export default function ThoughtCard({ 
   thought, 
   dayNumber, 
   onFavorite, 
   onShare, 
   isFavorited = false 
 }: ThoughtCardProps) {
   const [isVisible, setIsVisible] = useState(false);
   const [heartClicked, setHeartClicked] = useState(false);
 
   useEffect(() => {
     setIsVisible(true);
   }, []);
 
   const handleFavorite = () => {
     setHeartClicked(true);
     setTimeout(() => setHeartClicked(false), 300);
     if (onFavorite) {
       onFavorite(thought, dayNumber);
     }
   };
 
   const handleShare = () => {
     if (navigator.share) {
       navigator.share({
         title: `Daily Spark - Day ${dayNumber}`,
         text: thought,
         url: window.location.href,
       });
     } else {
       // Fallback to clipboard
       navigator.clipboard.writeText(`${thought}\n\n- Daily Spark Day ${dayNumber}`);
       // You could add a toast notification here
     }
     if (onShare) {
       onShare(thought);
     }
   };
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 50, scale: 0.9 }}
       animate={{ 
         opacity: isVisible ? 1 : 0, 
         y: isVisible ? 0 : 50, 
         scale: isVisible ? 1 : 0.9 
       }}
       transition={{ 
         duration: 0.6, 
         ease: "easeOut",
         staggerChildren: 0.1 
       }}
       className="relative w-full max-w-2xl mx-auto"
     >
       {/* Background with subtle animation */}
       <motion.div
         animate={{
           background: [
             `linear-gradient(135deg, ${hexToRgba(BRAND_YELLOW, 0.1)} 0%, rgba(255, 255, 255, 0.9) 50%, ${hexToRgba(BRAND_YELLOW, 0.1)} 100%)`,
             `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, ${hexToRgba(BRAND_YELLOW, 0.1)} 50%, rgba(255, 255, 255, 0.9) 100%)`,
             `linear-gradient(135deg, ${hexToRgba(BRAND_YELLOW, 0.1)} 0%, rgba(255, 255, 255, 0.9) 50%, ${hexToRgba(BRAND_YELLOW, 0.1)} 100%)`
           ]
         }}
         transition={{ 
           duration: 8, 
           repeat: Infinity, 
           ease: "easeInOut" 
         }}
         className="absolute inset-0 rounded-3xl blur-sm"
       />
 
       {/* Main card */}
       <div
         className="relative bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-lg border"
         style={{ borderColor: hexToRgba(BRAND_YELLOW, 0.3) }}
       >
         {/* Day number */}
         <motion.div
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3, duration: 0.5 }}
           className="absolute top-6 left-6"
         >
           <div
             className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-md"
             style={{ background: `linear-gradient(to bottom right, ${lighten(BRAND_YELLOW, 0.05)}, ${BRAND_YELLOW})` }}
           >
             {dayNumber}
           </div>
         </motion.div>
 
         {/* Action buttons */}
         <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.4, duration: 0.5 }}
           className="absolute top-6 right-6 flex space-x-2"
         >
           <motion.button
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             animate={heartClicked ? { scale: [1, 1.3, 1] } : {}}
             transition={{ duration: 0.3 }}
             onClick={handleFavorite}
             className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
               isFavorited
                 ? "bg-red-100 text-red-500 hover:bg-red-200"
                 : "bg-gray-100 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600"
             }`}
           >
             <Icon 
               icon={isFavorited ? "mdi:heart" : "mdi:heart-outline"} 
               className="text-lg" 
             />
           </motion.button>
 
           <motion.button
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={handleShare}
             className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600 flex items-center justify-center transition-all duration-300"
           >
             <Icon icon="material-symbols:share-outline" className="text-lg" />
           </motion.button>
         </motion.div>
 
         {/* Thought content */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5, duration: 0.6 }}
           className="mt-8 mb-6"
         >
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.6 }}
             className="text-gray-700 text-lg md:text-xl leading-relaxed font-light text-center tracking-wide"
           >
             &ldquo;{thought}&rdquo;
           </motion.p>
         </motion.div>
 
         {/* Decorative elements */}
         <motion.div
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.8, duration: 0.5 }}
           className="flex justify-center"
         >
           <div className="flex space-x-1">
             {[...Array(3)].map((_, i) => (
               <motion.div
                 key={i}
                 animate={{ opacity: [0.3, 1, 0.3] }}
                 transition={{ 
                   duration: 2, 
                   delay: i * 0.3, 
                   repeat: Infinity 
                 }}
                 className="w-2 h-2 rounded-full"
                 style={{ background: `linear-gradient(to right, ${lighten(BRAND_YELLOW, 0.05)}, ${BRAND_YELLOW})` }}
               />
             ))}
           </div>
         </motion.div>
 
         {/* Subtle glow effect */}
         <motion.div
           animate={{
             opacity: [0.1, 0.3, 0.1],
             scale: [1, 1.05, 1]
           }}
           transition={{
             duration: 4,
             repeat: Infinity,
             ease: "easeInOut"
           }}
           className="absolute inset-0 rounded-3xl pointer-events-none"
           style={{
             background: `linear-gradient(to bottom right, ${hexToRgba(BRAND_YELLOW, 0.2)}, transparent, ${hexToRgba(BRAND_YELLOW, 0.2)})`
           }}
         />
       </div>
     </motion.div>
   );
 }