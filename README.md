![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) 
![CI](https://img.shields.io/github/workflow/status/osztenkurden/simple-websockets-server/CI)
![Dependencies](https://img.shields.io/david/osztenkurden/simple-websockets-server)
![Downloads](https://img.shields.io/npm/dm/simple-websockets-server)
![Version](https://img.shields.io/npm/v/simple-websockets-server)
# Simple Websockets Server

## What is it for?
It's super easy, super thin server package for event systems in WebSockets to work with `simple-websockets`. (inspired by socket.io but with absolutely nothing else).

# Example

```typescript
import { SimpleWebSocketServer } from 'simple-websockets-server';

const server = new SimpleWebSocketServer({ port: 1234 });


// socket - SimpleWebSocket instance
server.onConnection((socket: SimpleWebSocket) => {
    socket.on("some event from socket", (someData) => {
        socket.send("some response", someResponseData);
    });
});

server.send("event name to send to all clients", 1, 2, 3, "fourth argument");

```

# Documentation

SimpleWebSocketServer extends from `ws.Server`, so constructor is precisely the same. SimpleWebSocketServer has 2 additional methods:
 - onConnection(socket => void) - connection listener. `socket` is an instance of SimpleWebSocket
 - send(eventName, data) - sends event and specified data to all connected sockets


`server.send` sends to server stringified JSON object

```javascript
{
    eventName: "event name is the first argument",
    values: []
}
```

where `values` is the array of arguments after first argument of `send` method.

`socket.on` listens for incoming data that fits the object and calls listener.

You can send events without values.

Event name must be non-empty string.
