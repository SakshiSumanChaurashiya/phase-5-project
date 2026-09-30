require("dotenv").config();
const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const api = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));
app.get("/", (req, res) => {
    res.send("Ask Gemini Backend is working!");
});
app.post("/ask", async (req, res) => {
    try {
        const question = req.body.question;
        const response = await api.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question

        });
        res.json({
            answer: response.text
        });
    }  catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Something went wrong"
        });
    }

});
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});