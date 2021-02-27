import ws from 'ws';
import { SimpleWebSocket, convertEventToMessage } from 'simple-websockets';

class SimpleWebSocketServer extends ws.Server {
	connectionListeners: ((socket: SimpleWebSocket) => void)[];
	constructor(options?: ws.ServerOptions, callback?: () => void) {
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
	onConnection(listener: (socket: SimpleWebSocket) => void) {
		this.connectionListeners.push(listener);
	}
	send(eventName: string, ...values: any[]) {
		this.clients.forEach(socket => {
			socket.send(convertEventToMessage(eventName, ...values));
		});
	}
}

export { SimpleWebSocketServer };
