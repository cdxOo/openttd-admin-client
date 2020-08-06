'use strict';
var net = require('net'),
    PromiseSocket = require('promise-socket').PromiseSocket,
    clientpackets = require('./clientpackets'),
    splitChunk = require('./split-chunk'),
    decode = require('./decode'),
    Logger = require('./logger');

var Client = ({
    host,
    port,
    debug,
}) => {
    var client = {},
        socket,
        lastChunkOverflow, // FIXME: because reasons
        queue = [],
        log = Logger(debug);

    client.queue = () => ([ ...queue ]);

    client.connect = async () => {
        if (!socket) {
            log(1, 'creating socket');
            socket = new PromiseSocket();
            
            socket.stream.on("data", (chunk) => {
                var { packets, overflow } = splitChunk({
                    chunk,
                    lastChunkOverflow
                });
                lastChunkOverflow = overflow;
                queue = [
                    ...queue,
                    ...packets.map(decode)
                ];
            });

            log(1, `connecting ${host}:${port}`);
            await socket.connect(port, host);
            log(1, `connected`);
        }
    }

    client.send = async (packet) => {
        return await socket.write(packet);
    }

    client.read = async (count) => {
        count = count || 1;

        var packets = [];
        for (var i = 0; i < count; i += 1) {
            var packet = queue.shift();
            while (!packet) {
                await socket.read();
                packet = queue.shift();
            }
            packets.push(packet);
        }

        return (
            count === 1
            ? packets[0] 
            : packets
        );
    }

    client.auth = async ({ user, password }) => {
        return await client.send(
            clientpackets.Join({ user, password })
        );
    };

    client.rcon = async (command) => {
        return await client.send(
            clientpackets.Rcon(command)
        );
    }

    client.disconnect = async () => {
        log(1, 'destroying socket');
        socket.destroy();
        socket = undefined;
    }

    return client;
}

module.exports = Client;
