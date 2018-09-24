import os
from flask import Flask
from flask import render_template
from flask import request
import json
from database import sqllite

app = Flask(__name__)
db = sqllite()

@app.route("/")
def hello():
    return render_template('index.html')

@app.route("/chatbot")
def ChatbotPage():
    return render_template('chatbot.html')

@app.route("/gethint.php",methods=['GET', 'POST'])
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

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.debug = True
    db.create_table()
    app.run(host='0.0.0.0', port=port)
