'use strict';
module.exports = (client) => () => (
    client.rcon({ command: 'list_patches' })
);
    

