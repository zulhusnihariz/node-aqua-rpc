import * as z from 'zod';
import {
	getMetadataArgArgsSchema,
	getMetadataWithHistoryArgArgsSchema,
	sendTransactionResultSchema,
	setCloneArgArgsSchema,
	setMetadataArgArgsSchema,
} from './transaction.schema';

const bind_meta_contract = z.string();
const get_meta_contract = z.string();
const get_metadatas = z.string();
const get_transaction = z.string();

const get_metadata = getMetadataArgArgsSchema;
const get_metadata_with_history = getMetadataWithHistoryArgArgsSchema;
const send_transaction = sendTransactionResultSchema;
const set_clone = setCloneArgArgsSchema;
const set_metadata = setMetadataArgArgsSchema;

// doesn't have args
const get_active_crons = z.unknown();
const get_all_crons = z.unknown();
const get_pending_transactions = z.unknown();

export const TransactionSchema = {
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
};
