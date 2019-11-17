class Data {
    currentUser = null;
    type_user = null;
    classesArr = [];

    setCurrentUser (user, type) {
        this.currentUser = user;
        this.type_user = type;
    }

    setClasses(json_response) {
        console.log("setClasses: %j",json_response);
    }
}

export default Data;