from flask import request
from . import api_bp

@api_bp.post("/echo")
def echo():
    data = request.get_json(silent=True) or {}
    return {"you_sent": data}
