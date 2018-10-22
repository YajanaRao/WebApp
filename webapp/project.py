from flask import render_template

from webapp import app
from webapp.route import bp


#


app.register_blueprint(bp)

@app.route('/')
def index():
    return render_template('index.html')














# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 5000))
#     app.debug = True
#     db.create_table()
#     app.run(host='0.0.0.0', port=port)
