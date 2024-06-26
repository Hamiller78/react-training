import React, { useEffect, useContext, useState } from "react";
import Project from "../../entities/Project";
import ProjectContext from "../../contexts/ProjectContext";
import Skill from "../../entities/Skill";
import AssignmentView from "../AssignmentView/AssignmentView";
import ConsultantContext from "../../contexts/ConsultantContext";
import Consultant from "../../entities/Consultant";
import "../../App.css";

interface ProjectProps {
  projectId: number;
}

const ProjectDetails: React.FC<ProjectProps> = ({ projectId }) => {
  const { projects, updateProjects } = useContext(ProjectContext);
  const { consultants } = useContext(ConsultantContext);
  const [showAssignmentView, setShowAssignmentView] = useState(false);

  // Find the current project from the projects array
  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    // This will run after every render where `projects` has changed
    // You can put any side effect logic here
    console.log("Projects array has changed:", projects);
  }, [projects]); // `projects` is the dependency

  if (!project) {
    return <div>Project not found</div>;
  }

  const skillInTeam = (skill: Skill) =>
    project.assignedConsultants.some((consultant) =>
      consultant.skills?.includes(skill)
    );

  const handleSelectConsultant = (selectedEntity: Consultant) => {
    if (updateProjects) {
      updateProjects(
        projects.map((p) => {
          if (p.id === project.id) {
            const updatedProject = {
              ...p,
              assignedConsultants: [...p.assignedConsultants, selectedEntity],
            };
            return updatedProject;
          } else {
            return p;
          }
        })
      );
    }
  };

  const handleUnselectConsultant = (unselectedEntity: Consultant) => {
    if (updateProjects) {
      updateProjects(
        projects.map((p) =>
          p.id === project.id
            ? {
                ...p,
                assignedConsultants: p.assignedConsultants.filter(
                  (consultant) => consultant.id !== unselectedEntity.id
                ),
              }
            : p
        )
      );
    }
  };

  return (
    <div>
      <header>
        <h1>{project.name}</h1>
        <p>Complexity: {project.complexity}</p>
        <h2>Required Skills:</h2>
        <ul className="left-aligned-list">
          {project.requiredSkills.map((skill) => (
            <li
              key={skill}
              style={skillInTeam(skill) ? { fontWeight: "bold" } : {}}
            >
              {skill}
            </li>
          ))}
        </ul>
      </header>
      <section>
        <h2>Assigned Consultants:</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {project.assignedConsultants.map((consultant) => (
              <tr key={consultant.name}>
                <td>{consultant.name}</td>
                <td>{consultant.skills.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <button onClick={() => setShowAssignmentView(true)}>
        Open Assignment Overview
      </button>
      {showAssignmentView && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowAssignmentView(false)}>Close</button>
            <AssignmentView
              allEntities={consultants}
              selectedEntities={project.assignedConsultants}
              onSelectEntity={handleSelectConsultant}
              onUnselectEntity={handleUnselectConsultant}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
