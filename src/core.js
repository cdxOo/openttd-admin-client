'use strict';
var net = require('net'),
    PromiseSocket = require('promise-socket').PromiseSocket,
    clientpackets = require('./clientpackets'),
    splitChunk = require('./split-chunk'),
    decode = require('./decode'),
    Logger = require('./logger');

var Core = ({
    host,
    port,
}) => {
    var core = {},
        socket,
        lastChunkOverflow, // FIXME: because reasons
        queue = [];

    core.connect = async () => {
        if (!socket) {
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

            await socket.connect(port, host);
        }
    }

    core.send = async (packet) => {
        return await socket.write(packet);
    }

    core.read = async (count) => {
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

    core.auth = async ({ user, password }) => {
        return await core.send(
            clientpackets.Join({ user, password })
        );
    };

    core.rcon = async (command) => {
        return await core.send(
            clientpackets.Rcon(command)
        );
    }

    core.disconnect = async () => {
        socket.destroy();
        socket = undefined;
    }

    return core;
}

module.exports = Core;
