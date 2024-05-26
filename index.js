import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import codeReviewRoutes from "./routes/CodeReviewRoutes.js";
import {rateLimiter} from "./middleware/rateLimiter.js";

dotenv.config()

const app = express();
app.use(cors())
app.use(rateLimiter)
app.use(express.json({limit: "30mb", extended: true}))
app.use('/api/v1/', codeReviewRoutes)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on ${process.env.SERVER_PORT}`);
});