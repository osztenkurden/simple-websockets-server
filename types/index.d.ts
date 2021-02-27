import ws from 'ws';
import { SimpleWebSocket } from 'simple-websockets';
declare class SimpleWebSocketServer extends ws.Server {
    connectionListeners: ((socket: SimpleWebSocket) => void)[];
    constructor(options?: ws.ServerOptions, callback?: () => void);
    onConnection(listener: (socket: SimpleWebSocket) => void): void;
    send(eventName: string, ...values: any[]): void;
}
export { SimpleWebSocketServer };
