import { Server as WebSocketServer, ServerOptions } from 'ws';
import { SimpleSocket } from './client';
declare class SimpleSocketServer extends WebSocketServer {
    connectionListeners: ((socket: SimpleSocket) => void)[];
    constructor(options?: ServerOptions, callback?: () => void);
    onConnection(listener: (socket: SimpleSocket) => void): void;
    send(eventName: string, ...values: any[]): void;
}
export { SimpleSocketServer };
