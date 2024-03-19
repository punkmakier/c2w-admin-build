import { reactive } from 'vue';
import { io } from 'socket.io-client';

export const socketState = reactive({
    connected: false,
    messages: []
});

const URL = 'https://ws.come2win.ph';

export const socket = io(URL);

socket.on('connect', () => {
    socketState.connected = true;
});

socket.on('disconnect', () => {
    socketState.connected = false;
});

socket.on('chat-message', (message) => {
    socketState.messages.push(message);
});

export default {
    socketState,
    socket
};
