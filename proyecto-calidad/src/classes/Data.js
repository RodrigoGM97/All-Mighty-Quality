import Clase from './Clase';

class Data {
    currentUser = null;
    type_user = null;
    currentClass = "Group";
    currentclassID = null;
    classesArr = [];
    alumnosinClass = [];

    setCurrentUser (user, type) {
        this.currentUser = user;
        this.type_user = type;
    }

    setClasses(json_response) {
        
        for(var i=0;i<json_response.data.length;i++)
        {
            var classes = new Clase(json_response.data[i].className, json_response.data[i].classID);
            this.classesArr.push(classes);
        }
        console.log("Data: %j", this.classesArr);
    }

    setAlumnosInClass(json_response) {
        this.alumnosinClass = [];
        for(var i=0;i<json_response.data.length;i++)
        {
            var alumnosInClass = {
                'ID':json_response.data[i].ID,
                'Name':json_response.data[i].Name,
                'LastName':json_response.data[i].LastName,
                'className':json_response.data[i].className,
                'Academic':json_response.data[i].Academic,
                'teamWork':json_response.data[i].teamWork,
                'commSkills':json_response.data[i].commSkills,
            };
            this.alumnosinClass.push(alumnosInClass);
        }
    }

    setGrades(grades) {
        for(var i=0;i<grades.length;i++) {
            this.alumnosinClass[i].Academic = grades[i].academic;
            this.alumnosinClass[i].teamWork = grades[i].team;
            this.alumnosinClass[i].commSkills = grades[i].communication;

        }
        console.log("Datos %j",this.alumnosinClass);
    }
}

export default Data;