
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export const getKevinResponse = async (userPrompt: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "ERROR: TERMINAL DISCONNECTED. API_KEY MISSING.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1, // Low temperature for strict adherence to facts
        topP: 0.8,
        topK: 40
      },
    });

    return response.text || "NO CARRIER.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "CRITICAL SYSTEM ERROR: UNABLE TO PROCESS REQUEST.";
  }
};
