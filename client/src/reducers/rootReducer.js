const initialState = {
    tokenId: null,
    isSignedIn: false
}

const reducer = (state=initialState,action) => {
    
    switch (action.type) {
        case 'SET_TOKEN':
            let newState = {
                ...state,
                tokenId: action.value,
                isSignedIn: true
            };
            return newState;
        default:
            return state;
            
    }
}

export default reducer;