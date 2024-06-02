import React, { useContext, useState } from "react";
import Consultant from "../../entities/Consultant";
import { ConsultantContext } from "../../contexts/ConsultantContext";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";

type ConsultantSortField =
  | "id"
  | "name"
  | "role"
  | "peopleSkill"
  | "technicalSkill"
  | "organisationSkill";

const ConsultantTable: React.FC = () => {
  const { consultants } = useContext(ConsultantContext);

  const [sortField, setSortField] = useState<ConsultantSortField>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] =
    useState<Consultant | null>(null);

  const sortedConsultants = [...consultants].sort((a, b) => {
    let compare = 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      compare = (aValue as string).localeCompare(bValue as string, undefined, {
        sensitivity: "base",
      });
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      compare = (aValue as number) - (bValue as number);
    }

    if (compare < 0) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (compare > 0) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (field: ConsultantSortField) => {
    setSortField(field);
    setSortDirection(
      sortField === field && sortDirection === "asc" ? "desc" : "asc"
    );
  };

  const handleRowDoubleClick = (consultant: Consultant) => {
    setSelectedConsultant(consultant);
    setDetailDialogOpen(true);
  };

  const handleClose = () => {
    setDetailDialogOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortField === "id"}
                direction={sortDirection}
                onClick={() => handleSort("id")}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === "name"}
                direction={sortDirection}
                onClick={() => handleSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === "role"}
                direction={sortDirection}
                onClick={() => handleSort("role")}
              >
                Role
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === "peopleSkill"}
                direction={sortDirection}
                onClick={() => handleSort("peopleSkill")}
              >
                Completion
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedConsultants.map((Consultant) => (
            <TableRow
              key={Consultant.id}
              sx={{
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
              }}
              onDoubleClick={() => handleRowDoubleClick(Consultant)}
            >
              <TableCell>{Consultant.id}</TableCell>
              <TableCell>{Consultant.name}</TableCell>
              <TableCell>{Consultant.role}</TableCell>
              <TableCell>{Consultant.peopleSkill}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <Dialog open={detailDialogOpen} onClose={handleClose}>
          <DialogTitle>Consultant Details</DialogTitle>
          <DialogContent>
            {/* Display the details of the selected Consultant */}
            {selectedConsultant && (
              <div>
                <p>ID: {selectedConsultant.id}</p>
                <p>Name: {selectedConsultant.name}</p>
                <p>Complexity: {selectedConsultant.role}</p>
                <p>Completion: {selectedConsultant.peopleSkill}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Table>
    </TableContainer>
  );
};

export default ConsultantTable;
