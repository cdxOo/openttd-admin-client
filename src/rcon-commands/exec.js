'use strict';
module.exports = (client) => ({ script, args }) => (
    client.rcon({ 
        command: [
            'exec',
            `"${script}"`,
            args.map(arg => `"${arg}"`)
        ].join(" ")
    })
);

