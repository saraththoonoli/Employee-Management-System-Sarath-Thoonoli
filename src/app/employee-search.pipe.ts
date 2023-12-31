import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeSearch'
})
export class EmployeeSearchPipe implements PipeTransform {
  transform(employees: any[], searchTerm: string): any[] {
    if (!employees || !searchTerm) {
      return employees;
    }

    // Convert  lowercase for case-insensitive search
    const search = searchTerm.toLowerCase();

    // Filter employees based on name or email
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(search) || employee.email.toLowerCase().includes(search)
    );
  }
}
