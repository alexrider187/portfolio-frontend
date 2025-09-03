import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layouts";
import Card from "../components/Card";
import Button from "../components/Button";
import { getProjects, type Project } from "../api/projects";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visits, setVisits] = useState(0);
  const [dailyUsers, setDailyUsers] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch real data when available
    fetchProjects();
    trackVisits();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      if (Array.isArray(data)) {
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setProjects([]); // stays empty until backend works
    }
  };

  const trackVisits = () => {
    try {
      const total = parseInt(localStorage.getItem("visits") || "0", 10);
      setVisits(total > 0 ? total : 0);

      const today = new Date().toISOString().split("T")[0];
      const dailyKey = `visits-${today}`;
      const todayCount = parseInt(localStorage.getItem(dailyKey) || "0", 10);
      setDailyUsers(todayCount > 0 ? todayCount : 0);
    } catch (err) {
      console.error("Failed to track visits:", err);
      setVisits(0);
      setDailyUsers(0);
    }
  };

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-primary mb-6">Dashboard Overview</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-secondary">Projects</h3>
          <p className="text-3xl font-bold text-accent">
            {projects.length > 0 ? projects.length : 0}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-secondary">Active Users Today</h3>
          <p className="text-3xl font-bold text-accent">
            {dailyUsers > 0 ? dailyUsers : 0}
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-secondary">Total Visits</h3>
          <p className="text-3xl font-bold text-accent">
            {visits > 0 ? visits : 0}
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <h3 className="text-2xl font-bold text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-card p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold mb-2">Manage Projects</h3>
          <p className="text-gray-300 mb-4">Add, edit, or delete your projects.</p>
          <Button className="w-full" onClick={() => navigate("/projects")}>
            Go to Projects
          </Button>
        </motion.div>

        <motion.div
          className="bg-card p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition transform duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold mb-2">View Analytics</h3>
          <p className="text-gray-300 mb-4">Track performance & insights.</p>
          <Button className="w-full" onClick={() => navigate("/analytics")}>
            Go to Analytics
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}
