import { io } from 'socket.io-client';

// Prefer environment override so you can switch per environment
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000';

// Single shared client for the app
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket'],
});

export const connectSocket = () => {
  if (socket.connected) return socket;
  console.log('connected socket', socket.id);
  // Attach token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) socket.auth = { token };
  }

  socket.connect();
  return socket;
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const emitSocketEvent = (event, payload, callback) => {
  if (socket.connected) {
    socket.emit(event, payload, callback);
  }
};

export const sendMessage = (toUserId, text, postId,conversationId) => {
  emitSocketEvent('message:send', { toUserId, text, postId, conversationId });
}
export const startChat = (toUserId) => {
  emitSocketEvent('chat:start', { otherUserId:toUserId });
}
export const joinRoom = (conversationId) => {
  emitSocketEvent('conversation:join', { conversationId });
}

