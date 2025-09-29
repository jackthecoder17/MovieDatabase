"use client";
import { useMemo, useState } from "react";
import YouTube from "react-youtube";
import { AnimatePresence, motion } from "framer-motion";

export default function Trailer({ videos }) {
  const [open, setOpen] = useState(false);
  const trailer = useMemo(() => {
    if (!videos?.results) return null;
    // Prefer official trailer on YouTube
    const yt = videos.results.find(
      (v) => v.site === "YouTube" && /trailer/i.test(v.type || "")
    );
    return yt || videos.results.find((v) => v.site === "YouTube");
  }, [videos]);

  if (!trailer) return null;

  return (
    <div className="w-full my-4">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 transition-colors"
      >
        Watch Trailer
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-[90vw] max-w-3xl aspect-video bg-black rounded-lg overflow-hidden"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <YouTube
                videoId={trailer.key}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: { autoplay: 1 },
                }}
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
