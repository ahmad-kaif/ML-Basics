import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Initialize LangChain with Gemini
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-pro",
});

// Memory to store conversation history
const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory });

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const result = await chain.call({ input: message });
    res.json({ response: result.response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
