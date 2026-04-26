import { motion } from "framer-motion";

/**
 * AmbientGlobe — fixed, very subtle background.
 * A slowly rotating monochrome wireframe globe + drifting glow blobs.
 * Sits behind everything (z = 0). Pages should keep their own content above it.
 */
export function AmbientGlobe() {
  return (
    <div className="fixed inset-0 -z-0 pointer-events-none overflow-hidden">
      {/* Base radial wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(248,255,161,0.04) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(168,163,248,0.05) 0%, transparent 55%)",
        }}
      />

      {/* Drifting lemon blob */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 380,
          height: 380,
          background: "radial-gradient(circle, rgba(248,255,161,0.10), transparent 70%)",
        }}
        initial={{ x: -120, y: -60 }}
        animate={{ x: [-120, 80, -120], y: [-60, 120, -60] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting lilac blob */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          right: 0,
          bottom: 0,
          width: 360,
          height: 360,
          background: "radial-gradient(circle, rgba(168,163,248,0.10), transparent 70%)",
        }}
        animate={{ x: [0, -80, 0], y: [0, -100, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Slowly rotating wireframe globe */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ x: "-50%", y: "-50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <svg width="640" height="640" viewBox="0 0 100 100" style={{ opacity: 0.06 }}>
          <defs>
            <radialGradient id="globe-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F8FFA1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F8FFA1" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#globe-grad)" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#F8FFA1" strokeWidth="0.4" />
          {/* Meridians */}
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <ellipse
              key={deg}
              cx="50"
              cy="50"
              rx="45"
              ry="20"
              fill="none"
              stroke="#F8FFA1"
              strokeWidth="0.3"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}
          {/* Latitudes */}
          {[10, 20, 30, 40].map((r) => (
            <ellipse
              key={r}
              cx="50"
              cy="50"
              rx="45"
              ry={r}
              fill="none"
              stroke="#F8FFA1"
              strokeWidth="0.25"
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
