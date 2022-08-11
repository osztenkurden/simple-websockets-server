"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWebSocket = exports.convertEventToMessage = exports.convertMessageToEvent = exports.getEnvironment = exports.SimpleWebSocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
const simple_websockets_1 = require("simple-websockets");
Object.defineProperty(exports, "SimpleWebSocket", { enumerable: true, get: function () { return simple_websockets_1.SimpleWebSocket; } });
Object.defineProperty(exports, "convertEventToMessage", { enumerable: true, get: function () { return simple_websockets_1.convertEventToMessage; } });
Object.defineProperty(exports, "getEnvironment", { enumerable: true, get: function () { return simple_websockets_1.getEnvironment; } });
Object.defineProperty(exports, "convertMessageToEvent", { enumerable: true, get: function () { return simple_websockets_1.convertMessageToEvent; } });
class SimpleWebSocketServer extends ws_1.default.Server {
    constructor(options, callback) {
        super(options, callback);
        this.connectionListeners = [];
        super.on('connection', (socket, request) => {
            const simpleSocket = new simple_websockets_1.SimpleWebSocket(socket);
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
            socket.send(simple_websockets_1.convertEventToMessage(eventName, ...values));
        });
    }
}
exports.SimpleWebSocketServer = SimpleWebSocketServer;
