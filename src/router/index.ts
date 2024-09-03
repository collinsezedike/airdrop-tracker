import express, { Router, Request, Response } from "express";
import { actionsJson, tracker } from "../controller";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Blinktics: GM 🌏");
});

router.route("/actions.json").options(actionsJson.OPTIONS).get(actionsJson.GET);
router
	.route("/api/actions/track")
	.options(tracker.OPTIONS)
	.get(tracker.GET)
	.post(tracker.POST);

export default router;
