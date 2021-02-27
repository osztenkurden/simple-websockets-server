import { Server as WebSocketServer, ServerOptions } from 'ws';
import { SimpleWebSocket } from 'simple-websockets';
declare class SimpleWebSocketServer extends WebSocketServer {
    connectionListeners: ((socket: SimpleWebSocket) => void)[];
    constructor(options?: ServerOptions, callback?: () => void);
    onConnection(listener: (socket: SimpleWebSocket) => void): void;
    send(eventName: string, ...values: any[]): void;
}
export { SimpleWebSocketServer };
