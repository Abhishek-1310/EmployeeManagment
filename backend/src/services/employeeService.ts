import { Employee } from "../interfaces/iEmployee";
import { EmployeeRepository } from "../repository/employeeRepository";

export class EmployeeService {
    private employeeRepository: EmployeeRepository;

    constructor(employeeRepository: EmployeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    async createEmployee(employee: Employee): Promise<Employee> {
        return await this.employeeRepository.createEmployee(employee);
    }

    async getAllEmployees(): Promise<Employee[] | []> {
        return await this.employeeRepository.getAllEmployees();
    }

    async getEmployeeById(employeeId: string): Promise<Employee | null> {
        return await this.employeeRepository.getEmployeeById(employeeId);
    }

    async updateEmployee(employee: Employee): Promise<Employee> {
        return await this.employeeRepository.updateEmployee(employee);
    }

    async deleteEmployee(employeeId: string): Promise<Employee> {
        return await this.employeeRepository.deleteEmployee(employeeId);
    }
}
