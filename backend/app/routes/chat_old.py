import json
from flask import request, current_app
from . import api_bp
from app.services.gemini_client import get_kevin_response

@api_bp.post("/chat/kevin")
def chat_kevin():
    body = request.get_json(silent=True) or {}
    user_msg = (body.get("message") or "").strip()

    if not user_msg:
        return {"error": "message required"}, 400

    # Load SYSTEM_INSTRUCTION from constants-style JSON
    with open("story/kevin_prompt.txt", "r", encoding="utf-8") as f:
        system_instruction = f.read()

    reply = get_kevin_response(user_msg, system_instruction)
    return {"reply": reply}
