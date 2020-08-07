'use strict';
var Core = require('./core'),
    types = require('./types');

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
        
        var proto = await core.read({ types: [ types.PROTOCOL ] }),
            welcome = await core.read({ types: [ types.WELCOME ] });

        return ({ proto, welcome });
    };

    client.rcon = async ({ command }) => {
        await core.rcon(command);

        var lines = [],
            accepted = [ types.RCON_RESPONSE, types.RCON_END ],
            packet = await core.read({ types: accepted });
        while (packet.type !== 125) {
            lines.push(packet.output);
            packet = await core.read({ types: accepted });
        }
        return lines;
    }

    client.rcon.ban = ({ clientId, ip }) => (
        client.rcon({
            command: `ban ${ ip ? ip : clientId }`
        })
    );

    client.rcon.banlist = () => (
        client.rcon({ command: 'banlist' })
    );

    client.rcon.clients = () => (
        client.rcon({ command: 'clients' })
    );
    
    client.rcon.clientName = ({ clientId, newName }) => (
        client.rcon({ command: `client_name ${clientId} "${newName}"` })
    );

    client.rcon.companies = () => (
        client.rcon({ command: 'companies' })
    );

    // FIXME: im not sure what level acually means here
    client.rcon.debugLevel = ({ level }) => (
        client.rcon({ command: `debug_level "${level}"` })
    );

    client.rcon.echo = ({ text }) => (
        client.rcon({ command: `echo "${text}"` })
    );
    // FIXME: do we want "echoc" ??
    
    client.rcon.exec = ({ script, args }) => (
        client.rcon({ 
            command: [
                'exec',
                `"${script}"`,
                args.map(arg => `"${arg}"`)
            ].join(" ")
        })
    );

    client.rcon.exit = () => (
        client.rcon({ command: 'exit' })
    );
    client.rcon.quit = client.rcon.exit;
    

    client.rcon.getseed = () => (
        client.rcon({ command: 'getseed' })
    );

    // FIXME: help??
    // FIXME: info_cmd??
    // FIXME: info_var??

    client.rcon.kick = ({ clientId, ip }) => (
        client.rcon({
            command: `kick ${ ip ? ip : clientId }`
        })
    );

    client.rcon.listAi = () => (
        client.rcon({ command: 'list_ai' })
    );
    
    // FIXME: list_cmds??
    // FIXME: list_vars??

    client.rcon.listPatches = () => (
        client.rcon({ command: 'list_patches' })
    );
    
    client.rcon.load = ({ index, file }) => (
        client.rcon({
            command: `load ${ file ? '"' + file + '"' : index }`
        })
    );

    client.rcon.ls = () => (
        client.rcon({ command: 'ls' })
    );
    client.rcon.dir = client.rcon.ls;

    client.rcon.move = ({ clientId, companyId }) => (
        client.rcon({ command: `move ${clientId} ${companyId}` })
    );
    
    client.rcon.newgame = () => (
        client.rcon({ command: 'newgame' })
    );
    
    client.rcon.patch = ({ patchname, newvalue }) => (
        client.rcon({ command: `patch "${patchname}" "${newvalue}"` })
    );
    
    client.rcon.pause = () => (
        client.rcon({ command: 'pause' })
    );
    
    client.rcon.pwd = () => (
        client.rcon({ command: 'pwd' })
    );
    
    client.rcon.resetCompany = ({ companyId }) => (
        client.rcon({ command: `reset_company ${companyId}` })
    );

    // FIXME: resetengines???
    
    client.rcon.restart = () => (
        client.rcon({ command: 'restart' })
    );

    // stop executing arunning script
    client.rcon.return = () => (
        client.rcon({ command: 'return' })
    );
    
    client.rcon.rm = ({ index, file }) => (
        client.rcon({
            command: `rm ${ file ? '"' + file + '"' : index }`
        })
    );

    client.rcon.save = ({ index, file }) => (
        client.rcon({
            command: `save ${ file ? '"' + file + '"' : index }`
        })
    );

    client.rcon.say = ({ text }) => (
        client.rcon({ command: `say "${text}"` })
    );

    client.rcon.sayClient = ({ clientId, text }) => (
        client.rcon({ command: `say_client ${clientId} "${text}"` })
    );
    
    client.rcon.sayPlayer = ({ playerId, text }) => (
        client.rcon({ command: `say_player ${playerId} "${text}"` })
    );

    // FIXME: script???

    client.rcon.serverInfo = () => (
        client.rcon({ command: 'server_info' })
    );

    // FIXME: idk what ai parameter is here and what the command
    // does in general
    client.rcon.startAi = ({ ai }) => (
        client.rcon({ command: `start_ai "${ai}"` })
    );
    
    client.rcon.status = () => (
        client.rcon({ command: 'status' })
    );

    client.rcon.stopAi = ({ companyId }) => (
        client.rcon({ command: `stop_ai ${companyId}` })
    );
    
    client.rcon.unban = ({ ip }) => (
        client.rcon({
            command: `unban ${ip}`
        })
    );

    client.rcon.unpause = () => (
        client.rcon({ command: 'unpause' })
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


    return client;
}

module.exports = Client;
