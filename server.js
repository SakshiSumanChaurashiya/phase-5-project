
require("dotenv").config();

const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();

const api = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.post("/ask", async (req, res) => {
    try {
        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                error: "Please enter a question."
            });
        }

        const response = await api.models.generateContent({
            model: "gemini-3.7-flash",
            contents: question
        });

        res.json({
            answer: response.text
        });

    } catch (error) {
        console.error("Gemini API error:", error.message);

        res.status(500).json({
            error: "Something went wrong. Please check the server logs."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
