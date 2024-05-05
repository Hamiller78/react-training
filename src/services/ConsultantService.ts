// ConsultantService.ts
import Consultant from "../entities/Consultant";
import ConsultantFactory from "./ConsultantFactory";

class ConsultantService {
  createInitialState(): Consultant[] {
    const numberOfConsultants = 10;

    const consultants: Consultant[] = [];
    for (let i = 0; i < numberOfConsultants; i++) {
      consultants.push(ConsultantFactory.createRandomConsultant());
    }

    return consultants;
  }

  // ... other methods related to consultants ...
}

export default ConsultantService;
