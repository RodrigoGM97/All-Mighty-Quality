const checkAcc = user => {
    return {
        type: 'checkAcc',
        payload: user
    };
};

export default checkAcc;