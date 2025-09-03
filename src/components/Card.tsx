// src/components/ui/Card.tsx
import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`card ${className || ""}`}
    >
      {children}
    </motion.div>
  );
}
