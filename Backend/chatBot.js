const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");

const router = express.Router();
router.use(express.json());
router.use(cors());

const openai = new OpenAI({
  apiKey: "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",
  baseURL: "https://integrate.api.nvidia.com/v1",
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const messages = [
      {
        role: "system",
        content: `You are an AI-powered chatbot for a Web3-based land allocation system. 
        Your primary role is to assist users in understanding land ownership, smart contracts, 
        bidding, and transaction history on the blockchain.
        Provide clear, structured, and informative responses to user queries. Cover these key topics:
        1. **General Inquiry:** Basics of the land allocation system, security, and decentralization benefits.
        2. **Bidding and Auctions:** On-chain land bidding process, auctions, and smart contracts.
        3. **Ownership and Transactions:** Verifying ownership, transaction history, and land transfers.
        4. **Smart Contracts:** Managing land allocations, escrow mechanisms, and dispute resolution.
        5. **Security and Privacy:** Blockchain security, data privacy, and immutability of records.
        IMPORTANT: Only answer questions related to Web3-based land allocation. Avoid financial advice.
        Keep responses concise, engaging, and Web3-focused. Do not generate code or unnecessary formatting.`,
      },
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "qwen/qwen2.5-7b-instruct",
      messages,
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
    });

    if (!completion?.choices?.length) {
      return res.status(500).json({ error: "No response from AI model" });
    }
    
    const responseText = completion.choices[0].message.content.trim();
    res.json({
      success: true,
      userMessage: message,
      botResponse: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating chatbot response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

module.exports = router;