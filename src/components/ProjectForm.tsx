import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";

interface Project {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  githubLink?: string;
  liveDemo?: string;
  techStack?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectFormProps {
  project?: Project;
  onClose: () => void;
  onSave: (formData: FormData, id?: string) => void;
}

export default function ProjectForm({ project, onClose, onSave }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [githubLink, setGithubLink] = useState(project?.githubLink || "");
  const [liveDemo, setLiveDemo] = useState(project?.liveDemo || "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(project?.image || "");

  // Preview selected image
  useEffect(() => {
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setImagePreview(previewUrl);

      // Cleanup
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [image]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (githubLink) formData.append("githubLink", githubLink);
    if (liveDemo) formData.append("liveDemo", liveDemo);
    if (image) formData.append("image", image);

    onSave(formData, project?._id);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="bg-card p-6 rounded-2xl w-full max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-4">
            {project ? "Edit" : "New"} Project
          </h3>

          {/* Title */}
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded mb-3 bg-gray-800 text-white"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded mb-3 bg-gray-800 text-white"
            required
          />

          {/* GitHub Link */}
          <input
            type="url"
            placeholder="GitHub URL"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="w-full p-2 rounded mb-3 bg-gray-800 text-white"
          />

          {/* Live Demo Link */}
          <input
            type="url"
            placeholder="Live Demo URL"
            value={liveDemo}
            onChange={(e) => setLiveDemo(e.target.value)}
            className="w-full p-2 rounded mb-3 bg-gray-800 text-white"
          />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full p-2 rounded mb-2 bg-gray-800 text-white"
          />

          {/* Preview */}
          {imagePreview && (
            <img
              src={imagePreview.startsWith("http") ? imagePreview : `http://localhost:5000${imagePreview}`}
              alt="Preview"
              className="mb-3 w-full h-48 object-cover rounded"
            />
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="bg-gray-700 hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/80">
              Save
            </Button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}
