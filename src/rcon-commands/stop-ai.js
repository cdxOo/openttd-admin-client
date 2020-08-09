'use strict';
module.exports = (client) => ({ companyId }) => (
    client.rcon({ command: `stop_ai ${companyId}` })
);
    
