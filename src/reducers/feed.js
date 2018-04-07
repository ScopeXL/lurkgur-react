const initialState = {
    enabled: true,
};

const feed = (state = initialState, action) => {
    switch (action.type) {
        case 'ENABLE_FEED':
            return action.feed;
        
        default:
            return state;
    }
}

export default feed
