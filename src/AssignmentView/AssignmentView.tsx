import React from "react";

interface TableEntity {
  id: number;
  tableText: string;
}

interface AssignmentViewProps<T> {
  allEntities: T[];
}

interface TableRowProps {
  data: TableEntity;
  onDragStart: (
    event: React.DragEvent<HTMLTableRowElement>,
    id: number
  ) => void;
  draggable: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  data,
  onDragStart,
  draggable,
}) => {
  return (
    <tr draggable={draggable} onDragStart={(e) => onDragStart(e, data.id)}>
      <td>{data.tableText}</td>
    </tr>
  );
};

function SingleListTable({
  allEntities,
  listedEntities,
  onDropEntity,
}: {
  allEntities: TableEntity[];
  listedEntities: TableEntity[];
  onDropEntity: (entities: TableEntity) => void;
}) {
  const handleDragStart = (
    event: React.DragEvent<HTMLTableRowElement>,
    id: number
  ) => {
    event.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLTableElement>) => {
    event.preventDefault(); // Required to enable drop event
  };

  const handleDrop = (event: React.DragEvent<HTMLTableElement>) => {
    const sourceId = parseInt(event.dataTransfer.getData("text/plain"));
    const sourceEntity: TableEntity | undefined = allEntities.find(
      (x) => x.id === sourceId
    );
    if (!sourceEntity) {
      return;
    }
    onDropEntity(sourceEntity);
  };

  return (
    <table onDragOver={handleDragOver} onDrop={handleDrop}>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {listedEntities.map((item) => (
          <TableRow
            key={item.id}
            data={item}
            onDragStart={handleDragStart}
            draggable
          />
        ))}
      </tbody>
    </table>
  );
}

const AssignmentView = <T extends TableEntity>({
  allEntities,
}: AssignmentViewProps<T>) => {
  const [selectedEntities, setSelectedEntities] = React.useState<TableEntity[]>(
    []
  );

  let unselectedEntities = allEntities.filter(
    (entry: any) => !selectedEntities.includes(entry)
  );

  const handleUnselectEntity = (entity: TableEntity) => {
    if (!selectedEntities.includes(entity)) {
      return; // already revoked
    }
    setSelectedEntities(selectedEntities.filter((item) => item !== entity));
    unselectedEntities = allEntities.filter(
      (entry: any) => !selectedEntities.includes(entry)
    );
  };

  const handleSelectEntity = (entity: TableEntity) => {
    if (selectedEntities.includes(entity)) {
      return; // already assigned
    }
    setSelectedEntities([...selectedEntities, entity]);
    unselectedEntities = allEntities.filter(
      (entry: any) => !selectedEntities.includes(entity)
    );
  };

  return (
    <div className="table-container">
      <SingleListTable
        allEntities={allEntities}
        listedEntities={unselectedEntities}
        onDropEntity={handleUnselectEntity}
      />
      <SingleListTable
        allEntities={allEntities}
        listedEntities={selectedEntities}
        onDropEntity={handleSelectEntity}
      />
    </div>
  );
};

export default AssignmentView;
