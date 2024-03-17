import { EmployeeService } from "../services/employeeService";

export class EmployeeController {
    private employeeService: EmployeeService;
    constructor(employeeService: EmployeeService) {
        this.employeeService = employeeService;
    }

    async create(data: any): Promise<any> {
        try {
            const createdEmployee = await this.employeeService.createEmployee(data);
            return {
                statusCode: 201,
                body: createdEmployee,
                message: 'Employee Data Created succesfully',
            }
        } catch (error) {
            // console.error(error);
            return {
                statusCode: 500,
                body: { error: 'Internal server error!' },
                message: 'Employee Data not created',
            }
        }
    };
    async getAllEmployee(): Promise<any> {
        try {
            const items = await this.employeeService.getAllEmployees();
            if (items.length > 0) {
                return {
                    statusCode: 200,
                    body: items,
                    message: 'All Employee Data retrived succesfully',
                };
            } else {
                return {
                    statusCode: 404,
                    body: { error: 'Items Not Found' },
                    message: 'Employee Data not found',
                }
            }

        } catch (error) {
            return {
                statusCode: 500,
                body: { error: 'Internal server error' },
                message: 'Failed to retrive Employee Data',
            };
        }
    }
    async getItem(id: string): Promise<any> {
        try {

            const item = await this.employeeService.getEmployeeById(id);
            if (item) {
                return {
                    statusCode: 200,
                    body: item,
                    message: 'Employee Data getting succesfully',
                }
            }
            else {
                return {
                    statusCode: 404,
                    body: { error: 'Item Not Found' },
                    message: 'Employee Data not getting',
                }
            }
        } catch (error) {
            // console.log(error);
            return {
                statusCode: 500,
                body: { error: 'internal server error' },
                message: 'Employee Data not getting',
            }
        }
    };
    async updateItem(data: any): Promise<any> {
        try {
            // const id = req.params.id;
            const updatedItem = await this.employeeService.updateEmployee(data);
            if (updatedItem) {
                return {
                    statusCode: 200,
                    body: updatedItem,
                    message: 'Employee Data updated succesfully',
                }
            } else {
                return {
                    statusCode: 404,
                    body: { error: 'item not found' },
                    message: 'Employee Data not found',
                }
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: { error: 'internal server error' },
                message: 'Employee Data not getting',
            }
        }
    }
    async deleteItem(id: string): Promise<any> {
        try {

            const deleteItem = await this.employeeService.deleteEmployee(id);
            if (deleteItem) {
                return {
                    statusCode: 200,
                    body: { message: 'Item Deleted successfully' },
                    message: 'Employee Data delete succesfully',
                }
            } else {
                return {
                    statusCode: 404,
                    body: { error: 'Item not found' },
                    message: 'Employee Data not getting',
                }
            }
        } catch (error) {
            // console.error(error);
            return {
                statusCode: 500,
                body: { error: 'internal server error' },
                message: 'Employee Data not getting',
            }
        }
    }

}