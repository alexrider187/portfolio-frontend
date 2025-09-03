import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <header className="w-full flex items-center justify-between bg-card p-4 shadow-md">
      {/* Hamburger always visible */}
      <button
        onClick={toggleSidebar}
        className="text-white text-2xl focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>

      {/* ✅ Professional Animated Logo */}
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.1, rotate: -2 }}
          className="bg-gradient-to-r from-primary to-secondary text-white font-extrabold text-2xl px-3 py-1 rounded-lg shadow-lg tracking-tight cursor-pointer"
        >
          DN
        </motion.div>
        <span className="hidden md:inline text-lg font-semibold text-white/80 tracking-wide">
          Dashboard
        </span>
      </div>

      {/* Right side controls (optional) */}
      <div className="flex items-center gap-4">
        {/* Add desktop controls like profile, settings, etc. */}
      </div>
    </header>
  );
}
