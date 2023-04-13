import { Fluence } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';

import {
	Send_transactionArgArgs,
	Set_metadataArgArgs,
	Set_cloneArgArgs,
	bind_meta_contract,
	get_active_crons,
	get_all_crons,
	get_meta_contract,
	get_metadata,
	get_metadata_with_history,
	get_metadatas,
	get_pending_transactions,
	get_transaction,
	send_transaction,
	set_clone,
	set_metadata,
	Get_metadataArgArgs,
	Get_active_cronsResult,
	Get_all_cronsResult,
	Get_meta_contractResult,
	Get_metadataResult,
	Get_metadata_with_historyResult,
	Get_metadatasResult,
	Get_pending_transactionsResult,
	Get_transactionResult,
	Send_transactionResult,
} from '../_aqua/transaction';

export class TransactionController {
	constructor() {
		this.start();
	}

	private async start() {
		await Fluence.start({ connectTo: krasnodar[0] });
		console.log(Fluence.getStatus().peerId);
	}

	async get_active_crons(): Promise<Get_active_cronsResult | undefined> {
		try {
			return await get_active_crons();
		} catch (e) {
			console.log(e);
		}
	}

	async bind_meta_contract(transaction_hash: string) {
		try {
			await bind_meta_contract(transaction_hash);
		} catch (e) {
			console.log(e);
		}
	}

	async get_all_crons(): Promise<Get_all_cronsResult | undefined> {
		try {
			return await get_all_crons();
		} catch (e) {
			console.log(e);
		}
	}

	async get_meta_contract(
		token_key: string
	): Promise<Get_meta_contractResult | undefined> {
		try {
			return await get_meta_contract(token_key);
		} catch (e) {
			console.log(e);
		}
	}

	async get_metadata(
		args: Get_metadataArgArgs
	): Promise<Get_metadataResult | undefined> {
		try {
			return await get_metadata(args);
		} catch (e) {
			console.log(e);
		}
	}

	async get_metadata_with_history(
		args: Get_metadataArgArgs
	): Promise<Get_metadata_with_historyResult | undefined> {
		try {
			return await get_metadata_with_history(args);
		} catch (e) {
			console.log(e);
		}
	}

	async get_metadatas(
		data_key: string
	): Promise<Get_metadatasResult | undefined> {
		try {
			return await get_metadatas(data_key);
		} catch (e) {
			console.log(e);
		}
	}

	async get_pending_transactions(): Promise<
		Get_pending_transactionsResult | undefined
	> {
		try {
			return await get_pending_transactions();
		} catch (e) {
			console.log(e);
		}
	}

	async get_transaction(
		hash: string
	): Promise<Get_transactionResult | undefined> {
		try {
			return await get_transaction(hash);
		} catch (e) {
			console.log(e);
		}
	}

	async send_transaction(
		args: Send_transactionArgArgs
	): Promise<Send_transactionResult | undefined> {
		try {
			return await send_transaction(args);
		} catch (e) {
			console.log(e);
		}
	}

	async set_clone(args: Set_cloneArgArgs): Promise<void> {
		try {
			await set_clone(args);
		} catch (e) {
			console.log(e);
		}
	}

	async set_metadata(args: Set_metadataArgArgs): Promise<void> {
		try {
			await set_metadata(args);
		} catch (e) {
			console.log(e);
		}
	}

	[key: string]: ((...args: any[]) => any) | undefined;
}
