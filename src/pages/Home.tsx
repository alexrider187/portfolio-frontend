// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import TechStackSection from "../components/TechStackSection";
import ContactSection from "../components/ContactSection";
import Button from "../components/Button";

interface Testimonial {
  name: string;
  company: string;
  message: string;
  rating: number;
  avatar: string;
}

// Fake testimonial data
const testimonials: Testimonial[] = [
  { name: "Alice Smith", company: "TechCorp", message: "Great collaboration! Delivered on time.", rating: 5, avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Bob Johnson", company: "InnovateX", message: "Highly professional, amazing quality.", rating: 5, avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "Carol White", company: "DevSolutions", message: "Superb full-stack skills!", rating: 5, avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "David Lee", company: "StartupHub", message: "Reliable and innovative developer.", rating: 5, avatar: "https://i.pravatar.cc/150?img=4" },
  { name: "Emma Davis", company: "NextGen Apps", message: "Exceeded our expectations!", rating: 5, avatar: "https://i.pravatar.cc/150?img=5" },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[currentTestimonial];

  return (
    <div className="bg-bg text-white font-sans">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* About Me */}
      <section
        id="about"
        className="py-24 px-6 bg-gradient-to-b from-bg-soft to-bg text-center relative overflow-hidden"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">About Me</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
            <img
              src="/image/image.jpg"
              alt="My profile"
              className="w-40 aspect-square md:w-64 rounded-full border-4 border-primary shadow-lg object-cover object-center"
            />
            <p className="text-gray-300 text-lg md:text-xl">
              I’m a Full-Stack Developer specializing in React, TypeScript, Node.js, and MongoDB. 
              I create scalable, modern web apps that solve real-world problems and deliver measurable results.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-6"
          >
            Let's Talk
          </Button>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* Tech Stack */}
      <section id="tech">
        <TechStackSection />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-bg-soft relative">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
          What Clients Say
        </h2>
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="bg-card rounded-3xl p-10 shadow-glow flex flex-col items-center text-center hover:scale-105 transform transition-transform duration-300"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4 shadow-md border-2 border-primary"
              />
              <p className="text-gray-300 mb-4 text-lg md:text-xl">{testimonial.message}</p>
              <div className="flex mb-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-gray-400 text-sm">{testimonial.company}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-accent text-white text-center rounded-t-3xl mt-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to build something amazing?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-gray-100 max-w-2xl mx-auto"
        >
          Let's work together to bring your ideas to life with modern, scalable web applications.
        </motion.p>
        <Button
          variant="secondary"
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Contact Me
        </Button>
      </section>
    </div>
  );
}
