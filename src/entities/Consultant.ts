import Role from './Role';
import Skill from './Skill';

export class Consultant {
  id: number;
  name: string;
  role: Role;
  tableText: string;
  skills: Skill[] = [];

  constructor(id: number, name: string, role: Role, skills: Skill[]) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.skills = skills;
    this.tableText = `${this.name}, ${this.role}`;
  }
}

export default Consultant;