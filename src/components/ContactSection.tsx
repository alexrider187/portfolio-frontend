// src/components/ContactSection.tsx
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send message.");
      } else {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Auto-clear success/error after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // 🔥 Pre-written messages
  const whatsappMessage = encodeURIComponent(
    "Hi, I’m interested in building a website. Can we discuss my project?"
  );
  const gmailBody = encodeURIComponent(
    "Hi there,\n\nI would like to discuss my website project with you.\n\nBest regards,"
  );

  return (
    <section id="contact" className="py-20 px-6 bg-bg-soft">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-12">
        Contact Me
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex flex-col gap-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-400 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />

        {/* ✅ Animated Alerts */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
          {success && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-green-600 text-sm"
            >
              {success}
            </motion.p>
          )}
        </AnimatePresence>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>

      {/* Contact CTAs */}
      <div className="mt-10 flex justify-center gap-6">
        <a
          href={`https://wa.me/254703243682?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-white font-medium transition"
        >
          <FaWhatsapp className="text-xl" />
          WhatsApp Me
        </a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=bunnyhamster210@gmail.com&su=Website%20Project%20Inquiry&body=${gmailBody}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white font-medium transition"
        >
          <FaEnvelope className="text-xl" />
          Email Me
        </a>
      </div>
    </section>
  );
}
