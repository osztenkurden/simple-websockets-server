"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWebSocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
const simple_websockets_1 = require("simple-websockets");
class SimpleWebSocketServer extends ws_1.default.Server {
    constructor(options, callback) {
        super(options, callback);
        this.connectionListeners = [];
        super.on('connection', socket => {
            const simpleSocket = new simple_websockets_1.SimpleWebSocket(socket);
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
            socket.send(simple_websockets_1.convertEventToMessage(eventName, ...values));
        });
    }
}
exports.SimpleWebSocketServer = SimpleWebSocketServer;
