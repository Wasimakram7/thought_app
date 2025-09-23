"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BRAND_YELLOW, BRAND_WHITE, hexToRgba, lighten } from "@/app/theme";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function PhonePreviewPage() {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    const url = base && base.length > 0 ? base : window.location.origin;
    setPreviewUrl(url);
  }, []);

  const qrUrl = previewUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(previewUrl)}`
    : "";

  return (
    <div
      className="min-h-[100dvh] px-4 py-6 flex flex-col items-center"
      style={{
        background: `linear-gradient(to bottom, ${hexToRgba(BRAND_YELLOW, 0.06)}, ${BRAND_WHITE})`,
      }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Icon icon="mdi:arrow-left" className="mr-2 text-lg" /> Back
          </Link>
          <div className="text-sm text-gray-500">Phone Preview</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Phone frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative" aria-label="Phone frame preview">
              <div
                className="relative overflow-hidden shadow-2xl"
                style={{
                  width: 390,
                  height: 844,
                  borderRadius: 48,
                  border: `10px solid ${hexToRgba("#111827", 0.9)}`,
                  backgroundColor: "#000",
                }}
              >
                <iframe
                  title="App mobile preview"
                  src={previewUrl || undefined}
                  style={{ width: "100%", height: "100%", border: 0, background: "#fff" }}
                />
              </div>
              {/* Side buttons (decorative) */}
              <div className="absolute -left-1 top-28 w-1 h-20 rounded bg-gray-700/60" />
              <div className="absolute -left-1 top-52 w-1 h-10 rounded bg-gray-700/60" />
              <div className="absolute -right-1 top-40 w-1 h-16 rounded bg-gray-700/60" />
            </div>
          </motion.div>

          {/* QR + instructions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-8"
          >
            <div
              className="rounded-2xl p-6 bg-white/80 backdrop-blur border"
              style={{ borderColor: hexToRgba(BRAND_YELLOW, 0.3) }}
            >
              <h2 className="text-xl font-light text-gray-800 mb-3">Open on your phone</h2>
              <p className="text-sm text-gray-600 mb-5">
                Scan the QR code with your phone&apos;s camera to open the app directly in your mobile browser. Then tap the Install button to add it to your home screen.
              </p>
              <div className="flex items-center gap-4">
                {qrUrl ? (
                  <img
                    src={qrUrl}
                    width={220}
                    height={220}
                    alt="QR code to open the app on your phone"
                    className="rounded-lg border"
                    style={{ borderColor: hexToRgba(BRAND_YELLOW, 0.2) }}
                  />
                ) : (
                  <div className="w-[220px] h-[220px] rounded-lg bg-gray-100 animate-pulse" />
                )}
                <div className="text-sm text-gray-600">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-2 rounded-full text-white text-xs font-medium"
                      style={{ background: `linear-gradient(to right, ${lighten(BRAND_YELLOW, 0.05)}, ${BRAND_YELLOW})` }}>
                      <Icon icon="mdi:cellphone" className="mr-1 text-sm" /> iOS & Android
                    </span>
                  </div>
                  <ol className="list-decimal ml-5 space-y-2">
                    <li>Point your camera at the QR.</li>
                    <li>Open the link that appears.</li>
                    <li>Tap Install in the top bar.</li>
                  </ol>
                  {previewUrl && (
                    <div className="mt-4 break-all text-xs text-gray-500">
                      Or open: <a href={previewUrl} className="underline" target="_blank" rel="noreferrer">{previewUrl}</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}