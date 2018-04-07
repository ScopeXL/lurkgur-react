const initialState = null;

const socket = (state = initialState, action) => {
    switch (action.type) {
        case 'SOCKET_CONNECT':
            return action.socket;
        
        default:
            return state;
    }
}

export default socket
