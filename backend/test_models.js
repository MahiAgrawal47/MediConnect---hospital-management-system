import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    // We can fetch from the REST API directly since the SDK might not expose listModels cleanly
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    console.log("Available Models:", JSON.stringify(data.models.map(m => m.name), null, 2));
  } catch (err) {
    console.error("Error fetching models:", err);
  }
}

listModels();
