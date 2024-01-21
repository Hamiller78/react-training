export class Consultant {
  id: number;
  name: string;
  role: string;
  tableText: string;

  constructor(id: number, name: string, role: string) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.tableText = `${this.name}`;
  }
}

export default Consultant;