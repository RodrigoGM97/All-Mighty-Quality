BEGIN
CREATE TABLE STUDENTS
(
Student_id Varchar(32) NOT NULL,
Names Varchar(100),
Lastnames Varchar(100),
Mail Varchar(100),
Pass Varchar(100) NOT NULL,
PRIMARY KEY(Student_id)
);

CREATE TABLE TEACHERS
(
Teacher_id Varchar(32),
Names Varchar(100),
Lastnames Varchar(100),
Pass varchar(100) NOT NULL,
Mail varchar(100),
PRIMARY KEY (Teacher_id)
)

CREATE TABLE CLASS
(
    Class_ID varchar(100),
    Class_name varchar(100),
    PRIMARY KEY(Class_ID)
)
CREATE TABLE STUDENT_HAS_CLASS
(
    
    Class_id varchar(100),
    student_id varchar(100)
    

);
CREATE TABLE TEACHER_GIVES_CLASS
(
    teacher_id varchar(32),
    class_id varchar(100)
)

END;