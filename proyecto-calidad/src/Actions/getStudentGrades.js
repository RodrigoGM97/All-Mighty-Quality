const getStudentGrades = user => {
    return {
        type: 'getStudentGrades',
        payload: user
    };
};

export default getStudentGrades;