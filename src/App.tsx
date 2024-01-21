import React from "react";
import "./App.css";
import AssignmentView from "./components/AssignmentView/AssignmentView";
import ConsultantFactory from "./services/ConsultantFactory";
import Consultant from "./entities/Consultant";

function App() {
  const consultants: Consultant[] = CreateRandomConsultants(10);

  return (
    <div className="App">
      <header className="App-header">
        <AssignmentView allEntities={consultants} />
      </header>
    </div>
  );
}

function CreateRandomConsultants(numberOfConsultants: number): Consultant[] {
  const consultants: Consultant[] = [];
  for (let i = 0; i < numberOfConsultants; i++) {
    consultants.push(ConsultantFactory.createRandomConsultant());
  }
  return consultants;
}

export default App;
