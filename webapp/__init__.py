import os
from flask import Flask
from flask import render_template
from flask_assets import Environment, Bundle

def create_app():
    app = Flask(__name__)
    # existing code omitted
    assets = Environment(app)
    assets.url = app.static_url_path
    scss = Bundle('assets\scss\style.scss', filters='pyscss', output='css\style.css')
    assets.register('scss_all', scss)

    app.config.from_mapping(
        SECRET_KEY='dev',
        # DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
        WTF_CSRF_SECRET_KEY="a csrf secret key",
    )

    from . import project
    app.register_blueprint(project.bp)

    @app.route("/")
    def hello():
        return render_template('index.html')

    return app
