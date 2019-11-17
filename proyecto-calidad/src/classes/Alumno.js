class Alumno {
    enrolledClasses = [];
    constructor(id, name, surname, email, enrolledClasses, password){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.enrolledClasses = enrolledClasses;
    }
}

export default Alumno;