'use strict';
var Core = require('./core');

var Client = ({
    host,
    port,
}) => {
    var client = {},
        core = Core({ host, port });

    client.core = core;
    client.connect = core.connect;
    client.disconnect = core.disconnect;

    client.auth = async ({ user, password }) => {
        await core.auth({ user, password });
        return await core.read(2); // FIXME wait for welcome
    };

    client.rcon = async ({ command }) => {
        await core.rcon(command);

        var lines = [],
            packet = await core.read();
        while (packet.type !== 125) {
            lines.push(packet.output);
            packet = await core.read();
        }
        return lines;
    }

    client.rcon.content = {
        update: async () => (
            await client.rcon({ command: 'content update' })
        ),
        state: async ({ filter }) => (
            await client.rcon({ command: `content state ${filter}` })
        ),
        select: async ({ id, all }) => (
            await client.rcon({
                command: `content select ${ all ? "all": id }`
            })
        ),
        unselect: async ({ id, all }) => (
            await client.rcon({
                command: `content unselect ${ all ? "all": id }`
            })
        ),
        download: async () => (
            await client.rcon({ command: 'content download' })
        ),
    }


    return client;
}

module.exports = Client;
