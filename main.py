import pyodbc
import flask
from flask import jsonify

app = flask.Flask("__main__")

connectString = 'Driver={ODBC Driver 17 for SQL Server};Server=tcp:allmighty.database.windows.net,1433;Database=All_Mighty_DB;Uid=allmighty;Pwd=ArquitecturadeSoftware2019.;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'
connection = pyodbc.connect(connectString)
cursor = connection.cursor()

@app.route("/",methods=['GET'])
def connection():
    response = jsonify(connectString)
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(connection)
    return response

@app.route("/query")
def query():
    cursor.execute("SELECT * FROM Test")
    users = cursor.fetchall()
    json_response = []
    for row in users:
        content = {'name': row[0], 'surname': row[1]}
        json_response.append(content)
    json_response = jsonify(json_response)
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    return json_response

@app.route('/login', methods=['GET', 'POST']) # HTTP request methods namely "GET" or "POST"
def login():
    return jsonify("Login")

@app.route('/GET-allStudents', methods=['GET']) # HTTP request methods namely "GET" or "POST"
def show():
    cursor.execute("SELECT * FROM STUDENTS")
    tables = cursor.fetchall()
    print(jsonify(cursor.fetchall()))
    json_response = []
    for row in tables:
        content = {'id':row[0],'name':row[1],'lastNames':row[2],'password':row[3]}
        json_response.append(content)
    json_response = jsonify(json_response)
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    return json_response

app.run()

