import Cookies from 'universal-cookie';
const cookies = new Cookies();

const initialState = {
    tokenId: null,
    isSignedIn: false,
    currentUser: {
        name: null
    }
}

const reducer = (state=initialState,action) => {
    let newState;
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
        default:
            return state;
            
    }
}

export default reducer;