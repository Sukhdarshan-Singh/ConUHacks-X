import json
from pathlib import Path
from flask import request
from . import api_bp
from app.services.gemini_client import get_ai_response

STORY_DIR = Path("story")
CHAR_FILE = STORY_DIR / "characters.json"

def _load_characters() -> dict:
    # Hackathon-friendly: reload each request so you can tweak JSON without restarting.
    with open(CHAR_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def _build_system_instruction(char_obj: dict) -> str:
    base = (char_obj.get("system") or "").rstrip()
    facts = char_obj.get("known_facts") or {}
    facts_block = json.dumps(facts, indent=2, ensure_ascii=False)
    return f"{base}\n\nKNOWN FACTS (from system):\n{facts_block}\n"

@api_bp.post("/chat/<username>")
def chat_character(username: str):
    body = request.get_json(silent=True) or {}
    user_msg = (body.get("message") or "").strip()
    if not user_msg:
        return {"error": "message required"}, 400

    data = _load_characters()
    chars = (data.get("characters") or {})
    char_obj = chars.get(username.lower())

    if not char_obj:
        return {"reply": "UNKNOWN ENTITY."}, 404

    system_instruction = _build_system_instruction(char_obj)
    reply = get_ai_response(user_msg, system_instruction)
    return {"reply": reply}
