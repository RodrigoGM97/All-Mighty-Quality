const signOut = user => {
    return {
        type: 'signOut',
        payload: user
    };
};

export default signOut;