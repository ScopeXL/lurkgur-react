import { combineReducers } from 'redux';
import socket from './socket';
import feed from './feed';
 
export default combineReducers({
    socket,
    feed,
});
