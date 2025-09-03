// src/components/TechStackSection.tsx
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaNpm,
} from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";

const techStack = [
  { name: "React", icon: <FaReact className="text-blue-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "Express.js", icon: <SiExpress className="text-gray-300" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-700" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "JavaScript", icon: <FaJsSquare className="text-yellow-400" /> },
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
  { name: "NPM", icon: <FaNpm className="text-red-600" /> },
  { name: "Database", icon: <FaDatabase className="text-gray-400" /> },
];

export default function TechStackSection() {
  return (
    <section id="techstack" className="py-20 px-6 bg-bg">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-12">
        My Tech Stack
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 justify-items-center">
        {techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.2 }}
          >
            <div className="text-5xl mb-2">{tech.icon}</div>
            <span className="text-gray-300 text-sm text-center">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
