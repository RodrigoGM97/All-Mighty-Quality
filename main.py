# -*- coding: utf-8 -*-
"""
Created on Mon Nov 10 19:07:48 2019

@authors: Rodrigo García, Manuel Guadarrama, Alberto Pascal
"""

import pyodbc
import flask
from flask import jsonify
from flask import request
import ast


app = flask.Flask("__main__")

connectString = 'Driver={ODBC Driver 17 for SQL Server};Server=tcp:allmighty.database.windows.net,1433;Database=All_Mighty_DB;Uid=allmighty;Pwd=ArquitecturadeSoftware2019.;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'
connection = pyodbc.connect(connectString, autocommit=True)
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

@app.route('/welcomeStudent', methods=['GET']) # HTTP request methods namely "GET" or "POST"
def welcome_student():
    student_id = request.args.get('student_id')
    query = "select Names from STUDENTS where student_id = '" + student_id +"';" 
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

@app.route('/SET-studentgrade', methods=['GET']) # HTTP request methods namely "GET" or "POST"
def setStudentGrade():
   
    cl_id = request.args.get('classid')
    json = request.args.get('json')
    arr = json.split('},')
    #cursor.execute("select class_id from class where class_name = 'Computing in a Business Environment';")
    #class_ids = cursor.fetchall()
    #print(class_id[0][0])
    print(cl_id + "********************************************************")
    print(arr)
    arr2=[]
    for i in range(0,len(arr)):
        clean_str = arr[i].replace('[','')
        if (i+1) == len(arr):
            clean_str = clean_str[:-2]
        clean_str = clean_str.replace(']','')
        arr2.append(clean_str + '}')
        print(arr2[i])    
        mydict = ast.literal_eval(arr2[i])
        academic_grade = mydict['Academic']
        teamwork_grade = mydict['teamWork']
        communication_grade = mydict['commSkills']
        if(academic_grade == "" or teamwork_grade =="" or communication_grade ==""):
            print("este ya valió")
        else:
            curr_student = mydict['ID']
            print("I will do *********************************")
            print("update [dbo].[STUDENT_HAS_CLASS] set Academic_grade = " + academic_grade + ", teamwork_grade = " + teamwork_grade + ", communication_grade =" + communication_grade + " where student_id = '" + curr_student + "' and class_id = '" + cl_id + "';")
            cursor.execute("update [dbo].[STUDENT_HAS_CLASS] set Academic_grade = " + academic_grade + ", teamwork_grade = " + teamwork_grade + ", communication_grade =" + communication_grade + " where student_id = '" + curr_student + "' and class_id = '" + cl_id + "';")
    print("my dict is ",mydict['ID'])
    
    header_jsonify = jsonify({"msg":  "Rows succesfully updated"})
    header_jsonify.headers.add('Access-Control-Allow-Origin', '*')
    return header_jsonify

    #cursor.execute("update [dbo].[STUDENT_HAS_CLASS] set Academic_grade = " + academic_grade + ", teamwork_grade = " + teamwork_grade + ", communication_grade =" + communication_grade + " where student_id = '" + curr_student + "' and class_id = '" + curr_class + "';")
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


@app.route ( '/getClassesofTeacher', methods=['GET'])
def getClassesofTeacher():
    currentTeacher = request.args.get('teacher-id')
    query = "select tc.class_id, cl.class_name from [dbo].[TEACHER_GIVES_CLASS] tc join CLASS cl on (cl.class_id = tc.class_id) where teacher_id = '"+currentTeacher+"';"
    json_response = []
    classes = cursor.execute(query)
    for row in classes:
        content = {
            'classID': row[0],
            'className':row[1],
        }
        json_response.append(content)
    json_response = jsonify(json_response)
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    return json_response

@app.route ( '/getStudentReportCard', methods=['GET'])
def getStudentReportCard():
    current_student = request.args.get('student_id')
    query = "select st_cl.class_id, cl.class_name, st_cl.academic_grade, st_cl.teamwork_grade, st_cl.communication_grade, st_cl.final_grade from [dbo].[STUDENT_HAS_CLASS] st_cl join class cl on (st_cl.class_id = cl.class_id) where st_cl.student_id = '" + current_student + "';"
    json_response = []
    grades = cursor.execute(query)
    for row in grades:
        content = {
            'classID': row[0],
            'className':row[1],
            'academic': row[2],
            'teamwork': row[3],
            'commskills': row[4],
            'final_grade': row[5]
        }
        json_response.append(content)
    json_response = jsonify(json_response)
    print(json_response)
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    return json_response

@app.route ( '/getStudentGrades', methods=['GET'])
def getStudentGrades():
    class_name = request.args.get('class_name')
    teacher_id = request.args.get('teacher_id')
    print(class_name);
    query = "select student.student_id as student_id, student.names as Name, student.lastnames as 'Last Name', cl.class_name as 'Class Name', student_class.Academic_grade as 'Academic', student_class.TeamWork_grade as 'Team Work', student_class.Communication_grade as 'Communication Skills' from students student join student_has_class student_class on (student.student_id = student_class.student_id) join class cl on (cl.class_id = student_class.class_id) join TEACHER_GIVES_CLASS TEACHER_CLASS ON (CL.CLASS_ID = TEACHER_CLASS.CLASS_ID) JOIN TEACHERS T ON (T.TEACHER_ID = TEACHER_CLASS.TEACHER_ID) Where T.teacher_id = '"+teacher_id+"' and cl.Class_name = '"+class_name+"';"
    json_response = []
    classes = cursor.execute(query)
    for row in classes:
        content = {
            'ID':row[0],
            'Name':row[1],
            'LastName':row[2],
            'className':row[3],
            'Academic':row[4],
            'teamWork':row[5],
            'commSkills':row[6],
        }
        json_response.append(content)
    json_response = jsonify(json_response)
    json_response.headers.add('Access-Control-Allow-Origin', '*')
    return json_response

app.run()

