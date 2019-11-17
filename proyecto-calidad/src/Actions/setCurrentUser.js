const setCurrentUser = user => {
    return {
        type: 'setCurrentUser',
        payload: user
    };
};

export default setCurrentUser;