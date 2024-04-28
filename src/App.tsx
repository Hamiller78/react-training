import React, { useState, useEffect } from "react";
import "./App.css";
import Consultant from "./entities/Consultant";
import ConsultantContext from "./contexts/ConsultantContext";
import ConsultantFactory from "./services/ConsultantFactory";
import Project from "./entities/Project";
import ProjectFactory from "./services/ProjectFactory";
import ProjectsContext from "./contexts/ProjectsContext";
import ProjectOverview from "./components/ProjectView/ProjectOverview";
import { create } from "domain";

function App() {
  const storedConsultants = localStorage.getItem("consultants");
  const storedSelectedConsultants = localStorage.getItem("selectedConsultants");
  const storedProjects = localStorage.getItem("projects");

  const [consultants, setConsultants] = useState<Consultant[]>(
    storedConsultants
      ? JSON.parse(storedConsultants)
      : createRandomConsultants(10)
  );
  const [selectedConsultants, setSelectedConsultants] = useState<Consultant[]>(
    storedSelectedConsultants ? JSON.parse(storedSelectedConsultants) : []
  );
  const [projects, setProjects] = useState<Project[]>(
    storedProjects ? JSON.parse(storedProjects) : createRandomProjects(5)
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projects[0]
  );

  useEffect(() => {
    localStorage.setItem(
      "selectedConsultants",
      JSON.stringify(selectedConsultants)
    );
  }, [selectedConsultants]);

  return (
    <div className="App">
      <header className="App-header">
        <ConsultantContext.Provider
          value={{ consultants: consultants, setConsultants: setConsultants }}
        >
          <ProjectsContext.Provider value={{ projects, setProjects }}>
            {selectedProject && (
              <ProjectOverview projectId={selectedProject.id} />
            )}
          </ProjectsContext.Provider>
        </ConsultantContext.Provider>
      </header>
    </div>
  );
}

function createRandomConsultants(numberOfConsultants: number): Consultant[] {
  const consultants: Consultant[] = [];
  for (let i = 0; i < numberOfConsultants; i++) {
    consultants.push(ConsultantFactory.createRandomConsultant());
  }

  localStorage.setItem("consultants", JSON.stringify(consultants));

  return consultants;
}

function createRandomProjects(numberOfProjects: number): Project[] {
  const projects: Project[] = [];
  for (let i = 0; i < numberOfProjects; i++) {
    projects.push(ProjectFactory.createRandomProject());
  }

  localStorage.setItem("projects", JSON.stringify(projects));

  return projects;
}

export default App;
