import { Request, Response } from "express";
import {
	ActionPostRequest,
	ActionPostResponse,
	ACTIONS_CORS_HEADERS,
	createPostResponse,
} from "@solana/actions";
import {
	PublicKey,
	Connection,
	clusterApiUrl,
	Transaction,
	LAMPORTS_PER_SOL,
	SystemProgram,
} from "@solana/web3.js";

const POST = async (req: Request, res: Response) => {
	try {
		const request: ActionPostRequest = req.body;
		if (!request?.account?.trim()) {
			throw new Error("`account` field is required");
		}

		let account: PublicKey;
		try {
			account = new PublicKey(request.account);
		} catch (err: any) {
			throw new Error(
				"invalid account or recipient address provided: not a valid public key"
			);
		}

		const connection = new Connection(clusterApiUrl("devnet"));
		const signature = await connection.requestAirdrop(
			account,
			0.5 * LAMPORTS_PER_SOL
		);

		const { blockhash } = await connection.getLatestBlockhash();

		const transaction = new Transaction().add(
			SystemProgram.transfer({
				fromPubkey: account,
				toPubkey: account,
				lamports: 1000,
			})
		);
		transaction.feePayer = account;
		transaction.recentBlockhash = blockhash;

		await connection.confirmTransaction(signature);

		const payload: ActionPostResponse = await createPostResponse({
			fields: { transaction },
		});

		return res.set(ACTIONS_CORS_HEADERS).status(200).json(payload);
	} catch (err: any) {
		return res.set(ACTIONS_CORS_HEADERS).status(400).json(err.message);
	}
};

export default POST;
