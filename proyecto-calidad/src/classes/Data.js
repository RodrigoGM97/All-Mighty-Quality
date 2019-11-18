import Clase from './Clase';

class Data {
    currentUser = null;
    type_user = null;
    currentClass = "Group";
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
}

export default Data;