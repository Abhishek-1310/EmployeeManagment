import * as http from 'http';
import { EmployeeController } from '../controller/employeeController';
import { EmployeeService } from '../services/employeeService';
import { EmployeeRepository } from '../repository/employeeRepository';

const employeeTableName = 'employeDB-1310'
const employeeRepository = new EmployeeRepository(employeeTableName);
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(employeeService);

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/employees') {
        let body = '';

        res.on('data', async (chunk) => {
            body += chunk.toString();
        });
        res.on('end', async () => {
            try {
                const result = await employeeController.create(JSON.parse(body));
                res.writeHead(result.statusCode, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:4200'
                });
                res.end(JSON.stringify(result.body));
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal servers error->' }))
            }


        })
    } else if (req.method === 'GET' && req.url?.startsWith('/employees')) {

        try {
            const response = await employeeController.getAllEmployee();
            res.writeHead(response.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:4200'
            });
            res.end(JSON.stringify(response.body));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Internal servers error->' }))
        }
    } else if (req.method === 'GET' && req.url?.startsWith('/employees/')) {
        const employeeId = req.url.split('/')[2];
        if (!employeeId) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Invalid request!' }));
            return;
        }
        try {
            const response = await employeeController.getItem(employeeId);
            res.writeHead(response.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:4200'
            });
            res.end(JSON.stringify(response.body));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Internal servers error->' }))
        }
    } else if (req.method === 'PUT' && req.url?.startsWith('/employees/')) {
        const employeeId = req.url.split('/')[2];
        if (!employeeId) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Invalid request!' }));
            return;
        }
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const response = await employeeController.updateItem({ employeeId, ...JSON.parse(body) });
                res.writeHead(response.statusCode, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:4200'
                });
                res.end(JSON.stringify(response.body));
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: 'Internal servers error->' }))
            }
        })

    } else if (req.method === 'DELETE' && req.url?.startsWith('/employees/')) {
        const employeeId = req.url.split('/')[2];
        if (!employeeId) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Invalid request!' }));
            return;
        }
        try {
            const response = await employeeController.deleteItem(employeeId);
            res.writeHead(response.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:4200'
            });
            res.end(JSON.stringify(response.body));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Internal servers error->' }))
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:4200'
        });
        res.end(JSON.stringify({ error: 'END Point Not Found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
