import React from "react";

interface TableEntity {
  id: number;
  tableText: string;
}

interface AssignmentViewProps<T> {
  allEntities: T[];
  selectedEntities: T[];
  onSelectEntity: (entity: T) => void;
  onUnselectEntity: (entity: T) => void;
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

function SingleListTable<T extends TableEntity>({
  allEntities,
  listedEntities,
  onDropEntity,
}: {
  allEntities: T[];
  listedEntities: T[];
  onDropEntity: (entities: T) => void;
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
    const sourceEntity: T | undefined = allEntities.find(
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
        {new Array(10 - listedEntities.length).fill(null).map((_, index) => (
          <tr key={`empty-${index}`}>
            <td>&nbsp;</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const AssignmentView = <T extends TableEntity>({
  allEntities,
  selectedEntities,
  onSelectEntity,
  onUnselectEntity,
}: AssignmentViewProps<T>) => {
  let unselectedEntities = allEntities.filter(
    (entry: T) =>
      !selectedEntities.some((selectedEntity) => selectedEntity.id === entry.id)
  );

  const handleSelectEntity = (entity: T) => {
    if (
      selectedEntities.some((selectedEntity) => selectedEntity.id === entity.id)
    ) {
      return; // already assigned
    }
    onSelectEntity(entity);
  };

  const handleUnselectEntity = (entity: T) => {
    if (
      !selectedEntities.some(
        (selectedEntity) => selectedEntity.id === entity.id
      )
    ) {
      return; // already revoked
    }
    onUnselectEntity(entity);
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
