import os
from flask import Flask
from flask_assets import Environment, Bundle
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# def create_app():
app = Flask(__name__)

CORS(app)

# existing code omitted
assets = Environment(app)
assets.url = app.static_url_path
scss = Bundle('assets/scss/style.scss', filters='pyscss', output='css/style.css')


assets.register('scss_all', scss)


app.config.from_mapping(
    SECRET_KEY='dev',
    WTF_CSRF_SECRET_KEY="a csrf secret key",
    SQLALCHEMY_TRACK_MODIFICATIONS=True,
)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
from webapp import project


