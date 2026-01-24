import json
from pathlib import Path
from flask import request, current_app
from . import api_bp
from app.state_store import read_json, update_json

DEFAULT_STATE = {
    "activeSceneKey": "scene1",
    "scenes": {
        "scene1": {"sceneId": "scene_1", "unlockedDocuments": [], "flags": {}, "phase": "StartMenu", "lastEventId": 0},
        "scene2": {"sceneId": "scene_2", "unlockedDocuments": [], "flags": {}, "phase": "Introduction", "lastEventId": 1},
        "scene3": {"sceneId": "scene_3", "unlockedDocuments": [], "flags": {}, "phase": "Gameplay", "lastEventId": 2}
    },
    "events": []
}

def load_story():
    story_path = current_app.config["STORY_PATH"]
    return json.loads(Path(story_path).read_text(encoding="utf-8"))

@api_bp.get("/story")
def story():
    return load_story()

@api_bp.get("/state")
def get_state():
    state_path = current_app.config["STATE_PATH"]
    return read_json(state_path, DEFAULT_STATE)

@api_bp.get("/state/current")
def get_current_scene_state():
    state_path = current_app.config["STATE_PATH"]
    st = read_json(state_path, DEFAULT_STATE)
    key = st.get("activeSceneKey", "scene1")
    return {"activeSceneKey": key, "scene": st["scenes"].get(key)}

@api_bp.post("/state/set-active")
def set_active_scene():
    body = request.get_json(silent=True) or {}
    new_key = body.get("sceneKey")
    if new_key not in ["scene1", "scene2", "scene3"]:
        return {"error": "sceneKey must be one of scene1, scene2, scene3"}, 400

    state_path = current_app.config["STATE_PATH"]

    def mutate(st):
        st["activeSceneKey"] = new_key
        st.setdefault("events", [])
        st["events"].append({"type": "active_scene_changed", "sceneKey": new_key})
        return st

    st = update_json(state_path, DEFAULT_STATE, mutate)
    return {"ok": True, "activeSceneKey": st["activeSceneKey"]}

@api_bp.post("/action")
def action():
    body = request.get_json(silent=True) or {}
    action_id = body.get("actionId")
    if not action_id:
        return {"error": "actionId is required"}, 400

    story = load_story()
    actions = {a["id"]: a for a in story.get("actions", [])}
    if action_id not in actions:
        return {"error": "Unknown action"}, 400

    state_path = current_app.config["STATE_PATH"]

    def mutate(st):
        key = st.get("activeSceneKey", "scene1")
        scene_state = st["scenes"].get(key)
        if scene_state is None:
            return st

        action_obj = actions[action_id]

        # Apply effects to the ACTIVE scene only
        for eff in action_obj.get("effects", []):
            t = eff.get("type")

            if t == "unlock_document":
                doc_id = eff.get("documentId")
                if doc_id and doc_id not in scene_state["unlockedDocuments"]:
                    scene_state["unlockedDocuments"].append(doc_id)

            elif t == "set_phase":
                scene_state["phase"] = eff.get("phase")

            elif t == "set_flag":
                k = eff.get("key")
                if k:
                    scene_state["flags"][k] = eff.get("value", True)

            elif t == "set_lastEventId":
                scene_state["lastEventId"] = int(eff.get("value", scene_state["lastEventId"]))

            elif t == "switch_scene":
                # lets an action move you to another scene key
                target_key = eff.get("sceneKey")
                if target_key in st["scenes"]:
                    st["activeSceneKey"] = target_key

        # Add event log entry (global)
        st.setdefault("events", [])
        st["events"].append({
            "type": "action_applied",
            "actionId": action_id,
            "activeSceneKey": st.get("activeSceneKey", "scene1")
        })

        return st

    st = update_json(state_path, DEFAULT_STATE, mutate)
    key = st.get("activeSceneKey", "scene1")
    return {"ok": True, "activeSceneKey": key, "scene": st["scenes"].get(key)}
