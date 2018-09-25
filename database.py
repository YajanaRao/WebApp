import sqlite3

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

# sql = sqllite()
# # # sql.create_table()
# sql.insert_data("What can you do?","I can chat, ask me something")
# # sql.show_data()
# print(sql.get_output("how?"))
# sql.close()
