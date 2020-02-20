import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    console.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    console.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;

export const JWT_SECRET = process.env["JWT_SECRET"];
export const BATH_PATH = process.env["BATH_PATH"];