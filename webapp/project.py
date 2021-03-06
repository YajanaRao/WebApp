from flask import render_template

from webapp import app
from webapp.route import bp
from webapp.database import setup

#


app.register_blueprint(bp)
setup()

@app.route('/')
def index():
    return render_template('index.html')


@app.errorhandler(404)
def pagenotfound(error):
    return render_template('error.html')
