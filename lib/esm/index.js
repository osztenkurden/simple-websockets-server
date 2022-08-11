import ws from 'ws';
import { SimpleWebSocket, convertEventToMessage, getEnvironment, convertMessageToEvent } from 'simple-websockets';
class SimpleWebSocketServer extends ws.Server {
    constructor(options, callback) {
        super(options, callback);
        this.connectionListeners = [];
        super.on('connection', (socket, request) => {
            const simpleSocket = new SimpleWebSocket(socket);
            this.connectionListeners.forEach(listener => {
                listener(simpleSocket, request);
            });
        });
    }
    onConnection(listener) {
        this.connectionListeners.push(listener);
    }
    send(eventName, ...values) {
        this.clients.forEach(socket => {
            socket.send(convertEventToMessage(eventName, ...values));
        });
    }
}
export { SimpleWebSocketServer };
export { getEnvironment, convertMessageToEvent, convertEventToMessage };
export { SimpleWebSocket };
