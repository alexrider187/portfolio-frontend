// src/components/Hero.tsx
import { motion } from "framer-motion";
import Button from "../components/Button";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 bg-bg">
      {/* Left Column: Text */}
      <motion.div
        className="flex-1 flex flex-col justify-center md:max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
          Hi, I&apos;m Dickson Ngari
        </h1>

        {/* Role / Subtitle */}
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-light mb-4">
          Full-Stack Developer | React, TypeScript, Node.js & MongoDB
        </h2>

        {/* Value Proposition */}
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Building scalable web applications that deliver real business impact.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap">
          <Button
            variant="primary"
            onClick={() => {
              const contact = document.getElementById("contact");
              contact?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact Me
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              const projects = document.getElementById("projects");
              projects?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Projects
          </Button>
        </div>
      </motion.div>

      {/* Right Column: Illustration */}
      <motion.div
        className="flex-1 mt-10 md:mt-0 md:ml-12 flex items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/image/hero-dev.svg" // ✅ put your illustration file here
          alt="Web Developer Illustration"
          className="w-full max-w-md h-auto object-contain"
        />
      </motion.div>
    </section>
  );
}
