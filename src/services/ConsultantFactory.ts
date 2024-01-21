import { Consultant } from '../entities/Consultant';

export class ConsultantFactory {
  static idCounter: number = 0; 

  static createRandomConsultant(): Consultant {
    this.idCounter += 1;

    const randomFirstName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
    const randomLastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
    const fullName = `${randomFirstName} ${randomLastName}`;

    return new Consultant(this.idCounter, fullName, 'Software Engineer');
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