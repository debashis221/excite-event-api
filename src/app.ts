require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import config from "config";
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import cors from "cors";
import path from "path";
import { sendResponse } from "./utils/sendReponse";

const app = express();
export const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(deserializeUser);
app.use("/static", express.static(path.join(__dirname, "uploads")));
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  log.error(err); // Log the error for debugging purposes
  sendResponse(res, 500, "An error occurred", null);
});

const port = config.get("port");

server.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
  connectToDb();
});
