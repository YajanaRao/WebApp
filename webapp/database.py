from werkzeug.security import generate_password_hash
from webapp import db

class Conversation(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    input = db.Column(db.String(300),unique=True,nullable=False)
    output = db.Column(db.String(300),nullable=False)

    def add(chat):
        db.session.add(chat)
        db.session.commit()

    def __repr__(self):
        return "User('{self.input}', '{self.output}')"




class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    image_file = db.Column(db.String(20),nullable=False,default='default.png')
    actype = db.Column(db.String(40), nullable=False,default="user")

    def __init__(self,username,email,password,actype=None,image_file=None):
        self.username = username
        self.password = generate_password_hash(password)
        self.email = email
        if actype != None:
            self.actype = actype
        if image_file != None:
            self.image_file = image_file

    def create(user):
        db.session.add(user)
        db.session.commit()

    def __repr__(self):
        return "User('{self.username}', '{self.email}', '{self.image_file}', '{self.actype}')"

def setup():
    db.create_all()
