# -*- coding: utf-8 -*-
"""
Created on Sat Nov 16 16:56:28 2019

@author: beto_
"""

#Create bulk upload data for our proyect. 
from random import randint
from faker import Faker

faker = Faker()
stdnt_str = 'INSERT INTO STUDENTS (STUDENT_ID, NAMES, LASTNAMES, MAIL, PASS) VALUES ('
teacher_str = 'INSERT INTO TEACHERS (TEACHER_ID, NAMES, LASTNAMES, MAIL, PASS) VALUES ('
f = open('Student_Inserts.txt', 'w')
for i in range(0,150):
    r = randint(111111,999999)
    ID = "A01" + str(r)
    insert_str = stdnt_str + "'" + str(ID) + "','" + faker.first_name() +  "','" + faker.last_name() + " " + faker.last_name() + "','" + str(ID) + "@tec.mx','" + faker.word() + "');\n"
    f.write(insert_str)
    
f.close()

f = open('Teacher_Inserts.txt', 'w')
for i in range(0,20):
    r = randint(111111,999999)
    ID = "L01" + str(r)
    insert_str = teacher_str + "'" + str(ID) + "','" + faker.first_name() +  "','" + faker.last_name() + " " + faker.last_name() + "','" + str(ID) + "@tec.mx','" + faker.word() + "');\n"
    f.write(insert_str) 
    
f.close()