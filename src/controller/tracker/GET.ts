import { Request, Response } from "express";
import { BlinksightsClient } from "blinksights-sdk";
import {
	ActionGetResponse,
	ACTIONS_CORS_HEADERS,
	createActionHeaders,
} from "@solana/actions";

import { BLINKSIGHTS_API_KEY } from "../../utils";

const client = new BlinksightsClient(BLINKSIGHTS_API_KEY!);

const GET = async (req: Request, res: Response) => {
	const payload: ActionGetResponse = client.createActionGetResponseV1(
		req.url,
		{
			title: "SOL DROP",
			icon: "https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/",
			description:
				"Congratulations on been one of the few eligible community members. Claim your reward now!",
			label: "Claim $SOL",
		}
	);
	return res.set(ACTIONS_CORS_HEADERS).status(200).json(payload);
};

export default GET;
