import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaProjectDiagram, FaCode, FaComments, FaTachometerAlt, FaChartLine } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  role: "admin" | "client"; // pass current user role
}

export default function Sidebar({ isOpen, toggle, role }: SidebarProps) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const allLinks = {
    client: [
      { name: "Home", path: "#home", icon: <FaHome /> },
      { name: "Projects", path: "#projects", icon: <FaProjectDiagram /> },
      { name: "Tech Stack", path: "#techstack", icon: <FaCode /> },
      { name: "Testimonials", path: "#testimonials", icon: <FaComments /> },
      { name: "Contact", path: "#contact", icon: <FaComments /> },
    ],
    admin: [
      { name: "Home", path: "/home", icon: <FaHome /> },
      { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
      { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
      { name: "Analytics", path: "/analytics", icon: <FaChartLine /> },
    ],
  };

  const links = role === "admin" ? allLinks.admin : allLinks.client;

  const handleClick = (path: string) => {
    if (role === "client") {
      // scroll to section for client
      if (path.startsWith("#")) {
        const section = document.getElementById(path.replace("#", ""));
        section?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (role === "admin") {
      // navigate to route for admin
      navigate(path);
    }

    if (!isDesktop) toggle();
  };

  return (
    <>
      {!isDesktop && isOpen && (
        <div className="fixed inset-0 bg-black/70 z-40" onClick={toggle}></div>
      )}

      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.aside
            key="sidebar"
            initial={{ x: isDesktop ? 0 : -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className={`fixed md:static top-0 left-0 h-full bg-card shadow-lg z-50 flex flex-col py-6 px-3 md:px-4
              ${isDesktop ? (isOpen ? "w-64" : "w-20") : "w-64"} transition-all duration-300`}
          >
            <div className="mb-8 flex items-center justify-center text-2xl font-extrabold text-primary">
              {isOpen || !isDesktop ? "🔥 DN" : "🔥"}
            </div>

            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleClick(link.path)}
                  className="group relative flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-primary/30 transition"
                >
                  <motion.div whileHover={{ scale: 1.2 }} className="text-xl flex-shrink-0">
                    {link.icon}
                  </motion.div>
                  {(isOpen || !isDesktop) && <span className="font-medium">{link.name}</span>}
                  {!isOpen && isDesktop && (
                    <span className="absolute left-20 bg-black/80 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                      {link.name}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
