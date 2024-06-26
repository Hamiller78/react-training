import React, { useContext, useState } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Project } from "../../entities/Project";
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

type ProjectSortField = "id" | "name" | "complexity" | "completion";

const ProjectTable: React.FC = () => {
  const { projects } = useContext(ProjectContext);

  const [sortField, setSortField] = useState<ProjectSortField>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const sortedProjects = [...projects].sort((a, b) => {
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

  const handleSort = (field: ProjectSortField) => {
    setSortField(field);
    setSortDirection(
      sortField === field && sortDirection === "asc" ? "desc" : "asc"
    );
  };

  const handleRowDoubleClick = (project: Project) => {
    setSelectedProject(project);
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
                active={sortField === "complexity"}
                direction={sortDirection}
                onClick={() => handleSort("complexity")}
              >
                Complexity
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === "completion"}
                direction={sortDirection}
                onClick={() => handleSort("completion")}
              >
                Completion
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedProjects.map((project) => (
            <TableRow
              key={project.id}
              sx={{
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.2)" },
              }}
              onDoubleClick={() => handleRowDoubleClick(project)}
            >
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.complexity}</TableCell>
              <TableCell>{(project.completion * 100).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <Dialog open={detailDialogOpen} onClose={handleClose}>
          <DialogTitle>Project Details</DialogTitle>
          <DialogContent>
            {/* Display the details of the selected project */}
            {selectedProject && (
              <div>
                <p>ID: {selectedProject.id}</p>
                <p>Name: {selectedProject.name}</p>
                <p>Complexity: {selectedProject.complexity}</p>
                <p>Completion: {selectedProject.completion}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
