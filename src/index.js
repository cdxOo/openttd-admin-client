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
        queue = [],
        log = Logger(debug);

    client.connect = async () => {
        if (!socket) {
            log(1, 'creating socket');
            socket = new PromiseSocket();
            
            socket.stream.on("data", (chunk) => {
                queue = [
                    ...queue,
                    ...splitChunk(chunk).map(decode)
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
        return packets;
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
