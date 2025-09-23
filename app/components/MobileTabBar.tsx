"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { BRAND_YELLOW, hexToRgba } from "@/app/theme";

export default function MobileTabBar() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      <div className="pb-[env(safe-area-inset-bottom)]"></div>
      <div
        className="mx-3 mb-3 rounded-2xl bg-white/90 backdrop-blur-md border shadow-lg"
        style={{ borderColor: hexToRgba(BRAND_YELLOW, 0.4) }}
      >
        <div className="grid grid-cols-3 text-center text-[13px] text-gray-600">
          <a href="#today" className="py-3 flex flex-col items-center hover:text-yellow-600">
            <Icon icon="mdi:calendar-today" className="text-xl mb-1" />
            Today
          </a>
          <a href="#browse" className="py-3 flex flex-col items-center hover:text-yellow-600">
            <Icon icon="mdi:compass" className="text-xl mb-1" />
            Browse
          </a>
          <a href="#favorites" className="py-3 flex flex-col items-center hover:text-yellow-600">
            <Icon icon="mdi:heart-outline" className="text-xl mb-1" />
            Favorites
          </a>
        </div>
      </div>
    </nav>
  );
}
