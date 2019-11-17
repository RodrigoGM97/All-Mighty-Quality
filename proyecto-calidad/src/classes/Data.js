class Data {
    currentUser = null;
    type_user = null;
    classesArr = [];

    setCurrentUser (user, type) {
        this.currentUser = user;
        this.type_user = type;
    }
}

export default Data;