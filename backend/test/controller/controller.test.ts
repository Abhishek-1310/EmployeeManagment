import { EmployeeController } from '../../src/controller/employeeController'

describe('EmployeeController', () => {
    let employeeController: EmployeeController;
    let employeeService: any = getEmployeeService();
    function getEmployeeService() {
        return {
            createEmployee: jest.fn(),
            getAllEmployees: jest.fn(),
            getEmployeeById: jest.fn(),
            updateEmployee: jest.fn(),
            deleteEmployee: jest.fn(),
        }
    }

    beforeEach(() => {
        employeeController = new EmployeeController(employeeService);
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('create', () => {
        it('should create employee data', async () => {
            const data = {
                employeeId: "1",
                employeeName: "Abhsihek k yadav",
                employeeSalary: 800000,
                employeeDesignation: "pat",
                employeeAddress: "chennai ckc"
            };
            const createdEmployee = {
                employeeId: "1",
                employeeName: "Abhsihek k yadav",
                employeeSalary: 800000,
                employeeDesignation: "pat",
                employeeAddress: "chennai ckc"
            };

            employeeService.createEmployee.mockResolvedValue(createdEmployee);
            const result = await employeeController.create(data);

            expect(result.statusCode).toBe(201);
            expect(result.body).toBe(createdEmployee);
            expect(result.message).toBe('Employee Data Created succesfully');

        });

        it('should handle error when create employee data', async () => {
            const data = {
                employeeId: "1",
                employeeName: "Abhsihek k yadav",
                employeeSalary: 800000,
                employeeDesignation: "pat",
                employeeAddress: "chennai ckc"
            };
            const errorMessage = 'Error Message'
            employeeService.createEmployee.mockRejectedValue(new Error(errorMessage));

            const result = await employeeController.create(data);

            expect(result.statusCode).toBe(500);
            expect(result.body.error).toBe('Internal server error!');
            expect(result.message).toBe('Employee Data not created');

        });
    });

    describe('getAllItem', () => {
        it('should return all employee data when data is avialable', async () => {

            const items = [{
                employeeId: "1",
                employeeName: "Abhsihek k yadav",
                employeeSalary: 800000,
                employeeDesignation: "pat",
                employeeAddress: "chennai ckc"
            },
            {
                employeeId: "2",
                employeeName: "Rahul k yadav",
                employeeSalary: 900000,
                employeeDesignation: "developer",
                employeeAddress: "pune"
            },
            {
                employeeId: "3",
                employeeName: "Liviu",
                employeeSalary: 900000,
                employeeDesignation: "senior developer",
                employeeAddress: "romania"
            },];

            employeeService.getAllEmployees.mockResolvedValue(items);

            const result = await employeeController.getAllEmployee();
            expect(result.statusCode).toBe(200);
            expect(result.body).toBe(items);
            expect(result.message).toBe('All Employee Data retrived succesfully');

        });

        it('should handle empty items when getting employee data', async () => {
            const items: any[] = [];

            employeeService.getAllEmployees.mockResolvedValue(items);
            const result = await employeeController.getAllEmployee();
            expect(result.statusCode).toBe(404);
            expect(result.body.error).toBe('Items Not Found');
            expect(result.message).toBe('Employee Data not found');

        });

        it('should handle error when getting employees data', async () => {


            const errorMessage = 'Error Message';
            employeeService.getAllEmployees.mockRejectedValue(new Error(errorMessage));

            const result = await employeeController.getAllEmployee();

            expect(result.statusCode).toBe(500);
            expect(result.body.error).toBe('Internal server error');
            expect(result.message).toBe('Failed to retrive Employee Data');

        });
    });


    describe('getItem', () => {
        it('should get employee data', async () => {
            const id = '1';
            const item = {
                employeeId: "1",
                employeeName: "Abhsihek k yadav",
                employeeSalary: 800000,
                employeeDesignation: "pat",
                employeeAddress: "chennai ckc"
            };

            employeeService.getEmployeeById.mockResolvedValue(item);

            const result = await employeeController.getItem(id);
            expect(result.statusCode).toBe(200);
            expect(result.body).toBe(item);
            expect(result.message).toBe('Employee Data getting succesfully');

        });

        it('should handle not found error when getting employee data', async () => {
            const id = '3';

            employeeService.getEmployeeById.mockResolvedValue(null);
            const result = await employeeController.getItem(id);
            expect(result.statusCode).toBe(404);
            expect(result.body.error).toBe('Item Not Found');
            expect(result.message).toBe('Employee Data not getting');

        });

        it('should handle error when getting employee data', async () => {

            const id = '1';
            const errorMessage = 'Error Message';
            employeeService.getEmployeeById.mockRejectedValue(new Error(errorMessage));

            const result = await employeeController.getItem(id);

            expect(result.statusCode).toBe(500);
            expect(result.body.error).toBe('internal server error');
            expect(result.message).toBe('Employee Data not getting');

        });
    });
    describe('updateItem', () => {
        it('should update employee data', async () => {
            const data = {
                employeeId: "1",
                employeeName: "Abhsihek k yadav",
                employeeSalary: 800000,
                employeeDesignation: "pat",
                employeeAddress: "chennai ckc"
            };
            const updatedItem = {
                employeeId: "1",
                employeeName: "Abhsihek kumar yadav",
                employeeSalary: 800000,
                employeeDesignation: "pat",
                employeeAddress: "chennai ckc"
            };

            employeeService.updateEmployee.mockResolvedValue(updatedItem);

            const result = await employeeController.updateItem(data);
            expect(result.statusCode).toBe(200);
            expect(result.body).toBe(updatedItem);
            expect(result.message).toBe('Employee Data updated succesfully');

        });

        it('should handle not found error when updating employee data', async () => {
            const data = {
                employeeId: "1",
                employeeName: "Abhsihek k yadav",
                employeeSalary: 800000,
                employeeDesignation: "pat",
                employeeAddress: "chennai ckc"
            };

            employeeService.updateEmployee.mockResolvedValue(null);

            const result = await employeeController.updateItem(data);
            expect(result.statusCode).toBe(404);
            expect(result.body.error).toBe('item not found');
            expect(result.message).toBe('Employee Data not found');

        });

        it('should handle erros when when updating employee data', async () => {
            const data = {
                employeeId: "1",
                employeeName: "Abhsihek k yadav",
                employeeSalary: 800000,
                employeeDesignation: "pat",
                employeeAddress: "chennai ckc"
            };
            const errorMessage = 'Error message';

            employeeService.updateEmployee.mockRejectedValue(new Error(errorMessage));

            const result = await employeeController.updateItem(data);
            expect(result.statusCode).toBe(500);
            expect(result.body.error).toBe('internal server error');
            expect(result.message).toBe('Employee Data not getting');

        });

    });
    describe('deleteItem', () => {
        it('should delete employee data', async () => {
            const id = '1';
            const deleteResult = true;

            employeeService.deleteEmployee.mockResolvedValue(deleteResult);

            const result = await employeeController.deleteItem(id);
            expect(result.statusCode).toBe(200);
            expect(result.body.message).toBe('Item Deleted successfully');
            expect(result.message).toBe('Employee Data delete succesfully');

        });

        it('should handle not found error when deleting employee data', async () => {
            const id = '3';
            const deleteResult = false;
            employeeService.deleteEmployee.mockResolvedValue(deleteResult);
            const result = await employeeController.deleteItem(id);
            expect(result.statusCode).toBe(404);
            expect(result.body.error).toBe('Item not found');
            expect(result.message).toBe('Employee Data not getting');

        });

        it('should handle error when deleting employee data', async () => {

            const id = '1';
            const errorMessage = 'Error Message';
            employeeService.deleteEmployee.mockRejectedValue(new Error(errorMessage));

            const result = await employeeController.deleteItem(id);

            expect(result.statusCode).toBe(500);
            expect(result.body.error).toBe('internal server error');
            expect(result.message).toBe('Employee Data not getting');

        });
    });

})