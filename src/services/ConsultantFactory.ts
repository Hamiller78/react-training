import { create } from 'domain';
import { Consultant } from '../entities/Consultant';
import Role from '../entities/Role';
import Skill from '../entities/Skill';

export class ConsultantFactory {
  static idCounter: number = 0; 

  static createRandomConsultant(): Consultant {
    this.idCounter += 1;

    const randomFirstName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
    const randomLastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
    const randomRole = this.createRandomRole();
    const randomSkills = this.createRandomSkills(randomRole);
    const fullName = `${randomFirstName} ${randomLastName}`;

    return new Consultant(this.idCounter, fullName, randomRole, randomSkills);
  }

  static createRandomRole(): Role {
    const roleValues = Object.values(Role);
    const randomRole = roleValues[Math.floor(Math.random() * roleValues.length)];

    return randomRole;
  }

  static createRandomSkills(role: Role): Skill[] {
      if (role !== Role.Developer) {
          return [];
      }

    const skillValues = Object.values(Skill);
    const numberOfSkills = Math.floor(Math.random() * 3) + 1;
    const randomSkills: Skill[] = [];
    while (randomSkills.length < numberOfSkills) {
      const randomSkill = skillValues[Math.floor(Math.random() * skillValues.length)];
      if (!randomSkills.includes(randomSkill)) {
        randomSkills.push(randomSkill);
      }
    }
    return randomSkills;
  }

  static firstNames: string[] = [
    'Max', 'Sophie', 'Lukas', 'Anna', 'Felix', 'Emma', 'Paul', 'Marie', 'Leon', 'Mia',
    'Tim', 'Lea', 'Jonas', 'Lena', 'Noah', 'Emily', 'Luis', 'Hannah', 'Elias', 'Sarah',
    'Julian', 'Lisa', 'David', 'Laura', 'Ben', 'Julia', 'Luca', 'Lara', 'Tom', 'Nina'
  ];

  static lastNames: string[] = [
    'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Hoffmann', 'Schulz',
    'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Krüger',
    'Hofmann', 'Hartmann', 'Werner', 'König', 'Mayer', 'Walter', 'Peters', 'Möller', 'Keller', 'Lange'
  ];
}

export default ConsultantFactory;