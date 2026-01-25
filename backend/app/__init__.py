import os
from flask import Flask, send_from_directory
from dotenv import load_dotenv

from .config import get_config
from .extensions import cors
from .routes import api_bp

def create_app():
    load_dotenv()

    # Path to backend/dist
    dist_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "dist")
    )

    app = Flask(
        __name__,
        static_folder=dist_path,
        static_url_path=""
    )

    app.config.from_object(get_config())

    cors.init_app(
        app,
        resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS", [])}},
        supports_credentials=True,
    )

    # API routes
    app.register_blueprint(api_bp, url_prefix="/api")

    # Serve React
    @app.route("/")
    def index():
        return send_from_directory(app.static_folder, "index.html")

    # SPA fallback (important for React Router)
    @app.route("/<path:path>")
    def serve_static(path):
        full_path = os.path.join(app.static_folder, path)
        if os.path.exists(full_path):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    return app
