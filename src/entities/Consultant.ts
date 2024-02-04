import Role from './Role';
import Skill from './Skill';

export class Consultant {
  id: number;
  name: string;
  role: Role;
  peopleSkill: number;
  technicalSkill: number;
  organisationSkill: number;
  tableText: string;
  skills: Skill[] = [];

  constructor(id: number, name: string, role: Role, peopleSkill: number, technicalSkill: number, organisationSkill: number, skills: Skill[]) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.peopleSkill = peopleSkill;
    this.technicalSkill = technicalSkill;
    this.organisationSkill = organisationSkill;
    this.skills = skills;
    this.tableText = `${this.name}, ${this.role}`;
  }
}

export default Consultant;