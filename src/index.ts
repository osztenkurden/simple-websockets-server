import { Server as WebSocketServer, ServerOptions } from 'ws';
import { SimpleSocket } from './client';
import * as Utils from './client/util';

class SimpleSocketServer extends WebSocketServer {
	connectionListeners: ((socket: SimpleSocket) => void)[];
	constructor(options?: ServerOptions, callback?: () => void) {
		super(options, callback);
		this.connectionListeners = [];
		super.on('connection', socket => {
			const simpleSocket = new SimpleSocket(socket);

			simpleSocket.send('connection');

			this.connectionListeners.forEach(listener => {
				listener(simpleSocket);
			});

			socket.on('close', () => {
				simpleSocket.send('disconnect');
			});
		});
	}
	onConnection(listener: (socket: SimpleSocket) => void) {
		this.connectionListeners.push(listener);
	}
	send(eventName: string, ...values: any[]) {
		this.clients.forEach(socket => {
			socket.send(Utils.convertEventToMessage(eventName, values));
		});
	}
}

export { SimpleSocketServer };
