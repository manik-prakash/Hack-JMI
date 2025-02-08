const express = require("express");
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const router = express.Router();

const apiKey = "AIzaSyCQ7ExZ90G-GsGTDEuSZBpeVnIxSpvjjHA";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite-preview-02-05",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const fixedPrompt = `You are an AI assistant. You are an AI-powered chatbot for a Web3-based land allocation system. 
        Your primary role is to assist users in understanding land ownership, smart contracts, 
        bidding, and transaction history on the blockchain.
        Provide clear, structured, and informative responses to user queries. Cover these key topics:
        1. **General Inquiry:** Basics of the land allocation system, security, and decentralization benefits.
        2. **Bidding and Auctions:** On-chain land bidding process, auctions, and smart contracts.
        3. **Ownership and Transactions:** Verifying ownership, transaction history, and land transfers.
        4. **Smart Contracts:** Managing land allocations, escrow mechanisms, and dispute resolution.
        5. **Security and Privacy:** Blockchain security, data privacy, and immutability of records.
        IMPORTANT: Only answer questions related to Web3-based land allocation. Avoid financial advice.
        Keep responses concise, engaging, and Web3-focused. Do not generate code or unnecessary formatting.`;

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: "User prompt is required." });
        }

        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const fullPrompt = `${fixedPrompt}\n\nUser: ${message}`;

        const result = await chatSession.sendMessage(fullPrompt);
        const responseText = await result.response.text();

        res.json({
            success: true,
            response: responseText,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;