import ws from 'ws';
import { SimpleWebSocket, convertEventToMessage } from 'simple-websockets';
class SimpleWebSocketServer extends ws.Server {
    constructor(options, callback) {
        super(options, callback);
        this.connectionListeners = [];
        super.on('connection', socket => {
            const simpleSocket = new SimpleWebSocket(socket);
            simpleSocket.send('connection');
            this.connectionListeners.forEach(listener => {
                listener(simpleSocket);
            });
            socket.on('close', () => {
                simpleSocket.send('disconnect');
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
