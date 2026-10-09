import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to handle AI generation with automatic model fallbacks and timeouts
const generateContentWithRetryAndFallback = async (prompt) => {
  // We use a cascade of available models. If the newest is overloaded or hangs, we fall back to older/alternative ones.
  const modelsToTry = [
    "gemini-3.7-flash",
    "gemini-3.5-flash",
    "gemini-2.5-flash"
  ]; // Removed 3.6-flash and 2.5-pro as they seem to hang indefinitely
  
  for (let i = 0; i < modelsToTry.length; i++) {
    const modelName = modelsToTry[i];
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      
      // Implement a 5-second timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout")), 5000)
      );
      
      const result = await Promise.race([
        model.generateContent(prompt),
        timeoutPromise
      ]);
      
      return result.response.text();
    } catch (error) {
      // If it's the very last model in our list, throw the error
      if (i === modelsToTry.length - 1) {
        throw error;
      }
      // Otherwise, log the failure and loop to immediately try the next model
      console.log(`Model ${modelName} failed or timed out. Falling back to ${modelsToTry[i+1]}...`);
    }
  }
};

// Health Assistant - General health Q&A
const healthChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ success: false, message: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: false,
        message: "AI service is not configured. Please set GEMINI_API_KEY in the backend .env file.",
      });
    }

    const prompt = `You are MediConnect AI, a helpful health information assistant. You provide general health information only. You are NOT a doctor and cannot diagnose diseases or prescribe treatments.

Rules:
- Provide helpful, accurate general health information
- Always remind users to consult a healthcare professional for medical advice
- Never diagnose diseases or prescribe medication
- Keep responses concise (2-4 paragraphs max)
- Be empathetic and professional
- If asked about emergencies, advise calling emergency services immediately

User question: ${message}

Please respond in a helpful, informative way while being clear that this is general information and not medical advice.`;

    const text = await generateContentWithRetryAndFallback(prompt);

    res.json({ success: true, response: text });
  } catch (error) {
    console.log("Final AI Error:", error);
    res.json({
      success: false,
      message: "AI service is experiencing extreme traffic right now. Please try again in a few moments.",
    });
  }
};

// Find the Right Specialist - Suggest medical specialty based on symptoms
const suggestSpecialist = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.json({ success: false, message: "Please describe your symptoms" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: false,
        message: "AI service is not configured. Please set GEMINI_API_KEY in the backend .env file.",
      });
    }

    const prompt = `You are a medical specialty routing assistant for MediConnect healthcare platform. Based on a patient's description of their health concern, suggest the most appropriate medical specialty they should consult.

Available specialties in our system (you MUST pick from these only):
- General physician
- Gynecologist
- Dermatologist
- Pediatricians
- Neurologist
- Gastroenterologist

Rules:
- ONLY suggest from the specialties listed above
- Respond with ONLY a JSON object in this exact format: {"specialty": "exact specialty name from list above", "reason": "brief 1-2 sentence explanation"}
- Do NOT diagnose any disease
- Use wording like "you may consider consulting" not definitive medical claims
- If the symptoms don't clearly match any specialty, suggest "General physician"
- Do not include any text outside the JSON object

Patient description: ${symptoms}`;

    const text = await generateContentWithRetryAndFallback(prompt);

    // Parse the AI response to extract specialty
    let specialty = "General physician";
    let reason = "Based on your description, a general physician can help evaluate your condition and refer you to a specialist if needed.";

    try {
      // Clean up the response - remove markdown code blocks if present
      const cleanedText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(cleanedText);
      if (parsed.specialty) specialty = parsed.specialty;
      if (parsed.reason) reason = parsed.reason;
    } catch (parseError) {
      // If parsing fails, try to extract specialty from the text
      const specialties = ["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"];
      for (const spec of specialties) {
        if (text.toLowerCase().includes(spec.toLowerCase())) {
          specialty = spec;
          break;
        }
      }
    }

    res.json({
      success: true,
      specialty,
      reason,
    });
  } catch (error) {
    console.log("Final AI Error:", error);
    res.json({
      success: false,
      message: "AI service is experiencing extreme traffic right now. Please try again in a few moments.",
    });
  }
};

export { healthChat, suggestSpecialist };
