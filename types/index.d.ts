/// <reference types="node" />
import ws from 'ws';
import http from 'http';
import { SimpleWebSocket } from 'simple-websockets';
declare type ListenerCallback = (socket: SimpleWebSocket, request: http.IncomingMessage) => void;
declare class SimpleWebSocketServer extends ws.Server {
    connectionListeners: ListenerCallback[];
    constructor(options?: ws.ServerOptions, callback?: () => void);
    onConnection(listener: ListenerCallback): void;
    send(eventName: string, ...values: any[]): void;
}
export { SimpleWebSocketServer };
