'use strict';
var Core = require('./core'),
    types = require('./types'),
    rcon = require('./rcon-commands/');

var Client = ({
    host,
    port,
}) => {
    var client = {},
        core = Core({ host, port });

    var withAwaitNextGameWelcomeOrFailure = async (promise) => {
        await promise;

        await core.read({ types: [ types.NEWGAME ] });
        return (
            await core.read({ types: [ types.WELCOME ] })
        );
        // TODO work on the failure part :D
    }

    client.core = core;
    client.connect = core.connect;
    client.disconnect = core.disconnect;

    client.auth = async ({ user, password }) => {
        await core.auth({ user, password });
        
        var proto = await core.read({ types: [ types.PROTOCOL ] }),
            welcome = await core.read({ types: [ types.WELCOME ] });

        return ({ proto, welcome });
    };

    client.rcon = async ({ command }) => {
        await core.rcon(command);

        var lines = [],
            accepted = [ types.RCON_RESPONSE, types.RCON_END ];
        
        var packet = await core.read({ types: accepted });
        while (packet.type !== types.RCON_END) {
            lines.push(packet.output);
            packet = await core.read({ types: accepted });
        }
        return lines;
    }

    client.rcon.load = ({ index, file }) => (
        withAwaitNextGameWelcomeOrFailure(
            client.rcon({
                command: `load ${ file ? '"' + file + '"' : index }`
            })
        )
    );

    client.rcon.newgame = () => (
        withAwaitNextGameWelcomeOrFailure(
            client.rcon({ command: 'newgame' })
        )
    );
    
    client.rcon.restart = () => (
        withAwaitNextGameWelcomeOrFailure(
            client.rcon({ command: 'restart' })
        )
    );

    client.rcon.content = {
        update: () => (
            client.rcon({ command: 'content update' })
        ),
        state: ({ filter }) => (
            client.rcon({ command: `content state "${filter}"` })
        ),
        select: ({ id, all }) => (
            client.rcon({
                command: `content select ${ all ? "all" : id }`
            })
        ),
        unselect: ({ id, all }) => (
            client.rcon({
                command: `content unselect ${ all ? "all": id }`
            })
        ),
        download: () => (
            client.rcon({ command: 'content download' })
        ),
    }

    // add all the other rcon commands listed in ./rcon-commands/index.js
    Object.keys(rcon).forEach(key => {
        client.rcon[key] = rcon[key](client);
    });

    // aliases
    client.rcon.quit = client.rcon.exit;
    client.rcon.dir = client.rcon.ls;


    return client;
}

module.exports = Client;
