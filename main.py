import pyodbc
import flask
from flask import jsonify
from flask import request


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
    user = request.args.get('user')
    password = request.args.get('pass')
    query = "WITH TT_LOGIN_DATABASE AS( select student_id as ID, 'Student' as Role, Pass as Password from students union select teacher_id as ID, 'Teacher' as Role, Pass as Password from  teachers) select case when EXISTS(SELECT ROLE from TT_LOGIN_DATABASE WHERE ID = '"+user+"' and Password = '"+password+"' group by ID, Role ) THEN 'OK' ELSE 'Incorrect Login' end as Status;"
    cursor.execute(query)
    rows = cursor.fetchall()
    json_response = jsonify(rows[0][0])
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    return json_response

@app.route('/GET-allStudents', methods=['GET']) # HTTP request methods namely "GET" or "POST"
def getAllStudents():
    cursor.execute("SELECT * FROM STUDENTS")
    tables = cursor.fetchall()
    print(jsonify(cursor.fetchall()))
    json_response = []
    for row in tables:
        content = {'id':row[0],'name':row[1],'lastNames':row[2],'mail':row[3], 'password':row[4]}
        json_response.append(content)
    json_response = jsonify(json_response)
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    return json_response

@app.route('/GET-allTeachers', methods=['GET']) # HTTP request methods namely "GET" or "POST"
def getAllTeachers():
    cursor.execute("SELECT * FROM Teachers")
    tables = cursor.fetchall()
    print(jsonify(cursor.fetchall()))
    json_response = []
    for row in tables:
        content = {'id':row[0],'name':row[1],'lastNames':row[2],'mail':row[4], 'password':row[3]}
        json_response.append(content)
    json_response = jsonify(json_response)
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    return json_response

@app.route ( '/multiply', methods=['GET'])
def get_table():
    username = request.args.get('username')
    print (username)
    json_response = jsonify(username)
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    return json_response

app.run()

