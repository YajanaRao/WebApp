import os
from flask import Flask
from flask import render_template
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy


# def create_app():
app = Flask(__name__)
# existing code omitted
assets = Environment(app)
assets.url = app.static_url_path
scss = Bundle('assets/scss/style.scss', filters='pyscss', output='css/style.css')

# javascript bundling
map = Bundle('assets/js/map.js', filters='jsmin', output='js/map.js')
login = Bundle('assets/js/my-login.js', filters='jsmin', output='js/my-login.js')


assets.register('scss_all', scss)

# javascript
assets.register('map_js', map)
assets.register('login_js', login)


app.config.from_mapping(
    SECRET_KEY='dev',
    # DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    WTF_CSRF_SECRET_KEY="a csrf secret key",
    SQLALCHEMY_TRACK_MODIFICATIONS=True,
)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
from webapp import project

    # @app.route("/")
    # def hello():
    #     return render_template('index.html')
    #
    # return app
