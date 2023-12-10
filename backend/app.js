import express from "express";
import router from "./routers/user.routers.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://work-book-deployment-client.vercel.app/",
    methods: ["GET", "POST"], // Include POST method
    credentials: true, // Include credentials (cookies) in the request
  })
);

app.use("/api/v1", router);

export default app;
