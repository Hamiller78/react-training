import React, { useState, useEffect } from "react";
import "./App.css";
import AssignmentView from "./components/AssignmentView/AssignmentView";
import ConsultantFactory from "./services/ConsultantFactory";
import Consultant from "./entities/Consultant";

function App() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);

  useEffect(() => {
    const storedConsultants = localStorage.getItem("consultants");
    if (storedConsultants) {
      setConsultants(JSON.parse(storedConsultants));
    } else {
      const newConsultants = createRandomConsultants(10);
      setConsultants(newConsultants);
      localStorage.setItem("consultants", JSON.stringify(newConsultants));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <AssignmentView allEntities={consultants} />
      </header>
    </div>
  );
}

function createRandomConsultants(numberOfConsultants: number): Consultant[] {
  const consultants: Consultant[] = [];
  for (let i = 0; i < numberOfConsultants; i++) {
    consultants.push(ConsultantFactory.createRandomConsultant());
  }
  return consultants;
}

export default App;
