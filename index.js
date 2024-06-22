import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import codeReviewRoutes from "./routes/CodeReviewRoutes.js";
import {rateLimiter} from "./middleware/rateLimiter.js";

dotenv.config()
const allowedOrigins = ['https://ai-code-review-pro.vercel.app', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions))
app.use(rateLimiter)
app.use(express.json({limit: "30mb", extended: true}))
app.use('/api/v1/', codeReviewRoutes)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on ${process.env.SERVER_PORT}`);
});