import Consultant from "./Consultant";
import Skill from "./Skill";

export class Project {
    id: number;
    name: string;
    assignedConsultants: Consultant[] = [];
    requiredSkills: Skill[];
    complexity: number;
    completion: number = 0.0;

    constructor(id: number, name: string, requiredSkills: Skill[], complexity: number) {
        this.id = id;
        this.name = name;
        this.requiredSkills = requiredSkills;
        this.complexity = complexity;
    }
}

export default Project;