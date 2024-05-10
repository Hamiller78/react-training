import "./App.css";
import { ConsultantProvider } from "./contexts/ConsultantContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import ProjectTable from "./components/ProjectView/ProjectTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ConsultantProvider>
          <ProjectProvider>
            <ProjectTable />
          </ProjectProvider>
        </ConsultantProvider>
      </header>
    </div>
  );
}

export default App;
