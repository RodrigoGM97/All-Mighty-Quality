class Data {
    currentUser = null;
    type_user = null;
    classesArr = [];
    alumnosinClass = [];

    setCurrentUser (user, type) {
        this.currentUser = user;
        this.type_user = type;
    }

    setClasses(json_response) {
        for(var i=0;i<json_response.data.length;i++)
        {
            this.classesArr.push(json_response.data[i].className);
        }
        
    }
}

export default Data;