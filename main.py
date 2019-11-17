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

@app.route('/login', methods=['GET', 'POST']) # HTTP request methods namely "GET" or "POST"
def login():
    user = request.args.get('user')
    password = request.args.get('pass')
    query = "select dbo.VALIDATE_LOGIN('" + str(user) + "','" + str(password) + "');"
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

@app.route ( '/getClassesTeacher', methods=['GET'])
def getClassesTeacher():
    currentTeacher = request.args.get('username')
    query = "select student.student_id as student_id, student.names as Name, student.lastnames as 'Last Name', cl.class_name as 'Class Name', student_class.Academic_grade as 'Academic', student_class.TeamWork_grade as 'Team Work', student_class.Communication_grade as 'Communication Skills' from students student join student_has_class student_class on (student.student_id = student_class.student_id) join class cl on (cl.class_id = student_class.class_id) join TEACHER_GIVES_CLASS TEACHER_CLASS ON (CL.CLASS_ID = TEACHER_CLASS.CLASS_ID) JOIN TEACHERS T ON (T.TEACHER_ID = TEACHER_CLASS.TEACHER_ID) Where T.teacher_id = '"+currentTeacher+"';"
    json_response = []
    classes = cursor.execute(query)
    for row in classes:
        content = {
            'student_id':row[0],
            'name':row[1],
            'lastName':row[2],
            'className':row[3],
            'academicGrade':row[4],
            'teamGrade':row[5],
            'commGrade':row[6],
        }
        json_response.append(content)
    json_response = jsonify(json_response)
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    return json_response

app.run()

