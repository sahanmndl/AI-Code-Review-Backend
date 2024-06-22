import {
    codingOnlyPrompt,
    contextPrompt,
    initialPrompt,
    markdownPrompt,
    opt1Prompt,
    opt2Prompt,
    opt3Prompt,
    opt4Prompt
} from "../utils/prompt.js";
import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config()

export const getResponseFromGemini = async (req, res, next) => {
    try {
        const {opt1, opt2, opt3, opt4, code, context} = req.body

        let prompt = initialPrompt
        if (opt1 === true) prompt += opt1Prompt
        if (opt2 === true) prompt += opt2Prompt
        if (opt3 === true) prompt += opt3Prompt
        if (opt4 === true) prompt += opt4Prompt
        if (context.trim() !== "") {
            prompt += contextPrompt
            prompt += context.trim()
        }
        prompt += markdownPrompt
        prompt += codingOnlyPrompt

        const genAI = new GoogleGenerativeAI(process.env.API_KEY || '')
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})
        const result = await model.generateContent([prompt, code.trim()]);
        const response = result.response;
        const text = response.text();

        return res.status(200).json({response: text, success: true})
    } catch (e) {
        console.error("Response error: ", e)
        return res.status(500).json({message: "Unable to process your request!", success: false})
    }
}