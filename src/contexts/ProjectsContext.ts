import React from "react";
import Project from "../entities/Project";

interface ProjectsContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>> | null;
}

const ProjectsContext = React.createContext<ProjectsContextType>({
  projects: [],
  setProjects: null,
});

export default ProjectsContext;
