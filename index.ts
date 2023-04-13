import express, { Express, Request, Response } from 'express';
import { TransactionController } from './src/controller';

const bodyParser = require('body-parser');
import { JSONRPCServer } from 'json-rpc-2.0';
import type { JSONRPCRequest } from 'json-rpc-2.0';
import dotenv from 'dotenv';

dotenv.config();

const server = new JSONRPCServer();

const transaction = new TransactionController();
let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(transaction));

for (let i = 0; i < methods.length; i++) {
	let methodName = methods[i];
	let method = transaction[methodName] as (...args: any[]) => void;
	server.addMethod(methodName, (data: any) => {
		return method.apply(transaction, [data]);
	});
}

const app: Express = express();

app.use(bodyParser.json());

app.post('/api/v0/json-rpc', async (req: Request, res: Response) => {
	const jsonRPCRequest: JSONRPCRequest = req.body;

	server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
		if (jsonRPCResponse) {
			res.json(jsonRPCResponse);
		} else {
			res.sendStatus(204);
		}
	});
});

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
