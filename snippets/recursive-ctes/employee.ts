type Employee = {
  id: number;
  name: string;
  title: string;
  manager?: Employee;
  reports: Employee[];
}
