import "./App.css";
import { ConsultantProvider } from "./contexts/ConsultantContext";
import { ProjectProvider } from "./contexts/ProjectContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ConsultantProvider>
          <ProjectProvider>
            {/* {selectedProject && (
              <ProjectOverview projectId={selectedProject.id} />
            )} */}
          </ProjectProvider>
        </ConsultantProvider>
      </header>
    </div>
  );
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
