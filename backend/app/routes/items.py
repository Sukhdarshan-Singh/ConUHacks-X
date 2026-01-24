from flask import request
from . import api_bp

# Simple in-memory store (replace with DB later)
_ITEMS = [
    {"id": 1, "name": "First item"},
    {"id": 2, "name": "Second item"},
]

@api_bp.get("/items")
def list_items():
    return {"items": _ITEMS}

@api_bp.post("/items")
def create_item():
    payload = request.get_json(silent=True) or {}
    name = (payload.get("name") or "").strip()
    if not name:
        return {"error": "name is required"}, 400

    new_id = max(i["id"] for i in _ITEMS) + 1 if _ITEMS else 1
    item = {"id": new_id, "name": name}
    _ITEMS.append(item)
    return item, 201
