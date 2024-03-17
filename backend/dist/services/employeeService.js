"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
class EmployeeService {
    employeeRepository;
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async createEmployee(employee) {
        return await this.employeeRepository.createEmployee(employee);
    }
    async getEmployeeById(employeeId) {
        return await this.employeeRepository.getEmployeeById(employeeId);
    }
    async updateEmployee(employee) {
        return await this.employeeRepository.updateEmployee(employee);
    }
    async deleteEmployee(employeeId) {
        return await this.employeeRepository.deleteEmployee(employeeId);
    }
}
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employeeService.js.map