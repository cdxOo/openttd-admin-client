'use strict';
module.exports = (client) => ({ clientId, ip }) => (
    client.rcon({
        command: `kick ${ ip ? ip : clientId }`
    })
);


