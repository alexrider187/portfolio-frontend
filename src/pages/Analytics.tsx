import { useEffect, useState } from "react";
import { getProjects, type Project } from "../api/projects";
import Layout from "../components/Layouts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import Card from "../components/Card";

export default function Analytics() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState(0);
  const [dailyUsers, setDailyUsers] = useState(0);

  useEffect(() => {
    fetchProjects();
    trackVisits();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const trackVisits = () => {
    // Total visits (all time)
    const total = parseInt(localStorage.getItem("visits") || "0", 10) + 1;
    localStorage.setItem("visits", total.toString());
    setVisits(total);

    // Daily visits (DAU)
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const dailyKey = `visits-${today}`;
    const todayCount = parseInt(localStorage.getItem(dailyKey) || "0", 10) + 1;
    localStorage.setItem(dailyKey, todayCount.toString());
    setDailyUsers(todayCount);
  };

  // Chart data from real projects
  const chartData = projects.reduce<{ month: string; projects: number }[]>((acc, project) => {
    const month = new Date(project.createdAt!).toLocaleString("default", { month: "short" });
    const existing = acc.find((item) => item.month === month);
    if (existing) existing.projects += 1;
    else acc.push({ month, projects: 1 });
    return acc;
  }, []);

  const placeholderCards = Array.from({ length: 2 }).map((_, i) => (
    <motion.div
      key={i}
      className="bg-card p-6 rounded-2xl shadow-lg animate-pulse h-80"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
    />
  ));

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-primary mb-6">Analytics</h2>

      {/* Frontend-only Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <h4 className="text-lg font-semibold text-secondary">Total Projects</h4>
          <p className="text-3xl font-bold text-accent">{projects.length}</p>
        </Card>

        <Card>
          <h4 className="text-lg font-semibold text-secondary">Total Visits</h4>
          <p className="text-3xl font-bold text-accent">{visits}</p>
        </Card>

        <Card>
          <h4 className="text-lg font-semibold text-secondary">Today’s Active Users</h4>
          <p className="text-3xl font-bold text-accent">{dailyUsers}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {loading
          ? placeholderCards
          : chartData.length === 0 ? (
              <p className="text-gray-400 text-center mt-20 text-xl">No data to display.</p>
            ) : (
              <>
                <Card>
                  <h3 className="text-xl font-semibold text-secondary mb-4">
                    Projects Over Time
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip contentStyle={{ backgroundColor: "#1E1E2F", border: "none", color: "#fff" }} />
                      <Line type="monotone" dataKey="projects" stroke="#FFD700" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                <Card>
                  <h3 className="text-xl font-semibold text-secondary mb-4">
                    Project Count by Month
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip contentStyle={{ backgroundColor: "#1E1E2F", border: "none", color: "#fff" }} />
                      <Legend />
                      <Bar dataKey="projects" fill="#6C63FF" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </>
            )}
      </div>
    </Layout>
  );
}
