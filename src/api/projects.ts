import api from "./axios";

export interface Project {
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

// GET all projects
export const getProjects = async (): Promise<Project[]> => {
  const res = await api.get("/projects");
  return res.data; // backend returns array of projects
};

// GET single project by ID
export const getProjectById = async (id: string): Promise<Project> => {
  const res = await api.get(`/projects/${id}`);
  return res.data; // backend returns single project
};

// POST create new project
export const createProject = async (formData: FormData): Promise<Project> => {
  const res = await api.post("/projects", formData); // ✅ no Content-Type manually set
  return res.data.project; // backend returns { message, project }
};

// PUT update project
export const updateProject = async (id: string, formData: FormData): Promise<Project> => {
  const res = await api.put(`/projects/${id}`, formData); // ✅ no Content-Type manually set
  return res.data.project;
};

// DELETE project
export const deleteProject = async (id: string): Promise<{ message: string }> => {
  const res = await api.delete(`/projects/${id}`);
  return res.data; // backend returns { message }
};
