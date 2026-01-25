import os
import google.generativeai as genai

def get_kevin_response(user_prompt: str, system_instruction: str) -> str:
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return "ERROR: TERMINAL DISCONNECTED. API KEY MISSING."

    try:
        genai.configure(api_key=api_key)

        model = genai.GenerativeModel(
            model_name="models/gemini-2.5-flash",  # ✅ FIXED
            system_instruction=system_instruction
        )

        response = model.generate_content(
            user_prompt,
            generation_config={
                "temperature": 0.1,
                "top_p": 0.8,
                "top_k": 40
            }
        )

        return response.text or "NO CARRIER."

    except Exception as e:
        print("Gemini API Error:", e)
        return "CRITICAL SYSTEM ERROR: UNABLE TO PROCESS REQUEST."
