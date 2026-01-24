from flask import Blueprint

api_bp = Blueprint("api", __name__)

from .health import *  # registers routes on api_bp
from .echo import *
from .game import *
