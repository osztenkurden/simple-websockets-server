import ws from 'ws';
import http from 'http';
import { SimpleWebSocket, convertEventToMessage } from 'simple-websockets';

type ListenerCallback = (socket: SimpleWebSocket, request: http.IncomingMessage) => void;

class SimpleWebSocketServer extends ws.Server {
	connectionListeners: ListenerCallback[];
	constructor(options?: ws.ServerOptions, callback?: () => void) {
		super(options, callback);
		this.connectionListeners = [];
		super.on('connection', (socket, request) => {
			const simpleSocket = new SimpleWebSocket(socket);

			this.connectionListeners.forEach(listener => {
				listener(simpleSocket, request);
			});
		});
	}
	onConnection(listener: ListenerCallback) {
		this.connectionListeners.push(listener);
	}
	send(eventName: string, ...values: any[]) {
		this.clients.forEach(socket => {
			socket.send(convertEventToMessage(eventName, ...values));
		});
	}
}

export { SimpleWebSocketServer };
