from flask import *

def create_app():
    app = Flask(__name__)

    from .view.view import bp

    app.register_blueprint(bp)

    return app