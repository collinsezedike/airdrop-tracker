import express, { Router, Request, Response } from "express";
import { actionsJson } from "../controller";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
	res.send("Blinktics: GM 🌏");
});

router.route("/actions.json").options(actionsJson.OPTIONS).get(actionsJson.GET);

export default router;
