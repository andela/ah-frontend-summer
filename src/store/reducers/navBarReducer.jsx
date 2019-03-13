
const navBarReducer = (state={isLoggedIn: false}, action) => {
    switch (action.type) {
    case 'USER_LOGGEDIN':
        return ({
            ...state,
            isLoggedIn: true
        });
    default:
        return state;
    }
};

export default navBarReducer;
