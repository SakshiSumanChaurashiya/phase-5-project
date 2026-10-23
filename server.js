
// require("dotenv").config();

// const express = require("express");
// const path = require("path");
// const cors = require("cors");
// const { GoogleGenAI } = require("@google/genai");

// const app = express();

// // Allow requests from your local frontend and deployed frontend
// app.use(cors({
//     origin: [
//         "http://localhost:3000",
//         "http://127.0.0.1:3000",
//         "https://phase-5-project-jpn6.onrender.com"
//     ],
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());
// app.use(express.static(__dirname));

// // Check that the Gemini API key exists
// if (!process.env.GEMINI_API_KEY) {
//     console.error("GEMINI_API_KEY is missing. Check your .env file or Render environment variables.");
// }

// const api = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

// app.post("/ask", async (req, res) => {
//     try {
//         const question = req.body?.question;

//         if (!question || typeof question !== "string" || !question.trim()) {
//             return res.status(400).json({
//                 error: "Please enter a question."
//             });
//         }

//         const response = await api.models.generateContent({
//             model: "gemini-3.7-flash",
//             contents: question.trim()
//         });

//         res.json({
//             answer: response.text
//         });

//     } catch (error) {
//         console.error("Gemini API error:", error);

//         res.status(500).json({
//             error: "Something went wrong. Please check the server logs."
//         });
//     }
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Server running on port ${PORT}`);
// });



const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "https://sakshisumanchaurashiya.github.io",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());