function isBlank(obj) {
    return !obj || obj.trim() === '';
}

function isEmail(value) {
    return value.indexOf('@') !== -1;
}

module.exports = () => (state, params) => {
    const validations = [
        {
            field: 'name',
            fn: () => !isBlank(state.name),
            errorMessage: 'Name is required'
        },
        {
            field: 'email',
            fn: () => !isBlank(state.email),
            errorMessage: 'Email is required'
        },
        {
            field: 'email',
            fn: () => isEmail(state.email),
            errorMessage: 'Email must contain @'
        },
        {
            field: 'message',
            fn: () => !isBlank(state.message),
            errorMessage: 'Message is required'
        }
    ];

    validations.push({
        fn: () => !isBlank(state.grecaptchaResponse),
        errorMessage: 'Please prove you\'re not a robot'
    });

    const filteredValidations = params.key ?
        validations.filter(item => item.field === params.key) : validations;

    return filteredValidations.reduce((memo, item) => {
        const isValid = item.fn();
        if (!isValid) memo.push(item.errorMessage);
        return memo;
    }, []);

};
