import os
from flask import Flask
from flask import render_template
from flask import redirect
from flask import url_for
from flask import session
from flask import g
from flask import request
from flask import Blueprint
from flask import flash
import json
from .database import sqllite,Authentication
from wtforms import BooleanField,StringField,PasswordField,validators
from flask_wtf import Form
from werkzeug.security import check_password_hash, generate_password_hash

import functools

#
bp = Blueprint('project',__name__,url_prefix='/project')
db = sqllite()
auth = Authentication()

# app.config.update(dict(
#     SECRET_KEY="powerful secretkey",
#
# ))



@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = auth.get_user_from_id(user_id)


@bp.route("/register",methods=['GET','POST'])
def register():
    if request.method == 'POST':
        # auth = Authentication()
        error = None
        form = request.form

        # return str(form)
        auth.create_table()
        if auth.get_id(form['name']) is not None:
             error = 'User {} is already registered.'.format(form['name'])
        else:
            auth.create_account(form['name'],form['email'],form['password'])
            return redirect(url_for('project.login'))


        flash(error)
    return render_template('register.html')

@bp.route("/login",methods=['GET','POST'])
def login():

    if request.method == 'POST':
        error = None
        # form = LoginForm(request.form)
        form = request.form
        user = auth.get_user_from_email(form['email'])
        password = form['password']
        if user is None:
            error = 'Incorrect username.'

        elif not check_password_hash(user[3], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user[0]
            return redirect(url_for('project.index'))

        flash(error)

    return render_template('login.html')

@bp.route("/index")
def index():
    return render_template('index.html')

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('project.index'))

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('project.login'))

        return view(**kwargs)

    return wrapped_view




@bp.route("/chatbot")
def ChatbotPage():
    return render_template('chatbot.html')



@bp.route("/gethint.php",methods=['GET', 'POST'])
def getHint():
    if request.method == 'GET':
        msg = request.args.get('q')
        response = db.get_output(msg)
        if response:
            return response
        else:
            # return ' '.join(matching)
            return json.dumps("I dont know what you are talking about")

    elif request.method == 'POST':
        return "me again"





# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 5000))
#     app.debug = True
#     db.create_table()
#     app.run(host='0.0.0.0', port=port)
