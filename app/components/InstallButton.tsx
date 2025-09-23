"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { BRAND_YELLOW, lighten } from "@/app/theme";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const bipEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(bipEvent);
      try {
        localStorage.setItem("daily-spark-beforeinstallprompt", "1");
      } catch {
        // noop
      }
    };

    const onInstalled = () => setIsInstalled(true);

    window.addEventListener("beforeinstallprompt", handler as EventListener);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as EventListener);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (isInstalled || !deferredPrompt) return null;

  const onClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    try {
      await deferredPrompt.userChoice;
    } catch {
      // noop
    }
    setDeferredPrompt(null);
  };

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium text-white transition-colors"
      style={{ background: `linear-gradient(to right, ${lighten(BRAND_YELLOW, 0.05)}, ${BRAND_YELLOW})` }}
      aria-label="Install app"
    >
      <Icon icon="mdi:download" className="mr-1 text-sm" /> Install
    </button>
  );
}
