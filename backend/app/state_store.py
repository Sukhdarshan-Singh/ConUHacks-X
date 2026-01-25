import json
import os
import threading
from pathlib import Path

_lock = threading.Lock()

def _atomic_write(path: Path, data: dict):
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(data, indent=2), encoding="utf-8")
    os.replace(tmp, path)

def read_json(path: str, default: dict):
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    if not p.exists():
        _atomic_write(p, default)
        return default
    return json.loads(p.read_text(encoding="utf-8"))

def update_json(path: str, default: dict, mutator_fn):
    with _lock:
        data = read_json(path, default)
        new_data = mutator_fn(data)
        _atomic_write(Path(path), new_data)
        return new_data
