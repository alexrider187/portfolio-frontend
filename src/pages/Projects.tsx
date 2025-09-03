import { useState, useEffect } from "react";
import Layout from "../components/Layouts";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
} from "../api/projects";
import Card from "../components/Card";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import ProjectForm from "../components/ProjectForm";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewProject = () => {
    setEditProject(null);
    setModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditProject(project);
    setModalOpen(true);
  };

  const handleDeleteProject = async (id?: string) => {
    if (!id) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await deleteProject(id);
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleSave = async (formData: FormData, id?: string) => {
    try {
      if (id) {
        await updateProject(id, formData);
      } else {
        await createProject(formData);
      }
      fetchProjects();
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to save project:", err);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-primary">Projects</h2>
        <Button onClick={handleNewProject}>New Project</Button>
      </div>

      {modalOpen && (
        <ProjectForm
          project={editProject || undefined}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {loading ? (
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      ) : projects.length === 0 ? (
        <p className="text-gray-400 text-center mt-20 text-xl">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
          {projects.map((project) => (
            <Card key={project._id}>
              {/* Image */}
              {project.image && (
                <img
                  src={
                    project.image.startsWith("http")
                      ? project.image
                      : `https://portfolio-frontend-is8u-hpbqu2r84-alexrider187s-projects.vercel.app${project.image}`
                  }
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}

              {/* Title & Description */}
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-300 mb-3">{project.description}</p>

              {/* Links */}
              <div className="flex gap-3 mt-2">
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

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  className="bg-secondary hover:bg-secondary/80 px-3 py-1 text-sm"
                  onClick={() => handleEditProject(project)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-500 px-3 py-1 text-sm"
                  onClick={() => handleDeleteProject(project._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
