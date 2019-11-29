

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
    student_id varchar(32),
    Academic_grade float DEFAULT NULL,
    TeamWork_grade float DEFAULT NULL,
    Communication_grade float DEFAULT NULL,
    constraint STUDENT_ID_CLASS FOREIGN KEY (student_id) REFERENCES STUDENTS(Student_id),
    constraint ClASS_ID_STUDENT FOREIGN KEY (Class_id) REFERENCES CLASS(class_id)
);
CREATE TABLE STUDENT_HAS_CLASS
(
    teacher_id varchar(32),
    class_id varchar(100)
    constraint TEACHER_ID_CLASS FOREIGN KEY (teacher_id) REFERENCES TEACHERS(teacher_id),
    constraint ClASS_ID_TEACHER FOREIGN KEY (Class_id) REFERENCES CLASS(class_id)
);
END;



CREATE TRIGGER GradeUPDATE ON [dbo].[STUDENT_HAS_CLASS]
AFTER UPDATE
AS
BEGIN
	UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Academic_grade = 100
	WHERE Academic_grade > 100;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET TeamWork_grade = 100
	WHERE TeamWork_grade > 100;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Communication_grade = 100
	WHERE Communication_grade > 100;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Final_grade = 100
	WHERE Final_grade > 100;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Academic_grade = 0
	WHERE Academic_grade <0;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET TeamWork_grade = 0
	WHERE TeamWork_grade <0

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Communication_grade = 0
	WHERE Communication_grade < 0;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Final_grade = FLOOR((Academic_grade + Teamwork_grade + Communication_grade)/3)
	WHERE Final_grade < 0;
END


CREATE TRIGGER GradeINSERT ON [dbo].[STUDENT_HAS_CLASS]
AFTER INSERT
AS
BEGIN
	UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Academic_grade = 100
	WHERE Academic_grade > 100;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET TeamWork_grade = 100
	WHERE TeamWork_grade > 100;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Communication_grade = 100
	WHERE Communication_grade > 100;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Final_grade = 100
	WHERE Final_grade > 100;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Academic_grade = 0
	WHERE Academic_grade <0;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET TeamWork_grade = 0
	WHERE TeamWork_grade <0

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Communication_grade = 0
	WHERE Communication_grade < 0;

    UPDATE [dbo].[STUDENT_HAS_CLASS]
	SET Final_grade = FLOOR((Academic_grade + Teamwork_grade + Communication_grade)/3)
	WHERE Final_grade < 0;
END

-- massive student grade update:

DECLARE @gradeA float
DECLARE @gradeB float
DECLARE @gradeC float
DECLARE @class varchar(100)
DECLARE @student varchar(100)

DECLARE @newgradeA float
DECLARE @newgradeB float
DECLARE @newgradeC float
DECLARE db_cursor CURSOR FOR 
SELECT CLASS_ID, STUDENT_ID, Academic_grade, TeamWork_grade, Communication_grade
from [dbo].[STUDENT_HAS_CLASS]

OPEN db_cursor  
FETCH NEXT FROM db_cursor INTO @class, @student, @gradeA, @gradeB, @gradeC  

WHILE @@FETCH_STATUS = 0  
BEGIN  
      SET @newgradeA = FLOOR(RAND()*(121-34+1))+34
      SET @newgradeB = FLOOR(RAND()*(121-34+1))+34
      SET @newgradeC = FLOOR(RAND()*(121-34+1))+34
      UPDATE [dbo].[STUDENT_HAS_CLASS] SET ACADEMIC_GRADE = @newgradeA, teamwork_grade = @newgradeB, communication_grade = @newgradeC, Final_grade=-1 where class_id = @class and student_id = @student

      FETCH NEXT FROM db_cursor INTO @class, @student, @gradeA, @gradeB, @gradeC 
END 

CLOSE db_cursor  
DEALLOCATE db_cursor 
