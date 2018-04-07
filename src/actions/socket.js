import io from 'socket.io-client';

/**
 * Connect to the socket server
 */
export function connectSocket() {
    let socket = io('https://lurkgur.com');

    socket.on('connect', () => {
        console.log('Socket Connected');
    });

    socket.on('disconnect', () => {
        console.log('Socket Disconnected');
    });

    socket.on('error', (data) => {
        console.error('Error Connecting to Socket', data);
    });

    return {
        type: 'SOCKET_CONNECT',
        socket
    }
}
