import React from "react";
import "./App.css";

type Consultant = {
  id: number;
  name: string;
  role: string;
};

interface TableRowProps {
  data: Consultant;
  onDragStart: (
    event: React.DragEvent<HTMLTableRowElement>,
    id: number
  ) => void;
  onDragOver: (event: React.DragEvent<HTMLTableRowElement>) => void;
  onDrop: (event: React.DragEvent<HTMLTableRowElement>, id: number) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  data,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <tr
      draggable
      onDragStart={(e) => onDragStart(e, data.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, data.id)}
    >
      <td>{data.name}</td>
      <td>{data.role}</td>
    </tr>
  );
};

function AvailableConsultantsTable({
  allConsultants,
  availableConsultants,
  onAssignConsultant,
}: {
  allConsultants: Consultant[];
  availableConsultants: Consultant[];
  onAssignConsultant: (consultants: Consultant) => void;
}) {
  const handleDragStart = (
    event: React.DragEvent<HTMLTableRowElement>,
    id: number
  ) => {
    event.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault(); // Wichtig, um das Drop-Event zu ermöglichen
  };

  const handleDrop = (
    event: React.DragEvent<HTMLTableRowElement>,
    targetId: number
  ) => {
    const sourceId = parseInt(event.dataTransfer.getData("text/plain"));
    const sourceConsultant: Consultant | undefined = allConsultants.find(
      (x) => x.id === sourceId
    );
    if (!sourceConsultant) {
      return;
    }
    // remove sourceConsultant from assignedConsultants
    onAssignConsultant(sourceConsultant);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {availableConsultants.map((item) => (
          <TableRow
            key={item.id}
            data={item}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </tbody>
    </table>
  );
}

function SelectedConsultantsTable({
  allConsultants,
  assignedConsultants,
  onRevokeConsultant,
}: {
  allConsultants: Consultant[];
  assignedConsultants: Consultant[];
  onRevokeConsultant: (consultants: Consultant) => void;
}) {
  const handleDragStart = (
    event: React.DragEvent<HTMLTableRowElement>,
    id: number
  ) => {
    event.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
    event.preventDefault(); // Wichtig, um das Drop-Event zu ermöglichen
  };

  const handleDrop = (
    event: React.DragEvent<HTMLTableRowElement>,
    targetId: number
  ) => {
    const sourceId = parseInt(event.dataTransfer.getData("text/plain"));
    const sourceConsultant: Consultant | undefined = allConsultants.find(
      (x) => x.id === sourceId
    );

    if (!sourceConsultant) {
      return;
    }
    onRevokeConsultant(sourceConsultant);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {assignedConsultants.map((index) => (
          <TableRow
            key={index.id}
            data={index}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
        <TableRow
          key={-1}
          data={{ id: -1, name: "", role: "" }}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      </tbody>
    </table>
  );
}

function AssignmentTables() {
  const consultants = CONSULTANTS;
  const [assignedConsultants, setAssignedConsultants] = React.useState<
    Consultant[]
  >([]);
  // Is this only executed once for initialization?
  let availableConsultants = consultants.filter(
    (consultant) => !assignedConsultants.includes(consultant)
  );

  const handleRevokeConsultant = (consultant: Consultant) => {
    if (!assignedConsultants.includes(consultant)) {
      return; // already revoked}
    }
    setAssignedConsultants(
      assignedConsultants.filter((item) => item !== consultant)
    );
    availableConsultants = consultants.filter(
      (consultant) => !assignedConsultants.includes(consultant)
    );
  };

  const handleAssignConsultant = (consultant: Consultant) => {
    if (assignedConsultants.includes(consultant)) {
      return; // already assigned}
    }
    setAssignedConsultants([...assignedConsultants, consultant]);
    availableConsultants = consultants.filter(
      (consultant) => !assignedConsultants.includes(consultant)
    );
  };

  return (
    <div className="table-container">
      <AvailableConsultantsTable
        allConsultants={consultants}
        availableConsultants={availableConsultants}
        onAssignConsultant={handleRevokeConsultant}
      />
      <SelectedConsultantsTable
        allConsultants={consultants}
        assignedConsultants={assignedConsultants}
        onRevokeConsultant={handleAssignConsultant}
      />
    </div>
  );
}

const CONSULTANTS = [
  { id: 1, name: "Thomas Kessler", role: "Developer" },
  { id: 2, name: "Alexander Kurtz", role: "Developer" },
  { id: 3, name: "Jens Freiser", role: "Developer" },
  { id: 4, name: "Martina Schneider", role: "Architect" },
  { id: 5, name: "Tilo Hofmann", role: "Project Manager" },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AssignmentTables />
      </header>
    </div>
  );
}

export default App;
