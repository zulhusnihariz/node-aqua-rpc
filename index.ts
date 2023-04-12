import express, { Express, Request, Response } from 'express';
import FluenceController from './src/controller/fluence.controller';

const bodyParser = require('body-parser');
import { JSONRPCServer } from 'json-rpc-2.0';
import type { JSONRPCRequest } from 'json-rpc-2.0';
import dotenv from 'dotenv';

dotenv.config();

const server = new JSONRPCServer();

const fluence = new FluenceController();
let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(fluence));

for (let i = 0; i < methods.length; i++) {
	let methodName = methods[i];
	let method = fluence[methodName] as (...args: any[]) => void;
	server.addMethod(methodName, (data: any) => {
		method.apply(fluence, [data]);
	});
}

const app: Express = express();

app.use(bodyParser.json());

app.post('/api/v0/json-rpc', async (req: Request, res: Response) => {
	const jsonRPCRequest: JSONRPCRequest = req.body;

	// server.receive takes a JSON-RPC request and returns a promise of a JSON-RPC response.
	// It can also receive an array of requests, in which case it may return an array of responses.
	// Alternatively, you can use server.receiveJSON, which takes JSON string as is (in this case req.body).

	server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
		console.log('then', jsonRPCResponse);
		if (jsonRPCResponse) {
			res.json(jsonRPCResponse);
		} else {
			// If response is absent, it was a JSON-RPC notification method.
			// Respond with no content status (204).
			res.sendStatus(204);
		}
	});
});

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
