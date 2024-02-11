import Project from '../entities/Project';
import Skill from '../entities/Skill';

export class ProjectFactory {
    static idCounter: number = 0;

    static createRandomProject(): Project {
        this.idCounter += 1;

        const randomSkills = this.createRandomSkills();
        const randomName = this.createRandomProjectName(randomSkills);
        const randomComplexity = Math.floor(Math.random() * 5) + 1;

        return new Project(this.idCounter, randomName, randomSkills, randomComplexity);
    }

    static createRandomSkills(): Skill[] {
        const skillValues = Object.values(Skill);
        const numberOfSkills = Math.floor(Math.random() * 2) + 1;
        const randomSkills: Skill[] = [];
        while (randomSkills.length < numberOfSkills) {
            const randomSkill = skillValues[Math.floor(Math.random() * skillValues.length)];
            if (!randomSkills.includes(randomSkill)) {
                randomSkills.push(randomSkill);
            }
        }
        return randomSkills;
    }

    static createRandomProjectName(skills: Skill[]): string {
        let projectTemplates: string[];

        if (skills.length === 1) {
            projectTemplates = this.projectTemplatesForOneSkill;
        } else if (skills.length === 2) {
            projectTemplates = this.projectTemplatesForTwoSkills;
        } else {
            throw new Error('Invalid number of skills');
        }

        const skill1 = skills[0].toString();
        let skill2 : string;
        if (skills.length === 2) {
            skill2 = skills[1].toString();
        } else {
            skill2 = '';
        }

        const randomTemplate = projectTemplates[Math.floor(Math.random() * projectTemplates.length)];
        const projectName = randomTemplate
            .replace('${skill1}', skill1)
            .replace('${skill2}', skill2);

        return projectName;
    }
    static projectTemplatesForOneSkill: string[] = [
        'Migration to ${skill1} application',
        'New development of ${skill1} application',
        'Maintenance of ${skill1} application',
        'Extension of ${skill1} application',
        'Optimization of ${skill1} application',
        'Documentation of ${skill1} application'
    ];

    static projectTemplatesForTwoSkills: string[] = [
        'Migration from ${skill1} to ${skill2} application',
        'New development of ${skill1} and ${skill2} application',
        'Maintenance of ${skill1} and ${skill2} application',
        'Extension of ${skill1} and ${skill2} application',
        'Optimization of ${skill1} and ${skill2} application',
        'Documentation of ${skill1} and ${skill2} application',
    ];
}
