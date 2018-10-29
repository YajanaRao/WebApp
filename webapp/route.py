from flask import Blueprint,flash,request,g,session,url_for,redirect,render_template,jsonify

from webapp.database import Conversation,User
from wtforms import BooleanField,StringField,PasswordField,validators
from flask_wtf import Form
from werkzeug.security import check_password_hash, generate_password_hash
import functools

bp = Blueprint('project',__name__,url_prefix='/project')
@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = User.query.filter_by(id=user_id).first()


@bp.route("/register",methods=['GET','POST'])
def register():
    if request.method == 'POST':
        # auth = Authentication()
        error = None
        form = request.form

        # return str(form)
        output = User.query.filter_by(email=form['email']).first()
        if output is not None:
            print(output)
            error = 'User {} is already registered.'.format(form['name'])
        else:
            user = User(username=form['name'],email=form['email'],password=form['password'])
            User.create(user)
            flash('Account created successfully','success')
            return redirect(url_for('project.login'))


        flash(error,'error')
    return render_template('auth/register.html')

@bp.route("forgot",methods=['GET','POST'])
def forgot():
    if request.method == 'POST':
        error = None
        error = "Not implimented"
        flash(error,'error')
    return render_template('auth/forgot.html')

@bp.route("/login",methods=['GET','POST'])
def login():
    if request.method == 'POST':
        error = None
        # form = LoginForm(request.form)
        form = request.form
        user = User.query.filter_by(email=form['email']).first()
        password = form['password']
        if user is None:
            error = 'Username or Email Id not found.'

        elif not check_password_hash(user.password, password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user.id
            return redirect(url_for('project.index'))

        flash(error,'error')
    return render_template('auth/login.html')

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


@bp.route("/support")
def support():
    return render_template('support.html')

@bp.route("/admin")
def admin():
    return render_template('admin.html')


@bp.route("/gethint.php",methods=['GET', 'POST'])
def getHint():
    if request.method == 'GET':
        msg = request.args.get('q')
        if msg:

            if "delay" in  msg.lower():
                import time
                time.sleep(5)
                return jsonify("thanks for waiting")
            print(msg)
            response = Conversation.query.filter_by(input=msg.lower()).first()
            if response:
                print(response.output)
                return jsonify(response.output)
            else:
                # return ' '.join(matching)
                return jsonify("I dont know what you are talking about")

        else:
            return jsonify("I didn't hear you")

    elif request.method == 'POST':
        return "me again"
