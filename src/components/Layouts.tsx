import { type ReactNode, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { AuthContext, type AuthContextType } from "../context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // sidebar always visible

  const auth = useContext(AuthContext) as AuthContextType | undefined;

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Get role from auth context; default to client if not logged in
  const role: "admin" | "client" = auth?.role === "admin" ? "admin" : "client";

  return (
    <div className="flex h-screen w-screen bg-bg text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} role={role} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Scrollable content */}
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1 p-6">{children}</main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
