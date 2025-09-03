import { useState } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true); // Always visible
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      const axiosErr = err as AxiosError<{ error: string }>;
      setError(axiosErr.response?.data?.error || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !email || !password || loading;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card>
          <h2 className="mb-6 text-center text-3xl font-bold">Admin Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5 relative">

            {/* Email */}
            <motion.div className="relative flex flex-col">
              <label className="block text-sm font-medium">Email</label>
              <motion.input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-base"
                whileFocus={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)" }}
              />
              <motion.div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700">
                <FaEnvelope size={20} />
              </motion.div>
            </motion.div>

            {/* Password */}
            <motion.div className="relative flex flex-col">
              <label className="block text-sm font-medium">Password</label>
              <motion.input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black text-base"
                whileFocus={{ boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)" }}
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-700"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </motion.button>
            </motion.div>

            {/* Error */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-3"
              disabled={isDisabled}
            >
              {loading && (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              )}
              <span>{loading ? "Logging in..." : "Login"}</span>
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
