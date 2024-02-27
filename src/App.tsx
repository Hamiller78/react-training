import React, { useState, useEffect } from "react";
import "./App.css";
import AssignmentView from "./components/AssignmentView/AssignmentView";
import Consultant from "./entities/Consultant";
import ConsultantFactory from "./services/ConsultantFactory";
import Project from "./entities/Project";
import ProjectFactory from "./services/ProjectFactory";
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

  useEffect(() => {
    localStorage.setItem(
      "selectedConsultants",
      JSON.stringify(selectedConsultants)
    );
  }, [selectedConsultants]);

  const onSelectEntity = (selectedConsultant: Consultant) => {
    setSelectedConsultants((selectedConsultants) => [
      ...selectedConsultants,
      selectedConsultant,
    ]);
  };

  const onUnselectEntity = (unselectedConsultant: Consultant) => {
    setSelectedConsultants((selectedConsultants) =>
      selectedConsultants.filter(
        (consultant) => consultant.id !== unselectedConsultant.id
      )
    );
  };

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <AssignmentView
  //         allEntities={consultants}
  //         selectedEntities={selectedConsultants}
  //         onSelectEntity={onSelectEntity}
  //         onUnselectEntity={onUnselectEntity}
  //       />
  //     </header>
  //   </div>
  // );

  return (
    <div className="App">
      <header className="App-header">
        <ProjectOverview project={projects[0]} />
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
