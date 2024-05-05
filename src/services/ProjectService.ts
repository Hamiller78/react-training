// ProjectService.ts
import Project from "../entities/Project";
import ProjectFactory from "./ProjectFactory";

class ProjectService {
  createInitialState(): Project[] {
    const numberOfProjects = 10;

    const projects: Project[] = [];
    for (let i = 0; i < numberOfProjects; i++) {
      projects.push(ProjectFactory.createRandomProject());
    }

    return projects;
  }

  // ... other methods related to projects ...
}

export default ProjectService;
