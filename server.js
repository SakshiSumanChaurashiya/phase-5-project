
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors({
    origin: "https://sakshisumanchaurashiya.github.io",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Connect to Gemini AI
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Check whether the backend is running
app.get("/", (req, res) => {
    res.send("Ask Gemini Backend is working!");
});

// Ask Gemini AI a question
app.post("/ask", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({
                error: "Please enter a question."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question
        });

        res.json({
            answer: response.text
        });

    } catch (error) {
        console.error("Gemini API error:", error.message);

        res.status(500).json({
            error: "Failed to get an answer from Gemini AI."
        });
    }
});

// Start the backend server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
