import sqlite3
from werkzeug.security import generate_password_hash
class sqllite():
    def __init__(self):
        self.conn = sqlite3.connect('database.db',check_same_thread=False)
        print("Opened database successfully")

    def create_table(self):
        try:
            self.conn.execute('CREATE TABLE conversation (input TEXT, output TEXT)')
        except Exception as e:
            print("Dataabase aleary exists")
        finally:
            print("Table created successfully")

    def insert_data(self,input,output):
        self.conn.execute('''INSERT INTO conversation(input,output) VALUES(?,?)''',(input,output))
        self.conn.commit()
        print("Inserted data to the database")

    def show_data(self):
        output = self.conn.execute('SELECT * FROM conversation')
        print(output.fetchall())

    def get_output(self,input):
        query = self.conn.execute('''SELECT output FROM conversation WHERE input=(?)''',(input,))
        output = query.fetchall()
        if output:
            print(output[0][0])
            return str(output[0][0])

        else:
            return "none"

    def close(self):
        self.conn.commit()
        self.conn.close()

class Authentication():
    def __init__(self):
        self.conn = sqlite3.connect('database.db',check_same_thread=False)
        print("Opened database successfully")

    def create_table(self):
        try:
            self.conn.execute('CREATE TABLE authentication (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT, email TEXT,password TEXT)')
        except Exception as e:
            print("Dataabase aleary exists")
        finally:
            print("Table created successfully")

    def create_account(self,username,email,password):
        try:
            self.conn.execute('''INSERT INTO authentication(username,email,password) VALUES(?,?,?)''',(username,email,generate_password_hash(password)))
            self.conn.commit()
            print("Inserted data to the database")
            return 'success'
        except Exception as e:
            print(e)
            return 'email'

    def get_id(self,username):
        output = self.conn.execute('SELECT id FROM authentication WHERE username = ?', (username,))
        output = output.fetchone()
        print(output)
        return output

    def get_user_from_name(self,username):
        try:
            output = self.conn.execute('SELECT * FROM authentication WHERE username = ?', (username,))
            output = output.fetchone()
            print(output)
            return output
        except Exception as e:
            print(e)

    def get_user_from_email(self,email):
        try:
            output = self.conn.execute('SELECT * FROM authentication WHERE email = ?', (email,))
            output = output.fetchone()
            print(output)
            return output
        except Exception as e:
            print(e)

    def get_user_from_id(self,id):
        try:
            output = self.conn.execute('SELECT * FROM authentication WHERE id = ?', (id,))
            output = output.fetchone()
            print(output)
            return output
        except Exception as e:
            print(e)

    def get_password(self,email):
        try:
            output = self.conn.execute(''' SELECT password FROM authentication WHERE email=(?) ''',(email,))
            output = output.fetchall()
            if output:
                print(output)
                return output
        except Exception as e:
            raise



    def close(self):
        self.conn.commit()
        self.conn.close()

# sql = sqllite()
# # # sql.create_table()
# sql.insert_data("What can you do?","I can chat, ask me something")
# # sql.show_data()
# print(sql.get_output("how?"))
# sql.close()
