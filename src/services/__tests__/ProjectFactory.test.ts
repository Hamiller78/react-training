import { ProjectFactory } from '../ProjectFactory';

describe('ProjectFactory', () => {
  for (let i = 0; i < 100; i++) {
    it('should create a random project', () => {
      const project = ProjectFactory.createRandomProject();

      expect(project.id).toBeDefined();
      expect(project.name).toBeDefined();
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.requiredSkills.length).toBeGreaterThanOrEqual(1);
      expect(project.requiredSkills.length).toBeLessThanOrEqual(2);
      expect(project.complexity).toBeDefined();
    });
  }
});