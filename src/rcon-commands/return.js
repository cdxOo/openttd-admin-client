'use strict';
// stop executing arunning script
module.exports = (client) => () => (
    client.rcon({ command: 'return' })
);
    

