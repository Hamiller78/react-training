import React, { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { Project } from "../../entities/Project";

type ProjectTableProps = {
  projects: Project[];
};

const ProjectTable: React.FC = ({}) => {
  const { projects } = useContext(ProjectContext);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Complexity</TableCell>
            <TableCell>Completion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.complexity}</TableCell>
              <TableCell>{(project.completion * 100).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
