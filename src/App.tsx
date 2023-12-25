import React from "react";
import "./App.css";
import AssignmentView from "./AssignmentView/AssignmentView";

type Consultant = {
  id: number;
  name: string;
  role: string;
  tableText: string;
};

function App() {
  const consultants = CONSULTANTS;

  return (
    <div className="App">
      <header className="App-header">
        <AssignmentView allEntities={consultants} />
      </header>
    </div>
  );
}

export default App;

const CONSULTANTS: Consultant[] = [
  {
    id: 1,
    name: "Thomas Kessler",
    role: "Developer",
    tableText: "Thomas Kessler",
  },
  {
    id: 2,
    name: "Alexander Kurtz",
    role: "Developer",
    tableText: "Alexander Kurtz",
  },
  { id: 3, name: "Jens Freiser", role: "Developer", tableText: "Jens Freiser" },
  {
    id: 4,
    name: "Martina Schneider",
    role: "Architect",
    tableText: "Martina Schneider",
  },
  {
    id: 5,
    name: "Tilo Hofmann",
    role: "Project Manager",
    tableText: "Tilo Hofmann",
  },
];
