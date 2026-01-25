import os
from flask import Flask
from dotenv import load_dotenv

from .config import get_config
from .extensions import cors
from .routes import api_bp

def create_app():
    # Load .env if present
    load_dotenv()

    app = Flask(__name__)
    app.config.from_object(get_config())

    # Init extensions
    cors.init_app(
        app,
        resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS", [])}},
        supports_credentials=True,
    )

    # Register blueprints
    app.register_blueprint(api_bp, url_prefix="/api")

    @app.get("/")
    def root():
        return {"message": "Flask backend running", "docs": "/api/health"}

    
    return app
