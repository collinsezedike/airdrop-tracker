import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const PROGRAM_ACCOUNT = process.env.PROGRAM_ACCOUNT;
export const BLINKSIGHTS_API_KEY = process.env.BLINKSIGHTS_API_KEY;
