// src/sections/ProjectsSection.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { getProjects, type Project } from "../api/projects";

let cachedProjects: Project[] | null = null; // ✅ simple in-memory cache

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(cachedProjects || []);
  const [loading, setLoading] = useState(!cachedProjects);

  useEffect(() => {
    if (!cachedProjects) {
      fetchProjects();
    }
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();

      // ✅ save to cache
      cachedProjects = data;
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="projects" className="py-20 px-6 bg-bg-soft">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-12">
        My Projects
      </h2>

      {loading && projects.length === 0 ? (
        // ✅ show skeletons instead of spinner
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx} className="animate-pulse">
              <div className="w-full h-48 bg-gray-700 rounded-xl mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p className="text-gray-400 text-center text-xl">No projects to display yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }} // ✅ faster stagger
            >
              <Card>
                {/* Project Image */}
                {project.image && (
                  <img
                    src={
                      project.image.startsWith("http")
                        ? project.image
                        : `http://localhost:5000${project.image}`
                    }
                    alt={project.title}
                    loading="lazy" // ✅ lazy load images
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-3">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
