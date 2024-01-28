import React, { useState, useEffect } from "react";
import "./App.css";
import AssignmentView from "./components/AssignmentView/AssignmentView";
import ConsultantFactory from "./services/ConsultantFactory";
import Consultant from "./entities/Consultant";

function App() {
  const storedConsultants = localStorage.getItem("consultants");
  const storedSelectedConsultants = localStorage.getItem("selectedConsultants");

  const [consultants, setConsultants] = useState<Consultant[]>(
    storedConsultants
      ? JSON.parse(storedConsultants)
      : createRandomConsultants(10)
  );
  const [selectedConsultants, setSelectedConsultants] = useState<Consultant[]>(
    storedSelectedConsultants ? JSON.parse(storedSelectedConsultants) : []
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

  return (
    <div className="App">
      <header className="App-header">
        <AssignmentView
          allEntities={consultants}
          selectedEntities={selectedConsultants}
          onSelectEntity={onSelectEntity}
          onUnselectEntity={onUnselectEntity}
        />
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

export default App;
