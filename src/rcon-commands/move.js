'use strict';
module.exports = (client) => ({ clientId, companyId }) => (
    client.rcon({ command: `move ${clientId} ${companyId}` })
);


