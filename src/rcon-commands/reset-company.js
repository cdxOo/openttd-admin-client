'use strict';
module.exports = (client) => ({ companyId }) => (
    client.rcon({ command: `reset_company ${companyId}` })
);


