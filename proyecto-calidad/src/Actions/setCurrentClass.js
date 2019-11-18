const setCurrentClass = user => {
    return {
        type: 'setCurrentClass',
        payload: user
    };
};

export default setCurrentClass;