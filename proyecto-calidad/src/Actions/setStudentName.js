const setStudentName = user => {
    return {
        type: 'setStudentName',
        payload: user
    };
};

export default setStudentName;