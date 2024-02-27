import React from "react";
import Project from "../../entities/Project";
import Skill from "../../entities/Skill";

interface ProjectProps {
  project: Project;
}

const ProjectOverview: React.FC<ProjectProps> = ({ project }) => {
  const skillInTeam = (skill: Skill) =>
    project.assignedConsultants.some((consultant) =>
      consultant.skills.includes(skill)
    );

  return (
    <div>
      <h1>{project.name}</h1>
      <p>Complexity: {project.complexity}</p>
      <h2>Required Skills:</h2>
      <ul className="bullet-list">
        {project.requiredSkills.map((skill) => (
          <li
            key={skill}
            style={skillInTeam(skill) ? { fontWeight: "bold" } : {}}
          >
            {skill}
          </li>
        ))}
      </ul>
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
    </div>
  );
};

export default ProjectOverview;
