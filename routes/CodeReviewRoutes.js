import express from "express";
import joi from "joi";
import {getResponseFromGemini} from "../controllers/CodeReviewController.js";
import {schemaValidation} from "../middleware/schemaValidation.js";

const codeReviewRoutes = express.Router()
const schemas = {
    codeReview: joi.object().keys({
        opt1: joi.boolean().required(),
        opt2: joi.boolean().required(),
        opt3: joi.boolean().required(),
        opt4: joi.boolean().required(),
        code: joi.string().allow("").optional(),
        context: joi.string().max(512).allow("").optional()
    })
}

codeReviewRoutes.post("/codeReview", schemaValidation(schemas.codeReview, "body"), getResponseFromGemini)

export default codeReviewRoutes