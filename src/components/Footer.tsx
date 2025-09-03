import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // X (Twitter)

export default function Footer() {
  return (
    <footer className="w-full bg-card text-gray-400 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left side */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} My Dashboard. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-6 mt-4 md:mt-0">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1877F2] hover:text-[#145dbf] transition transform hover:scale-110 duration-200 text-2xl"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#1D9BF0] transition transform hover:scale-110 duration-200 text-2xl"
            aria-label="X"
          >
            <FaXTwitter />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl transition transform hover:scale-110 duration-200"
            aria-label="Instagram"
            style={{
              background:
                "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            <FaInstagram />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0077B5] hover:text-[#004182] transition transform hover:scale-110 duration-200 text-2xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
