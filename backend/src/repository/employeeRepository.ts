import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Employee } from "../interfaces/iEmployee";
// const tableName:string = 'employeDB-1310';

export class EmployeeRepository {
    private client: DynamoDBClient;
    private docClint: DynamoDBDocumentClient;
    private tableName: string;

    constructor(tableName: string) {
        this.client = new DynamoDBClient({ region: "us-east-1" });
        this.docClint = DynamoDBDocumentClient.from(this.client);
        this.tableName = tableName;
    }

    async createEmployee(employee: Employee): Promise<Employee> {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: {
                employeeId: { S: employee.employeeId },
                employeeName: { S: employee.employeeName },
                employeeSalary: { N: employee.employeeSalary },
                employeeDesignation: { S: employee.employeeDesignation },
                employeeAddress: { S: employee.employeeAddress }
            }
        });
        const response: any = await this.docClint.send(command);
        console.log(response);

        return response;
    }

    async getAllEmployees(): Promise<Employee[]> {
        const params = {
            TableName: this.tableName,
        }
        const command = new ScanCommand(params);
        const response = await this.docClint.send(command);
        if (response.Items) {
            const data = response.Items.map(item => unmarshall(item));
            return data as Employee[];
        }
        return [];
    }
    async getEmployeeById(employeeId: string): Promise<Employee | null> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: {
                employeeId: { S: employeeId }
            }
        });

        const response: any = await this.docClint.send(command);
        console.log(response);
        return response;
    }

    async updateEmployee(employee: Employee): Promise<Employee> {
        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: {
                employeeId: { S: employee.employeeId }
            },
            UpdateExpression: "set employeeName = :name, employeeSalary = :salary, employeeDesignation = :designation, employeeAddress = :address",
            ExpressionAttributeValues: {
                ":name": { S: employee.employeeName },
                ":salary": { N: employee.employeeSalary },
                ":designation": { s: employee.employeeDesignation },
                ":address": { s: employee.employeeAddress }
            },
            ReturnValues: "ALL_NEW",
        });

        const response: any = await this.docClint.send(command);
        console.log(response);
        return response;
    }

    async deleteEmployee(employeeId: string): Promise<Employee> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: {
                employeeId: { S: employeeId }
            }
        });

        const response: any = await this.docClint.send(command);
        console.log(response);
        return response;
    }
}