"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRepository = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
// const tableName:string = 'employeDB-1310';
class EmployeeRepository {
    client;
    docClint;
    tableName;
    constructor(tableName) {
        this.client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
        this.docClint = lib_dynamodb_1.DynamoDBDocumentClient.from(this.client);
        this.tableName = tableName;
    }
    async createEmployee(employee) {
        const command = new lib_dynamodb_1.PutCommand({
            TableName: this.tableName,
            Item: {
                employeeId: { S: employee.employeeId },
                employeeName: { S: employee.employeeName },
                employeeSalary: { N: employee.employeeSalary },
                employeeDesignation: { S: employee.employeeDesignation },
                employeeAddress: { S: employee.employeeAddress }
            }
        });
        const response = await this.docClint.send(command);
        console.log(response);
        return response;
    }
    async getEmployeeById(employeeId) {
        const command = new lib_dynamodb_1.GetCommand({
            TableName: this.tableName,
            Key: {
                employeeId: { S: employeeId }
            }
        });
        const response = await this.docClint.send(command);
        console.log(response);
        return response;
    }
    async updateEmployee(employee) {
        const command = new lib_dynamodb_1.UpdateCommand({
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
        const response = await this.docClint.send(command);
        console.log(response);
        return response;
    }
    async deleteEmployee(employeeId) {
        const command = new lib_dynamodb_1.DeleteCommand({
            TableName: this.tableName,
            Key: {
                employeeId: { S: employeeId }
            }
        });
        const response = await this.docClint.send(command);
        console.log(response);
        return response;
    }
}
exports.EmployeeRepository = EmployeeRepository;
//# sourceMappingURL=employeeRepository.js.map