import React, { createContext, useEffect, useState } from "react";
import Project from "../entities/Project";
import ProjectService from "../services/ProjectService";

interface ProjectContextType {
  projects: Project[];
  updateProjects: (newConsultants: Project[]) => void;
}

interface ProjectProviderProps {
  children: React.ReactNode;
}

const projectService = new ProjectService();
const initialState = projectService.createInitialState();

export const ProjectContext = createContext<ProjectContextType>({
  projects: initialState,
  updateProjects: () => {}, // placeholder function
});

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState(() => {
    const storedProjects = sessionStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : initialState;
  });

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    sessionStorage.setItem("projects", JSON.stringify(newProjects));
  };

  useEffect(() => {
    sessionStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <ProjectContext.Provider value={{ projects, updateProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
