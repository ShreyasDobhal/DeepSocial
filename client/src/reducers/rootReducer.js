import Cookies from 'universal-cookie';
const cookies = new Cookies();

const initialState = {
    tokenId: null,
    isSignedIn: false,
    currentUser: {
        fname: null,
        lname: null,
        email: null
    }
}

const reducer = (state=initialState,action) => {
    let newState;
    let newUser;
    switch (action.type) {
        case 'SET_TOKEN':
            newState = {
                ...state,
                tokenId: action.value,
                isSignedIn: true
            };
            cookies.set('tokenId',action.value);
            return newState;
        case 'DELETE_TOKEN':
            newState = {
                ...state,
                tokenId: null,
                isSignedIn: false
            };
            cookies.set('tokenId',null);
            return newState;
        case 'SET_USER':
            newUser = {
                ...state.currentUser,
                fname: action.value.fname,
                lname: action.value.lname,
                email: action.value.email
            }
            newState = {
                ...state,
                currentUser: newUser
            }
            cookies.set('fname',action.value.fname);
            cookies.set('lname',action.value.lname);
            cookies.set('email',action.value.email);
            return newState;
        default:
            return state;
            
    }
}

export default reducer;