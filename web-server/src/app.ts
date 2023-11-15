import express from "express";
import GlobalRouter from "@routes/index";
import cookieParser from "cookie-parser";
import errorController from "./controllers/errorController";
import { ENV } from "@config/env";
import { deserialiseUser } from "@middlewares/authMiddleware";
import httpServer from "http";
import initSocketIO from "@middlewares/socketMiddleware";
import { successResponseTemplate } from "@utils/boilerplate/response";
const app = express();
const http = httpServer.createServer(app);
app.use(express.json());
app.use(cookieParser(ENV.cookieParserSecret));

// app.use(express.static("public"));

// Intialize Socket.io
initSocketIO(http);

// Deserialise User and handle refresh and access Token
app.use(deserialiseUser);
// Logger
app.use(require("morgan")("dev"));

//Handles Authentication
app.use("/v1", GlobalRouter);

app.use("*", async (req, res) =>
  successResponseTemplate(
    res,
    404,
    "Opps! You just hit a route that doesn't exist",
    { url: req.originalUrl }
  )
);

// Error Handling Route
app.use(errorController);
export default app;
