import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import {BrowserRouter as Router } from 'react-router-dom';

import { connectSocket } from './actions/socket';
import { getFeed } from './actions/feed';

// Create the redux store
const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

// Connect to socket
store.dispatch(connectSocket());

// Fetch feed status
store.dispatch(getFeed());

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
