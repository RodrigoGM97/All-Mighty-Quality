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
class_str = 'INSERT INTO CLASS(CLASS_ID, CLASS_NAME) VALUES ('

Letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
Topics = ['Math', 'Biology', 'Ethics', 'Computing', 'Entrepreneurship', 'Leadership']
Topics2 = ['Behaviour', 'in a Business Environment', 'Introduction to', 'I', 'II', 'III', 'IV']
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
    name = faker.first_name()
    lastname = faker.last_name()
    insert_str = teacher_str + "'" + str(ID) + "','" + name +  "','" + lastname + " " + faker.last_name() + "','" + name + '.' + lastname + "@tec.mx','" + faker.word() + "');\n"
    f.write(insert_str) 
    
f.close()


f = open('Class_Inserts.txt', 'w')
for i in range(0,30):
    r = randint(1000,9999)
    rand_letter = randint(0,25)
    rand_letter2 = randint(0,25)
    rand_topic = randint(0,5)
    rand_topic2 = randint(0,6)
    rand_str = ""
    if rand_topic2 == 2:
        rand_str = str(Topics2[rand_topic2]) + ' ' + str(Topics[rand_topic])
    else:
        rand_str =str(Topics[rand_topic]) + ' ' + str(Topics2[rand_topic2]) 
        
    ID =str(Letters[rand_letter]) + str(Letters[rand_letter2]) + str(r)
    insert_str = class_str + "'" + ID + "','" + rand_str +  "');\n"
    f.write(insert_str) 
    
f.close()

