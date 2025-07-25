import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnection from "./db/db.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();
dbConnection();
const app = express();
const port = process.env.PORT || 8080;
const env = process.env.ENV || "development";

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${env} mode`);
});
