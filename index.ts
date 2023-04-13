import express, { Express, Request, Response } from 'express';
import { TransactionController } from './src/controller/';
import { TransactionSchema } from './src/schemas';

const bodyParser = require('body-parser');
import { JSONRPCServer } from 'json-rpc-2.0';
import type { JSONRPCRequest } from 'json-rpc-2.0';
import dotenv from 'dotenv';
import { SafeParseError } from 'zod';

type ZodErrorMessage = {
	code: string;
	expected: string;
	received: string;
	path: any[];
	message: string;
};

function addJSONRPCServerMethods(transaction: TransactionController) {
	let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(transaction));

	for (let i = 0; i < methods.length; i++) {
		let methodName = methods[i];
		let method = transaction[methodName] as (...args: any[]) => void;
		server.addMethod(methodName, (data: any) => {
			return method.apply(transaction, [data]);
		});
	}
}

function validateParams(req: JSONRPCRequest) {
	const { method, params, id } = req;
	let methodName = method as keyof typeof TransactionSchema;

	return TransactionSchema[methodName].safeParse(params);
}

function getError(validator: SafeParseError<unknown>) {
	const ERROR_MESSAGE = JSON.parse(
		validator.error.message
	)[0] as ZodErrorMessage;

	let path = ERROR_MESSAGE.path;

	let message =
		path.length > 0
			? `Error in field: ${path.join('.')} (${ERROR_MESSAGE.message})`
			: ERROR_MESSAGE.message;

	return { code: ERROR_MESSAGE.code, message };
}

dotenv.config();

const server = new JSONRPCServer();
const transaction = new TransactionController();

addJSONRPCServerMethods(transaction);

const app: Express = express();
app.use(bodyParser.json());

app.post('/api/v0/json-rpc', async (req: Request, res: Response) => {
	const jsonRPCRequest: JSONRPCRequest = req.body;

	const validator = validateParams(jsonRPCRequest);

	if (!validator.success) {
		const error = getError(validator);

		res.status(400).json({
			jsonrpc: '2.0',
			error,
			status: 400,
		});

		return;
	}

	server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
		console.log('then', jsonRPCResponse);
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
