import Project from '../entities/Project';
import Skill from '../entities/Skill';

export class ProjectFactory {
    static idCounter: number = 0;

    static createRandomProject(): Project {
        this.idCounter += 1;

        const randomName = this.createRandomProjectName();
        const randomSkills = this.createRandomSkills();
        const randomComplexity = Math.floor(Math.random() * 5) + 1;

        return new Project(this.idCounter, randomName, randomSkills, randomComplexity);
    }

    static createRandomSkills(): Skill[] {
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

    static createRandomProjectName(): string {
        const randomProjectType = this.projectTypes[Math.floor(Math.random() * this.projectTypes.length)];
        const randomProjectTechnology = this.projectTechnology[Math.floor(Math.random() * this.projectTechnology.length)];
        return `${randomProjectType} ${randomProjectTechnology}`;
    }

    static projectTypes: string[] = [
        'Migration to',
        'New development of',
        'Maintenance of',
        'Extension of',
        'Optimization of',
        'Refactoring of',
        'Documentation of',
        'Testing of',
    ];
    static projectTechnology: string[] = [
        'ASP.NET web application',
        'Java web application',
        'Angular web application',
        'React web application',
        'C++ desktop application',
        'C# desktop application',
        'Java mobile app',
        'React native mobile application',
        'Java REST API',
        'C# REST API',
        'Node.js REST API',
        'C++ web application',
    ];
}