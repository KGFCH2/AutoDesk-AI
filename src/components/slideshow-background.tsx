import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const media = [
  { type: "image", src: "/bg-1.png" },
  { type: "video", src: "/Notion_Video_1.mp4" },
  { type: "image", src: "/bg-2.png" },
  { type: "video", src: "/Notion_Video_2.mp4" },
  { type: "image", src: "/bg-3.png" },
  { type: "video", src: "/Notion_Video_3.mp4" },
  { type: "video", src: "/Notion_Video_4.mp4" },
  { type: "video", src: "/Notion_Video_5.mp4" },
];

export function SlideshowBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const currentMedia = media[index];
    const duration = currentMedia.type === "video" ? 15000 : 8000; // Longer duration for video
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, duration);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {media[index].type === "video" ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              src={media[index].src}
              className="w-full h-full object-cover grayscale opacity-50 contrast-125"
            />
          ) : (
            <img
              src={media[index].src}
              alt="Background Slideshow"
              className="w-full h-full object-cover grayscale opacity-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
